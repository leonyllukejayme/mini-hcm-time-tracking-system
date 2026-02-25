import { useState } from 'react';
import EditAttendanceModal from './EditAttendanceModal';
import Badge from './Badge';

const TeamSummaryTable = ({ employees = [], onEdit }) => {
	const [open, setOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [attendance, setAttendance] = useState(null);

	const formatDateTime = (value) => {
		if (!value) return '--';
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return '--';	
		return date.toLocaleString([], {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};
	const getStatus = (employee) => {
		if (employee?.status) return employee.status;
		return Number(employee?.lateMinutes || 0) > 0 ? 'Late' : 'On Time';
	};

	const handleOpenModal = (employee) => {
		setSelectedEmployee(employee);
		setAttendance({
			clockInDate: employee?.timeIn ? new Date(employee.timeIn).toISOString().slice(0, 10) : '',
			clockInTime: employee?.timeIn ? new Date(employee.timeIn).toTimeString().slice(0, 5) : '',
			clockOutDate: employee?.timeOut
				? new Date(employee.timeOut).toISOString().slice(0, 10)
				: '',
			clockOutTime: employee?.timeOut
				? new Date(employee.timeOut).toTimeString().slice(0, 5)
				: '',
			dateLabel: employee?.date || '--',
		});
		setOpen(true);
	};

	const totals = employees.reduce(
		(acc, emp) => {
			acc.regular += Number(emp?.regularHours || 0);
			acc.ot += Number(emp?.overtime || 0);
			acc.nd += Number(emp?.nightDiff || 0);
			acc.late += Number(emp?.lateMinutes || 0);
			acc.undertime += Number(emp?.undertime || 0);
			return acc;
		},
		{ regular: 0, ot: 0, nd: 0, late: 0, undertime: 0 },
	);

	return (
		<div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
			<table className="w-full min-w-275 text-left border-collapse">
				<thead>
					<tr className="bg-slate-50 dark:bg-slate-800/50">
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Employee
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Time in
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Time out
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Regular Hrs
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							OT (Overtime)
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							ND (Night Diff)
						</th>
						<th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-rose-500">
							Late (Min)
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Undertime
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Status
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
							Actions
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
					{employees.length === 0 && (
						<tr>
							<td className="px-6 py-8 text-sm text-slate-500" colSpan={10}>
								No daily summary records found.
							</td>
						</tr>
					)}
					{employees.map((emp) => (
						<tr
							key={emp.id}
							className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
							<td className="px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
										{/* <img
											src={emp.avatar}
											alt={emp.name}
											className="w-full h-full object-cover"
										/> */}
									</div>
									<div>
										<p className="text-sm font-bold">{emp.name}</p>
										<p className="text-[10px] text-slate-500">
											ID: {emp.employeeId}
										</p>
									</div>
								</div>
							</td>

							<td className="px-6 py-4 text-sm font-medium">
								{formatDateTime(emp.timeIn)}
							</td>

							<td className="px-6 py-4 text-sm font-medium">
								{formatDateTime(emp.timeOut)}
							</td>

							<td className="px-6 py-4 text-sm font-medium">
								{Number(emp.regularHours || 0).toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-medium text-primary">
								{Number(emp.overtime || 0).toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-medium">
								{Number(emp.nightDiff || 0).toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-bold text-rose-500">
								{Number(emp.lateMinutes || 0)}
							</td>

							<td className="px-6 py-4 text-sm font-medium text-slate-400">
								{Number(emp.undertime || 0).toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-medium">
								<Badge title={getStatus(emp)} />
							</td>

							<td className="px-6 py-4 text-right">
								<button
									onClick={() => handleOpenModal(emp)}
									className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
									Edit Punches
								</button>
							</td>
						</tr>
					))}
				</tbody>

				<tfoot className="bg-slate-50 dark:bg-slate-800/50">
					<tr className="font-bold text-slate-900 dark:text-white">
						<td className="px-6 py-4 text-sm">Team Totals</td>
						<td className="px-6 py-4 text-sm"></td>
						<td className="px-6 py-4 text-sm"></td>
						<td className="px-6 py-4 text-sm">{totals.regular.toFixed(2)}</td>
						<td className="px-6 py-4 text-sm">{totals.ot.toFixed(2)}</td>
						<td className="px-6 py-4 text-sm">{totals.nd.toFixed(2)}</td>
						<td className="px-6 py-4 text-sm text-rose-500">{totals.late}m</td>
						<td className="px-6 py-4 text-sm text-amber-600">
							{totals.undertime.toFixed(2)}
						</td>
						<td className="px-6 py-4 text-right"></td>
					</tr>
				</tfoot>
			</table>
			<EditAttendanceModal
				isOpen={open}
				onClose={() => setOpen(false)}
				attendance={attendance}
				employee={selectedEmployee}
				onSave={(data) => {
					if (typeof onEdit === 'function') {
						onEdit({ employee: selectedEmployee, attendance: data });
					}
				}}
			/>
		</div>
	);
};

export default TeamSummaryTable;
