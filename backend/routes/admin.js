import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import dotenv from 'dotenv';
import express from 'express';
import { admin, db } from '../config/firebase.js';
import isAdmin from '../middleware/admin.js';
import verifyToken from '../middleware/auth.js';
import { calculateHours } from '../service/timeCalculator.js';
dotenv.config({ quiet: true });
const router = express.Router();

dayjs.extend(utc);
dayjs.extend(timezone);

const MANILA_TZ = "Asia/Manila";
// Admin routes for attendance management

router.get('/daily-reports/:date', verifyToken, isAdmin, async (req, res) => {
	try {
		const snapshot = await db
			.collection('dailySummary')
			.where('date', '==', req.params.date)
			.get();
		const results = snapshot.docs.map((doc) => doc.data());
		res.json(results);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/daily-reports/month/:month', verifyToken, isAdmin, async (req, res) => {
	try {
		const month = req.params.month;
		const currentYear = dayjs().year();
		if (!dayjs(`${currentYear}-${month}`, 'YYYY-MM', true).isValid()) {
			return res.status(400).json({ error: 'Invalid month format. Use MM.' });
		}

		const startDate = `${currentYear}-${month}-01`;
		const endDate = dayjs(startDate).add(1, 'month').format('YYYY-MM-DD');

		const summarySnapshot = await db
			.collection('dailySummary')
			.where('date', '>=', startDate)
			.where('date', '<', endDate)
			.orderBy('date', 'asc')
			.get();

		const attendanceSnapshot = await db
			.collection('attendance')
			.where('date', '>=', startDate)
			.where('date', '<', endDate)
			.get();

		const attendanceById = new Map();
		for (const attendanceDoc of attendanceSnapshot.docs) {
			const attendanceData = attendanceDoc.data();
			const timeInValue = attendanceData?.timeIn;
			const timeOutValue = attendanceData?.timeOut;
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

			attendanceById.set(attendanceDoc.id, { timeIn, timeOut });
		}

		const results = [];
		for (const summaryDoc of summarySnapshot.docs) {
			const summaryData = summaryDoc.data();
			const attendanceData = attendanceById.get(summaryDoc.id);
			results.push({
				id: summaryDoc.id,
				...summaryData,
				timeIn: attendanceData?.timeIn || null,
				timeOut: attendanceData?.timeOut || null,
			});
		}
		return res.json(results);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
});

router.get('/punches', verifyToken, isAdmin, async (req, res) => {
	try {
		const snapshot = await db.collection('attendance').get();
		const results = snapshot.docs.map((doc) => doc.data());
		res.json(results);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});
router.get('/users', verifyToken, isAdmin, async (req, res) => {
	try {
		const snapshot = await db.collection('users').where('role', '==', 'employee').get();
		const results = snapshot.docs.map((doc) => doc.data());
		res.json(results);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.put('/punches/:id', verifyToken, isAdmin, async (req, res) => {
	try {
		const { time_in, time_out } = req.body;
		const timeInTimestamp = dayjs(time_in).toDate();
		const timeOutTimestamp = dayjs(time_out).toDate();

		// console.log(timeInTimestamp)
		// const doc = await db.collection('attendance').doc(req.params.id).get();
		// if (!doc.exists) {
		//     return res.status(404).json({ message: 'Punch record not found' });
		// }

		const computed = calculateHours(
			timeInTimestamp,
			timeOutTimestamp,
			req.userData.schedule.start,
			req.userData.schedule.end,
		);
		await db.collection('attendance').doc(req.params.id).update({
			date: dayjs(timeInTimestamp).format('YYYY-MM-DD'),
			timeIn: timeInTimestamp,
			timeOut: timeOutTimestamp,
			computed,
			updatedAt: new Date(),
		});

		await db.collection('dailySummary').doc(req.params.id).update({
			totals: computed,
			generatedAt: new Date(),
		});
		res.json({ message: 'Punch updated successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Admin user management routes

router.post('/register', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		// Create Firebase Auth user
		const userRecord = await admin.auth().createUser({
			email,
			password,
		});

		// Store profile in Firestore
		await db
			.collection('users')
			.doc(userRecord.uid)
			.set({
				uid: userRecord.uid,
				name,
				email,
				role: 'employee',
				timezone: 'Asia/Manila',
				schedule: {
					start: '22:00',
					end: '06:00',
				},
				createdAt: new Date(),
			});

		res.status(201).json({
			message: 'User registered successfully',
			uid: userRecord.uid,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const response = await axios.post(
			`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
			{
				email,
				password,
				returnSecureToken: true,
			},
		);

		res.json({
			message: 'Login successful',
			idToken: response.data.idToken,
			refreshToken: response.data.refreshToken,
			expiresIn: response.data.expiresIn,
		});
	} catch (error) {
		res.status(401).json({
			error: 'Invalid email or password',
		});
	}
});

export default router;
