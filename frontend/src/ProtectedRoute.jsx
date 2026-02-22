import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './context/AuthContext';
import { db } from './firebase';

export default function ProtectedRoute({ children, role }) {
	const { user, loading } = useAuth();
	const [authorized, setAuthorized] = useState(null);

	useEffect(() => {
		if (!user) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setAuthorized(false);
			return;
		}

		getDoc(doc(db, 'users', user.uid)).then(snap => {
			setAuthorized(snap.exists() && snap.data().role === role);
		});
	}, [user, role]);

	if (loading || authorized === null) return <div>Loading...</div>;
	if (!authorized) return <Navigate to="/" />;

	return children;
}
