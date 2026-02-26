import { useEffect, useMemo, useState } from 'react';
import KPICard from '../components/KPICard';
import TeamSummaryTable from '../components/TeamSummaryTable';
import { useDailySummary } from '../hooks/useDailySummary';

const AdminDashboard = () => {
	// Backend URL is injected from env so this page can run across deployments.
	const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || '';
	const { employees, isLoading, refetchDailySummary } = useDailySummary(apiBaseUrl);
	const [searchEmployee, setSearchEmployee] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;
	// Filter by name or employee ID using a case-insensitive query.
	const filteredEmployees = useMemo(() => {
		const query = searchEmployee.trim().toLowerCase();
		if (!query) return employees ?? [];
		return (employees ?? []).filter((employee) => {
			const name = String(employee?.name ?? '').toLowerCase();
			const employeeId = String(employee?.employeeId ?? '').toLowerCase();
			return name.includes(query) || employeeId.includes(query);
		});
	}, [employees, searchEmployee]);
	const totalEmployees = filteredEmployees.length;
	const totalPages = Math.max(1, Math.ceil(totalEmployees / pageSize));
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalEmployees);
	// Paginated Employees
	const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex).map((employee) => {
		// if has time out
		const hasTimeOut = Boolean(employee?.timeOut) && employee.timeOut !== '--';
		if (!hasTimeOut) {
			return { ...employee, status: 'In Progress' };
		}
		return employee;
	});
	// KPI values are computed from the filtered list so cards match table results.
	const { presentEmployees, lateEmployees, onTimeEmployees } = filteredEmployees.reduce(
		(acc, employee) => {
			const isPresent = Boolean(employee?.timeIn) && employee.timeIn !== '--';
			if (!isPresent) return acc;
			acc.presentEmployees += 1;
			const isLate = Number(employee?.lateMinutes || 0) > 0;
			if (isLate) {
				acc.lateEmployees += 1;
			} else {
				acc.onTimeEmployees += 1;
			}
			return acc;
		},
		{ presentEmployees: 0, lateEmployees: 0, onTimeEmployees: 0 },
	);
	const handleEdit = async () => {
		await refetchDailySummary();
	};
	
	
	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
	}, [totalPages]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCurrentPage(1);
	}, [searchEmployee]);
	
	useEffect(() => {
		document.title = 'Admin Dashboard - MCM Time Tracking';
	}, []);
	return (
		<div className="flex-1 overflow-y-auto p-8 space-y-8">
			{/* KPI Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<KPICard
						title={'Total Employees'}
						value={totalEmployees.toLocaleString()}
						icon={'groups'}
						classNameName={'p-2 bg-primary/10 rounded-lg text-primary'}
					/>
					<KPICard
						title={'Present Today'}
						value={presentEmployees.toLocaleString()}
						icon={'how_to_reg'}
						classNameName={
							'p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600'
						}
					/>
					<KPICard
						title={'Late Today'}
						value={lateEmployees.toLocaleString()}
						icon={'schedule'}
						classNameName={
							'p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600'
						}
					/>
					<KPICard
						title={'On-	Time Today'}
						value={onTimeEmployees.toLocaleString()}
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
						<h3 className="font-black text-lg">Attndance list</h3>
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
								value={searchEmployee}
								onChange={(event) => setSearchEmployee(event.target.value)}
							/>
						</div>
						{/* <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
							<span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
								filter_list
							</span>
						</button> */}
					</div>
				</div>
				<div className="overflow-x-auto">
					{isLoading ? (
						<div className="p-6 text-sm text-slate-500">Loading Attendance List...</div>
					) : (
						<TeamSummaryTable employees={paginatedEmployees} onEdit={handleEdit} />
					)}
				</div>
					<div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
						<p className="text-xs text-slate-500 font-medium">
							Showing {totalEmployees === 0 ? 0 : startIndex + 1}-{endIndex} of{' '}
							{totalEmployees.toLocaleString()} entries
						</p>
						<div className="flex gap-2">
							<button
								disabled={currentPage === 1}
								onClick={() => setCurrentPage((prevPage) => Math.max(1, prevPage - 1))}
								className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">
								Previous
							</button>
							<button
								disabled={currentPage === totalPages}
								onClick={() =>
									setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1))
								}
								className="px-3 py-1 bg-primary text-white rounded-md text-xs font-bold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
								Next
							</button>
						</div>
					</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
