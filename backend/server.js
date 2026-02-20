import express from 'express';
import { db } from './config/firebase.js';
import attendanceRoutes from './routes/attendance.js';
import adminRoutes from './routes/admin.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.post('/users' , async (req, res) => {
//   try {
//     const { name, email } = req.body; 

//     const userRef = await db.collection('users').add({ name, email, createdAt: new Date() });
//     res.status(201).json({ id: userRef.id, name, email });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/users', async (req, res) => {
//   try {
//     const usersSnapshot = await db.collection('users').get();
//     const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.use("/api/attendance", attendanceRoutes);
app.use("/api/admin", adminRoutes);

app.get('/', (req, res) => {
  res.send("Mini HCM API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});