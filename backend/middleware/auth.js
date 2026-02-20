import { admin, db } from '../config/firebase.js';

async function verifyToken(req, res, next) {
	const authHeader = req.headers.authorization;


	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const token = authHeader.split('Bearer ')[1];

	try {
		const decoded = await admin.auth().verifyIdToken(token);
		req.user = decoded;

		const userDoc = await db.collection('users').doc(decoded.uid).get();
		req.userData = userDoc.data();

		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}
export default verifyToken;
