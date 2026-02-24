import { updateEmail, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { auth, db } from '../firebase';
import useLogout from '../hooks/useLogout'

export default function Settings() {
    const logout = useLogout();
	const [profile, setProfile] = useState({
		name: '',
		email: '',
	});

	const [passwordData, setPasswordData] = useState({
		current: '',
		new: '',
		confirm: '',
	});

	const [loading, setLoading] = useState(false);
	const [passwordLoading, setPasswordLoading] = useState(false);

	const user = auth.currentUser;

	// ==============================
	// Fetch User Data
	// ==============================
	useEffect(() => {
		const fetchUser = async () => {
			if (!user) return;

			const userDoc = await getDoc(doc(db, 'users', user.uid));

			if (userDoc.exists()) {
				const data = userDoc.data();
				setProfile({
					name: data.name || '',
					email: user.email || '',
				});
			}
		};

		fetchUser();
	}, [user]);

	// ==============================
	// Handle Profile Update
	// ==============================
	const handleProfileUpdate = async () => {
		try {
			setLoading(true);

			// Update Auth Email
			if (profile.email !== user.email) {
				await updateEmail(user, profile.email);
			}

			// Update Firestore
			await updateDoc(doc(db, 'users', user.uid), {
				name: profile.name,
				email: profile.email,
			});

			toast.success('Profile updated successfully!',{position:"top-right"});
		} catch (error) {
			console.error(error);
			toast.error(error.message,{position:"top-right"});
		} finally {
			setLoading(false);
		}
	};

	// ==============================
	// Handle Password Update
	// ==============================
	const handlePasswordUpdate = async () => {
		if (passwordData.new.length < 6) {
			return toast.error('Password must be at least 6 characters.', {
				position: 'top-right',
			});
		}

		if (passwordData.new !== passwordData.confirm) {
			return toast.error('Passwords do not match.', { position: 'top-right' });
		}

		try {
			setPasswordLoading(true);

			await updatePassword(user, passwordData.new);

			toast.success('Password updated successfully!', {
				position: 'top-right',
			});

			setPasswordData({
				current: '',
				new: '',
				confirm: '',
			});
		} catch (error) {
			console.error(error);
			toast.error(error.message, { position: 'top-right' });
		} finally {
			setPasswordLoading(false);
		}
	};

	// ==============================
	// Sign Out All
	// ==============================

	return (
		<main className="flex-1 ml-64 p-8 overflow-auto">
			<div className="max-w-4xl mx-auto">
				<header className="mb-8">
					<h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
						Settings
					</h2>
					<p className="text-slate-500 dark:text-slate-400 mt-2">
						Manage your account details, security preferences, and system
						behavior.
					</p>
				</header>

				<div className="space-y-8">
					{/* ================= PERSONAL INFO ================= */}
					<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
						<div className="p-6 border-b border-slate-100 dark:border-slate-800">
							<h3 className="text-lg font-bold text-slate-900 dark:text-white">
								Personal Information
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Update your profile details and contact information.
							</p>
						</div>

						<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex flex-col gap-2">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Full Name
								</label>
								<input
									type="text"
									value={profile.name}
									onChange={(e) =>
										setProfile({ ...profile, name: e.target.value })
									}
									className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
									placeholder="Enter full name"
								/>
							</div>

							<div className="flex flex-col gap-2">
								<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
									Email Address
								</label>
								<input
									type="email"
									value={profile.email}
									onChange={(e) =>
										setProfile({ ...profile, email: e.target.value })
									}
									className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
									placeholder="Enter email address"
								/>
							</div>
						</div>

						<div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex justify-end">
							<button
								onClick={handleProfileUpdate}
								disabled={loading}
								className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-all text-sm shadow-sm disabled:opacity-50">
								{loading ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					</section>

					{/* ================= SECURITY ================= */}
					<section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
						<div className="p-6 border-b border-slate-100 dark:border-slate-800">
							<h3 className="text-lg font-bold text-slate-900 dark:text-white">
								Security
							</h3>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								Keep your account secure by using a strong password.
							</p>
						</div>

						<div className="p-6 space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="flex flex-col gap-2">
									<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
										Current Password
									</label>
									<input
										type="password"
										value={passwordData.current}
										onChange={(e) =>
											setPasswordData({
												...passwordData,
												current: e.target.value,
											})
										}
										placeholder="••••••••"
										className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
										New Password
									</label>
									<input
										type="password"
										value={passwordData.new}
										onChange={(e) =>
											setPasswordData({
												...passwordData,
												new: e.target.value,
											})
										}
										placeholder="Minimum 6 characters"
										className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
									/>
								</div>

								<div className="flex flex-col gap-2">
									<label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
										Confirm New Password
									</label>
									<input
										type="password"
										value={passwordData.confirm}
										onChange={(e) =>
											setPasswordData({
												...passwordData,
												confirm: e.target.value,
											})
										}
										placeholder="Confirm new password"
										className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
									/>
								</div>
							</div>
						</div>

						<div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex justify-end">
							{/* <p className="text-xs text-slate-500">
								Last changed 3 months ago
							</p> */}
							<button
								onClick={handlePasswordUpdate}
								disabled={passwordLoading}
								className="bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-6 rounded-lg transition-all text-sm shadow-sm disabled:opacity-50">
								{passwordLoading ? 'Updating...' : 'Update Password'}
							</button>
						</div>
					</section>

					{/* ================= ADVANCED ACTIONS ================= */}
					<div className="flex justify-between items-center py-4 px-2">
						<button
							onClick={logout}
							className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-2 transition-colors">
							<span className="material-symbols-outlined text-base">
								logout
							</span>
							Sign out of all sessions
						</button>

						<button
							onClick={() =>
								alert('Account deactivation is not implemented yet.')
							}
							className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-2 transition-colors">
							<span className="material-symbols-outlined text-base">
								delete
							</span>
							Deactivate Account
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
