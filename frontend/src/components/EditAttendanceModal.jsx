import { useEffect, useState } from 'react';

export default function EditAttendanceModal({
	isOpen,
	onClose,
	attendance,
	employee,
	onSave,
}) {
	const [form, setForm] = useState({
		clockInDate: '',
		clockInTime: '',
		clockOutDate: '',
		clockOutTime: '',
		reason: 'forgot',
	});

	// Populate form when modal opens
	useEffect(() => {
		if (attendance) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setForm({
				clockInDate: attendance.clockInDate,
				clockInTime: attendance.clockInTime,
				clockOutDate: attendance.clockOutDate,
				clockOutTime: attendance.clockOutTime,
				reason: attendance.reason || 'forgot',
			});
		}
	}, [attendance]);

	if (!isOpen) return null;

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSave(form);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
			onClick={onClose}>
			<div
				className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
				onClick={(e) => e.stopPropagation()}>
				{/* Header */}
				<div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
					<h3 className="font-black text-lg text-slate-900 dark:text-white">
						Edit Attendance Record
					</h3>
					<button
						onClick={onClose}
						className="material-symbols-outlined text-slate-400 hover:text-slate-600 transition-colors">
						close
					</button>
				</div>

				<form onSubmit={handleSubmit}>
					<div className="p-6 space-y-5">
						{/* Employee Info */}
						<div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
							<div className="size-12 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
								<img
									src={employee?.avatar}
									alt="User"
									className="w-full h-full object-cover"
								/>
							</div>
							<div>
								<p className="text-sm font-bold text-slate-900 dark:text-white">
									{employee?.name}
								</p>
								<p className="text-[11px] text-slate-500 font-medium uppercase tracking-tight">
									ID: {employee?.id} • {attendance?.dateLabel}
								</p>
							</div>
						</div>

						{/* Clock In */}
						<div className="space-y-3">
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
								Clock In
							</label>

							<div className="grid grid-cols-2 gap-4">
								<input
									type="date"
									name="clockInDate"
									value={form.clockInDate}
									onChange={handleChange}
									className="input-style"
								/>

								<input
									type="time"
									name="clockInTime"
									value={form.clockInTime}
									onChange={handleChange}
									className="input-style"
								/>
							</div>
						</div>

						{/* Clock Out */}
						<div className="space-y-3">
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
								Clock Out
							</label>

							<div className="grid grid-cols-2 gap-4">
								<input
									type="date"
									name="clockOutDate"
									value={form.clockOutDate}
									onChange={handleChange}
									className="input-style"
								/>

								<input
									type="time"
									name="clockOutTime"
									value={form.clockOutTime}
									onChange={handleChange}
									className="input-style"
								/>
							</div>
						</div>

						{/* Reason */}
						{/* <div className="space-y-1.5">
							<label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
								Reason for Edit
							</label>

							<select
								name="reason"
								value={form.reason}
								onChange={handleChange}
								className="input-style">
								<option value="forgot">Forgot to punch</option>
								<option value="system">System error</option>
								<option value="overtime">Authorized overtime</option>
								<option value="other">Other</option>
							</select>
						</div> */}
					</div>

					{/* Footer */}
					<div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
						<button
							type="button"
							onClick={onClose}
							className="px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
							Cancel
						</button>

						<button
							type="submit"
							className="px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all transform active:scale-95">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
