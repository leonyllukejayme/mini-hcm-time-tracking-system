import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Badge from '../components/Badge';
import SummaryCard from '../components/SummaryCard';
import TimeStatusCard from '../components/TimeStatusCard';

const ATTENDANCE_UPDATED_EVENT = 'attendance:updated';

const EmployeeDashboard = () => {
	const [attendanceHistory, setAttendanceHistory] = useState([]);
	const [historyLoading, setHistoryLoading] = useState(() =>
		Boolean(localStorage.getItem('token')),
	);
	const [historyError, setHistoryError] = useState('');
	const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || '';

	useEffect(() => {
		document.title = 'Employee Dashboard - MCM Time Tracking';
	}, []);

	useEffect(() => {
		const fetchHistory = () => {
			const token = localStorage.getItem('token');
			if (!token) return;

			axios
				.get(`${apiBaseUrl}/api/attendance/history`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(({ data }) => {
					setAttendanceHistory(
						Array.isArray(data?.history) ? data.history : [],
					);
					setHistoryError('');
				})
				.catch((error) => {
					console.error('Failed to load attendance history:', error);
					setHistoryError('Unable to load attendance history.');
				})
				.finally(() => {
					setHistoryLoading(false);
				});
		};

		fetchHistory();
		window.addEventListener(ATTENDANCE_UPDATED_EVENT, fetchHistory);

		return () => {
			window.removeEventListener(ATTENDANCE_UPDATED_EVENT, fetchHistory);
		};
	}, [apiBaseUrl]);

	const tableRows = useMemo(() => {
		return attendanceHistory.map((record) => {
			const rowDateIn = record?.timeIn ? new Date(`${record.timeIn}`) : null;
			const clockInDate = record?.timeIn ? new Date(record.timeIn) : null;
			const rowDateOut = record?.timeOut ? new Date(`${record.timeOut}`) : null;
			const clockOutDate = record?.timeOut ? new Date(record.timeOut) : null;

			return {
				id:
					record?.id || `${record?.date || 'unknown'}-${record?.timeIn || ''}`,
				dateIn: rowDateIn
					? rowDateIn.toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})
					: '--',
				clockIn: clockInDate
					? clockInDate.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})
					: '--',
				dateOut: rowDateOut
					? rowDateIn.toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})
					: '--',
				clockOut: clockOutDate
					? clockOutDate.toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit',
						})
					: '--',
				workHours:
					typeof record?.workHours === 'number'
						? `${record.workHours.toFixed(1)}h`
						: '--',
				status:
					record?.status === 'Late' ||
					record?.status === 'On Time' ||
					record?.status === 'In Progress'
						? record.status
						: null,
				// record?.status
			};
		});
	}, [attendanceHistory]);

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
					<SummaryCard
						title={'Regular Hours'}
						value={`${Math.round((attendanceHistory[0]?.regularHours || 0) * 100) / 100}h`}
					/>

					<SummaryCard
						title={'Overtime (OT)'}
						value={`${Math.round((attendanceHistory[0]?.overtimeHours || 0) * 100) / 100}h`}
					/>

					<SummaryCard
						title={'Night Diff (ND)'}
						value={`${Math.round((attendanceHistory[0]?.nightHours || 0) * 100) / 100}h`}
					/>

					<SummaryCard
						title={'Late'}
						value={`${Math.round((attendanceHistory[0]?.lateMinutes || 0) * 100) / 100}m`}
					/>

					<SummaryCard
						title={'Undertime'}
						value={`${Math.round((attendanceHistory[0]?.underTimeMinutes || 0) * 100) / 100}m`}
					/>
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
									Date
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
							{historyLoading && (
								<tr>
									<td className="px-6 py-4 text-slate-500" colSpan={5}>
										Loading attendance history...
									</td>
								</tr>
							)}
							{!historyLoading && historyError && (
								<tr>
									<td className="px-6 py-4 text-rose-500" colSpan={5}>
										{historyError}
									</td>
								</tr>
							)}
							{!historyLoading && !historyError && tableRows.length === 0 && (
								<tr>
									<td className="px-6 py-4 text-slate-500" colSpan={5}>
										No attendance records found.
									</td>
								</tr>
							)}
							{!historyLoading &&
								!historyError &&
								tableRows.map((row) => (
									<tr key={row.id}>
										<td className="px-6 py-4 font-medium">{row.dateIn}</td>
										<td className="px-6 py-4 text-slate-600 dark:text-slate-400">
											{row.clockIn}
										</td>
										<td className="px-6 py-4 font-medium">{row.dateOut}</td>
										<td className="px-6 py-4 text-slate-600 dark:text-slate-400">
											{row.clockOut}
										</td>
										<td className="px-6 py-4 font-semibold">{row.workHours}</td>
										<td className="px-6 py-4 text-right">
											{row.status ? <Badge title={row.status} /> : '--'}
										</td>
									</tr>
								))}
						</tbody>
					</table>
					{/* <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-center">
						<button className="text-slate-500 text-sm font-medium hover:text-primary transition-colors">
							View All Records
						</button>
					</div> */}
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;
