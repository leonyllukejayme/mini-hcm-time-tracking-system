import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { auth } from '../firebase';

export default function useLogout() {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await signOut(auth);

			localStorage.removeItem('token');

			// Replace history so user can't go back
			navigate('/', { replace: true });
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return logout;
}
