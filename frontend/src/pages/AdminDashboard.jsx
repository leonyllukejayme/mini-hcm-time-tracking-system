import { useEffect } from 'react';
import KPICard from '../components/KPICard';
import TeamSummaryTable from '../components/TeamSummaryTable';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const AdminDashboard = () => {
	const employees = [
		{
			id: 1,
			name: 'John Doe',
			employeeId: 'EMP-001',
			avatar: 'https://i.pravatar.cc/150?img=1',
			regularHours: 40,
			overtime: 4.5,
			nightDiff: 0,
			lateMinutes: 12,
			undertime: 0,
		},
		{
			id: 2,
			name: 'John Doe',
			employeeId: 'EMP-001',
			avatar: 'https://i.pravatar.cc/150?img=1',
			regularHours: 40,
			overtime: 4.5,
			nightDiff: 0,
			lateMinutes: 12,
			undertime: 0,
		},
	];
	const handleEdit = (employee) => {
		console.log('Edit punches for:', employee);
	};

	useEffect(() => {
		document.title = 'Admin Dashboard - MCM Time Tracking';
	}, []);

	useEffect(() => {
		const fetchUserRole = async () => {
			const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
			console.log(userDoc.data());
		};
		fetchUserRole();

		const fetchDailySummary = async () => {
			// Placeholder for fetching daily summary data from Firestore
			// You would typically query a collection that stores daily summaries
			// and set it to state to display in the dashboard
		};
		fetchDailySummary();


	}, []);
	return (
		<div className="flex-1 overflow-y-auto p-8 space-y-8">
			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<KPICard
					title={'Total Employees'}
					value={'1,248'}
					icon={'groups'}
					classNameName={'p-2 bg-primary/10 rounded-lg text-primary'}
				/>
				<KPICard
					title={'Present Today'}
					value={'1,102'}
					icon={'how_to_reg'}
					classNameName={
						'p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600'
					}
				/>
				<KPICard
					title={'Late Today'}
					value={'14'}
					icon={'schedule'}
					classNameName={
						'p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600'
					}
				/>
				{/* Add more KPI cards as needed */}
			</div>
			{/* table */}
			<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
				<div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h3 className="font-black text-lg">Daily Aggregate Reports</h3>
						<p className="text-sm text-slate-500">
							Consolidated attendance metrics for the current day
						</p>
					</div>
					<div className="flex items-center gap-2">
						<div className="relative">
							<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
								search
							</span>
							<input
								className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64"
								placeholder="Search employee..."
								type="text"
							/>
						</div>
						<button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
							<span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
								filter_list
							</span>
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<TeamSummaryTable employees={employees} onEdit={handleEdit} />
				</div>
				<div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
					<p className="text-xs text-slate-500 font-medium">
						Showing 4 of 1,248 entries
					</p>
					<div className="flex gap-2">
						<button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
							Previous
						</button>
						<button className="px-3 py-1 bg-primary text-white rounded-md text-xs font-bold shadow-sm">
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
