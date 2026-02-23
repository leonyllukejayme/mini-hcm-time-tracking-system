import { NavLink } from 'react-router';
import useLogout from '../hooks/useLogout';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
const Sidebar = ({ role = 'employee' }) => {
	const isAdmin = role === 'admin';
	const logout = useLogout();
	const [userName, setUserName] = useState('User');
	const [userRole, setUserRole] = useState(role);

	const navLinks = isAdmin
		? [
				{ name: 'Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
				{ name: 'Employee List', icon: 'badge', path: '/admin/employees' },
				{ name: 'Reports', icon: 'bar_chart', path: '/admin/reports' },
			]
		: [
				{ name: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
				{ name: 'Reports', icon: 'bar_chart', path: '/reports' },
				// {
				// 	name: 'My Attendance',
				// 	icon: 'schedule',
				// 	path: '/attendance',
				// },
				// { name: 'My Profile', icon: 'person', path: '/profile' },
			];

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (!firebaseUser) {
				setUserName('User');
				setUserRole(role);
				return;
			}

			const fallbackName =
				firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User';

			try {
				const userSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
				if (userSnap.exists()) {
					const userData = userSnap.data();
					setUserName(userData.name || userData.fullName || fallbackName);
					setUserRole(userData.role || role);
					return;
				}
			} catch (error) {
				console.error('Failed to load sidebar user info:', error);
			}

			setUserName(fallbackName);
			setUserRole(role);
		});

		return () => unsubscribe();
	}, [role]);

	return (
		<aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
			{/* Logo Section */}
			<div className="p-6 flex items-center gap-3">
				<div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
					<span className="material-symbols-outlined">corporate_fare</span>
				</div>
				<div>
					<h1 className="text-sm font-bold leading-none">Mini HCM</h1>
					<p className="text-xs text-slate-500 mt-1 tracking-wider font-semibold">
						{isAdmin ? 'Admin Portal' : 'Time Tracking System'}
					</p>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-4 space-y-1">
				{navLinks.map((link) => (
					<NavLink
						key={link.name}
						to={link.path}
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
								isActive
									? 'bg-primary/10 text-primary font-medium'
									: 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
							}`
						}>
						<span className="material-symbols-outlined">{link.icon}</span>
						<span className="text-sm">{link.name}</span>
					</NavLink>
				))}
			</nav>

			{/* Bottom Section */}
			<div className="p-4 border-t border-slate-200 dark:border-slate-800">
				<button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
					<span className="material-symbols-outlined">settings</span>
					<span className="text-sm font-medium">Settings</span>
				</button>
				<button
					className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mt-2"
					onClick={logout}
				>
					<span className="material-symbols-outlined">logout</span>
					<span className="text-sm font-medium">Logout</span>
				</button>
				<div className="mt-4 flex items-center gap-3 px-3">
					<div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
						<img
							alt="Admin"
							data-alt="Corporate administrator profile portrait photo"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnfnfjxAliGAkG7no_CDTrV8UPQ46sR0c1cXCvbzNvDy8df-osKOtAnpNzb3qQ4D84shXbZhEgcqrtenuFc-QHfP2xiheUlT1vRwir3NzWIJ9s2gTs5e5jDEj7lNRtVxjiW6Y7O8UMseHeMTZCuhGjkaoDs1ge1x6RhDXH-9NLASHKWB85TvdGjECAuzC7t09UxKSn7Q4aMjQ016eUmKa3Xau7tnb3y6pojkwhobq5zS82sKz3EI1VEIGZFHBp3iC7PKxi2IxarJgt"
						/>
					</div>
					<div className="flex-1 overflow-hidden">
						<p className="text-xs font-bold truncate">{userName}</p>
						<p className="text-[10px] text-slate-500 uppercase">{userRole}</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
