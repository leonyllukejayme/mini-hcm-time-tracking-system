import { useEffect } from 'react';
import Badge from '../components/Badge';
import SummaryCard from '../components/SummaryCard';
import TimeStatusCard from '../components/TimeStatusCard';

const EmployeeDashboard = () => {
	useEffect(() => {
		document.title = 'Employee Dashboard - MCM Time Tracking';
	}, []);
	return (
		<div className="flex-1 overflow-y-auto p-8 space-y-8">
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<TimeStatusCard />
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
