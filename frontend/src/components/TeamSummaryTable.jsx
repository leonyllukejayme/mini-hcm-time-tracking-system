import { useState } from 'react';
import EditAttendanceModal from './EditAttendanceModal';

const TeamSummaryTable = ({ employees = []}) => {
	const [open, setOpen] = useState(false);
	const [attendance, setAttendance] = useState(null);
	const totals = employees.reduce(
		(acc, emp) => {
			acc.regular += emp.regularHours;
			acc.ot += emp.overtime;
			acc.nd += emp.nightDiff;
			acc.late += emp.lateMinutes;
			acc.undertime += emp.undertime;
			return acc;
		},
		{ regular: 0, ot: 0, nd: 0, late: 0, undertime: 0 },
	);
	// setAttendance({
	// 	clockInDate: '',
	// 	clockInTime: '',
	// 	clockOutDate: '',
	// 	clockOutTime: '',
	// 	reason: 'forgot',
	// });

	return (
		<div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
			<table className="w-full text-left border-collapse">
				<thead>
					<tr className="bg-slate-50 dark:bg-slate-800/50">
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Date
						</th>
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
							Employee
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
						<th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
							Actions
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-slate-100 dark:divide-slate-800">
					{employees.map((emp) => (
						<tr
							key={emp.id}
							className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
							<td className="px-6 py-4 text-sm font-medium">
								2026-09-15
							</td>
							<td className="px-6 py-4">
								<div className="flex items-center gap-3">
									<div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
										<img
											src={emp.avatar}
											alt={emp.name}
											className="w-full h-full object-cover"
										/>
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
								{emp.regularHours.toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-medium text-primary">
								{emp.overtime.toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-medium">
								{emp.nightDiff.toFixed(2)}
							</td>

							<td className="px-6 py-4 text-sm font-bold text-rose-500">
								{emp.lateMinutes}
							</td>

							<td className="px-6 py-4 text-sm font-medium text-slate-400">
								{emp.undertime.toFixed(2)}
							</td>

							<td className="px-6 py-4 text-right">
								<button
									onClick={() => setOpen(true)}
									className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
									Edit Punches
								</button>
								<EditAttendanceModal
									isOpen={open}
									onClose={() => setOpen(false)}
									attendance={attendance}
									employee={employees.find((e) => e.id === emp.id)}
									onSave={(data) => {
										console.log('Edited attendance:', data);}}
								/>
							</td>
						</tr>
					))}
				</tbody>

				<tfoot className="bg-slate-50 dark:bg-slate-800/50">
					<tr className="font-bold text-slate-900 dark:text-white">
						<td className="px-6 py-4 text-sm">Team Totals</td>
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
		</div>
	);
};

export default TeamSummaryTable;
