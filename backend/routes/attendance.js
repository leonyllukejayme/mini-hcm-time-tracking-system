import dayjs from 'dayjs';
import express from 'express';
import { db } from '../config/firebase.js';
import verifyToken from '../middleware/auth.js';
import { calculateHours } from '../service/timeCalculator.js';

const router = express.Router();

router.get('/history', verifyToken, async (req, res) => {
	const uid = req.user.uid;

	try {
		const snapshot = await db.collection('attendance').where('userId', '==', uid).get();

		const history = snapshot.docs
			.map((doc) => {
			const data = doc.data();
			const timeInValue = data?.timeIn;
			const timeOutValue = data?.timeOut;
			const computed = data?.computed || {};
			const lateMinutes = Number(computed?.lateMinutes || 0);

			const timeIn = timeInValue?.toDate
				? timeInValue.toDate().toISOString()
				: timeInValue
					? new Date(timeInValue).toISOString()
					: null;
			const timeOut = timeOutValue?.toDate
				? timeOutValue.toDate().toISOString()
				: timeOutValue
					? new Date(timeOutValue).toISOString()
					: null;

			return {
				id: doc.id,
				date: data?.date || null,
				timeIn,
				timeOut,
				workHours: Number(computed?.totalWorkedHours || 0),
				regularHours: Number(computed?.regularHours || 0),
				overtimeHours: Number(computed?.overtimeHours || 0),
				nightHours: Number(computed?.nightDiffHours || 0),
				lateMinutes: lateMinutes,
				underTimeMinutes: Number(computed?.undertimeMinutes || 0),
				status:
					data?.status === 'open'
						? 'In Progress'
						: lateMinutes > 0
							? 'Late'
						: 'On Time',
			};
			})
			.sort((a, b) => {
				if (!a.date && !b.date) return 0;
				if (!a.date) return 1;
				if (!b.date) return -1;
				return b.date.localeCompare(a.date);
			})
			.slice(0, 10);

		return res.json({ history });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to load attendance history.' });
	}
});

router.get('/status', verifyToken, async (req, res) => {
	const uid = req.user.uid;
	const date = dayjs().format('YYYY-MM-DD');
	const docId = `${uid}_${date}`;
	const doc = await db.collection('attendance').doc(docId).get();

	if (!doc.exists) {
		return res.json({ isClockedIn: false, status: 'none', timeIn: null, date });
	}

	const attendance = doc.data();
	const timeInValue = attendance?.timeIn;
	const timeIn = timeInValue?.toDate
		? timeInValue.toDate().toISOString()
		: timeInValue
			? new Date(timeInValue).toISOString()
			: null;

	return res.json({
		isClockedIn: attendance?.status === 'open',
		status: attendance?.status || 'none',
		timeIn,
		date,
	});
});


router.post('/punch-in', verifyToken, async (req, res) => {
	try {
		const uid = req.user.uid;
		const date = dayjs().format('YYYY-MM-DD');
		// const date = '2026-02-10';
		const time = new Date();
		const docId = `${uid}_${date}`;

		const doc = await db.collection('attendance').doc(docId).get();

		if (doc.exists && doc.data().status === 'open') {
			return res.status(400).json({ message: 'Already punched in.' });
		}

		await db.collection('attendance').doc(docId).set({
			userId: uid,
			date,
			timeIn: time,
			status: 'open',
			createdAt: new Date(),
		});

		res.json({ message: 'Punched In', timeIn: time.toISOString(), status: 'open' });
	} catch (error) {
		console.error('Punch in failed:', error);
		res.status(500).json({ message: 'Punch in failed.' });
	}
});

router.post('/punch-out', verifyToken, async (req, res) => {
	try {
		const uid = req.user.uid;
		const date = dayjs().format('YYYY-MM-DD');
		// const date = '2026-02-10';
		const time = new Date();
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
		await db.collection('attendance').doc(docId).update({
			timeOut,
			computed,
			status: 'completed',
			updatedAt: new Date(),
		});

		await db.collection('dailySummary').doc(docId).set({
			userId: uid,
			date,
			totals: computed,
			generatedAt: new Date(),
		});

		res.json({ message: 'Punched Out', computed, status: 'completed' });
	} catch (error) {
		console.error('Punch out failed:', error);
		res.status(500).json({ message: 'Punch out failed.' });
	}
});

export default router;
