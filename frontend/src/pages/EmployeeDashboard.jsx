import { useEffect } from 'react';
import Badge from '../../components/Badge';
import SummaryCard from '../../components/SummaryCard';
import TimeStatusCard from '../../components/TimeStatusCard';

const EmployeeDashboard = () => {
	useEffect(() => {
		document.title = 'Employee Dashboard - MCM Time Tracking';
	}, []);
	return (
		<div className="flex-1 overflow-y-auto p-8 space-y-8">
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<TimeStatusCard />
				{/* <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-6">
						<div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
							<span className="material-symbols-outlined text-primary text-5xl">
								schedule
							</span>
						</div>
						<div>
							<p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
								Current Status:{' '}
								<span className="text-amber-600 dark:text-amber-400">
									Clocked Out
								</span>
							</p>
							<h3 className="text-4xl font-bold tracking-tight mt-1">
								10:45:22 AM
							</h3>
							<p className="text-slate-500 font-medium">Monday, October 23, 2023</p>
						</div>
					</div>
					<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
						<button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
							<span className="material-symbols-outlined">login</span>
							Punch In
						</button>
						<button className="bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
							<span className="material-symbols-outlined">logout</span>
							Punch Out
						</button>
					</div>
				</div> */}
			</section>
			{/* today summary */}
			<section>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold">Today's Summary</h3>
					<span className="text-xs font-medium text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
						Live Updates
					</span>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					<SummaryCard title={'Regular Hours'} value={'8.0h'} />
					<SummaryCard title={'Overtime (OT)'} value={'0.0h'} />
					<SummaryCard title={'Night Diff (ND)'} value={'0.0h'} />
					<SummaryCard title={'Late'} value={'15m'} />
					<SummaryCard title={'Undertime'} value={'0.0h'} />
				</div>
			</section>

			{/* attendance history */}
			<section>
				<div className="flex items-center justify-between mb-4">
					<h3 className="text-lg font-bold">Recent Attendance History</h3>
					<button className="text-primary text-sm font-semibold hover:underline">
						Download Report
					</button>
				</div>
				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
								<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Clock In
								</th>
								<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Clock Out
								</th>
								<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Work Hours
								</th>
								<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
							<tr>
								<td className="px-6 py-4 font-medium">Oct 20, 2023</td>
								<td className="px-6 py-4 text-slate-600 dark:text-slate-400">
									08:55 AM
								</td>
								<td className="px-6 py-4 text-slate-600 dark:text-slate-400">
									06:05 PM
								</td>
								<td className="px-6 py-4 font-semibold">9.1h</td>
								<td className="px-6 py-4 text-right">
									<Badge title={'On Time'} />
								</td>
							</tr>
							<tr>
								<td className="px-6 py-4 font-medium">Oct 19, 2023</td>
								<td className="px-6 py-4 text-slate-600 dark:text-slate-400">
									09:12 AM
								</td>
								<td className="px-6 py-4 text-slate-600 dark:text-slate-400">
									06:00 PM
								</td>
								<td className="px-6 py-4 font-semibold">8.8h</td>
								<td className="px-6 py-4 text-right">
									<Badge title={'Late'} />
								</td>
							</tr>
						</tbody>
					</table>
					<div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-center">
						<button className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">
							View All Records
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;
