import dayjs from 'dayjs';
import express from 'express';
import { db } from '../config/firebase.js';
import verifyToken from '../middleware/auth.js';
import { calculateHours } from '../service/timeCalculator.js';

const router = express.Router();

let today = dayjs().format('YYYY-MM-DD');
let time = new Date();
// let today = '2026-02-12';


router.post('/punch-in', verifyToken, async (req, res) => {
	const uid = req.user.uid;
	const date = today;
	const docId = `${uid}_${date}`;

	const doc = await db.collection('attendance').doc(docId).get();

	if (doc.exists && doc.data().status === 'open') {
		return res.status(400).json({ message: 'Already punched in.' });
	}

	await db.collection('attendance').doc(docId).set({
		userId: uid,
		date: date,
		timeIn: time,
		status: 'open',
		createdAt: new Date(),
	});

	res.json({ message: 'Punched In' });
});

router.post('/punch-out', verifyToken, async (req, res) => {
	const uid = req.user.uid;
    const date = today;
	const docId = `${uid}_${date}`;

	const doc = await db.collection('attendance').doc(docId).get();

	if (!doc.exists) {
		return res.status(400).json({ message: 'No punch-in record found.' });
	}

	const attendance = doc.data();
	const timeOut = time;

	const computed = calculateHours(
		attendance.timeIn.toDate(),
		timeOut,
		req.userData.schedule.start,
		req.userData.schedule.end,
	);

    console.log(req.userData.schedule.start);

	await db.collection('attendance').doc(docId).update({
		timeOut,
		computed,
		status: 'completed',
		updatedAt: new Date(),
	});

	await db.collection('dailySummary').doc(docId).set({
		userId: uid,
		date: date,
		totals: computed,
		generatedAt: new Date(),
	});

	res.json({ message: 'Punched Out', computed });
});

export default router;
