import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const METRIC_DEFINITIONS = [
	{
		key: 'regular',
		label: 'Regular (min)',
		color: '#2563eb',
		group: 'hours',
	},
	{
		key: 'overtime',
		label: 'Overtime (min)',
		color: '#0ea5e9',
		group: 'hours',
	},
	{
		key: 'late',
		label: 'Total Late (min)',
		color: '#f59e0b',
		group: 'attendance',
	},
	{
		key: 'undertime',
		label: 'Undertime (min)',
		color: '#ef4444',
		group: 'attendance',
	},
];

function SummaryCard({ label, value, unit }) {
	return (
		<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
			<p className="text-slate-500 text-sm font-medium">{label}</p>
			<div className="flex items-baseline gap-2 mt-1">
				<h3 className="text-2xl font-bold">
					{value}
					{unit}
				</h3>
			</div>
		</div>
	);
}

export default function Reports() {
	// ==============================
	// STATE
	// ==============================
	const [activeTab, setActiveTab] = useState('daily');
	const [search, setSearch] = useState('');
	const [metricsFilter, setMetricsFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [dailyData, setDailyData] = useState([]);
	const [weeklyData, setWeeklyData] = useState([]);
	const [loading, setLoading] = useState(true);
	const apiBaseUrl = import.meta.env.VITE_BACKEND_URL || '';
	const dailyChartRef = useRef(null);
	const weeklyChartRef = useRef(null);
	const dailyChartInstanceRef = useRef(null);
	const weeklyChartInstanceRef = useRef(null);

	const entriesPerPage = 5;
	useEffect(() => {
		const fetchReports = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const month = new Date().toISOString().slice(5, 7);
				const headers = { Authorization: `Bearer ${token}` };
				const [usersResponse, dailyResponse] = await Promise.all([
					axios.get(`${apiBaseUrl}/api/admin/users`, { headers }),
					axios.get(`${apiBaseUrl}/api/admin/daily-reports/month/${month}`, {
						headers,
					}),
				]);

				const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
				const namesById = users.reduce((acc, user) => {
					const id = user?.uid || user?.userId || user?._id;
					if (id) acc[id] = user?.name || user?.fullName || 'Unknown Employee';
					return acc;
				}, {});

				const rows = (Array.isArray(dailyResponse.data) ? dailyResponse.data : []).map(
					(entry, index) => {
						const name =
							namesById[entry?.userId] ||
							entry?.name ||
							entry?.userId ||
							'Unknown Employee';
						const initials = name
							.split(' ')
							.filter(Boolean)
							.slice(0, 2)
							.map((part) => part[0]?.toUpperCase())
							.join('');
						const late = Number(entry?.totals?.lateMinutes || 0);
						const undertime = Number(entry?.totals?.undertimeMinutes || 0);

						return {
							id: entry?.id || `${entry?.userId || 'emp'}-${entry?.date || index}`,
							userId: entry?.userId || 'unknown',
							name,
							initials: initials || 'NA',
							date: entry?.date || '-',
							regular: Number(entry?.totals?.regularHours || 0).toFixed(2),
							ot: Number(entry?.totals?.overtimeHours || 0).toFixed(2),
							nd: Number(entry?.totals?.nightDiffHours || 0).toFixed(2),
							late: String(late),
							undertime: String(undertime),
							status:
								late > 0 ? 'Late' : undertime > 0 ? 'Undertime' : 'Normal',
						};
					},
				);

				const weeklyMap = rows.reduce((acc, row) => {
					const sourceDate = new Date(row.date);
					const day = sourceDate.getDay();
					const mondayOffset = (day + 6) % 7;
					const weekStart = new Date(sourceDate);
					weekStart.setDate(sourceDate.getDate() - mondayOffset);
					const weekKey = weekStart.toISOString().slice(0, 10);
					const weekEnd = new Date(weekStart);
					weekEnd.setDate(weekStart.getDate() + 4);
					const weekEndKey = weekEnd.toISOString().slice(0, 10);
					const key = `${row.userId}-${weekKey}`;

					if (!acc[key]) {
						acc[key] = {
							id: key,
							name: row.name,
							initials: row.initials,
							date: `Week of ${weekKey} to ${weekEndKey}`,
							regular: 0,
							ot: 0,
							nd: 0,
							late: 0,
							undertime: 0,
						};
					}

					acc[key].regular += Number(row.regular);
					acc[key].ot += Number(row.ot);
					acc[key].nd += Number(row.nd);
					acc[key].late += Number(row.late);
					acc[key].undertime += Number(row.undertime);
					return acc;
				}, {});

				const weeklyRows = Object.values(weeklyMap).map((row) => ({
					...row,
					regular: row.regular.toFixed(2),
					ot: row.ot.toFixed(2),
					nd: row.nd.toFixed(2),
					late: String(row.late),
					undertime: String(row.undertime),
					status: row.late > 0 ? 'Late' : row.undertime > 0 ? 'Undertime' : 'Normal',
				}));

				setDailyData(rows);
				setWeeklyData(weeklyRows);
			} catch (error) {
				console.error('Failed to fetch reports:', error);
				setDailyData([]);
				setWeeklyData([]);
			} finally {
				setLoading(false);
			}
		};

		fetchReports();
	}, [apiBaseUrl]);

	const data = activeTab === 'daily' ? dailyData : weeklyData;

	// ==============================
	// FILTERED DATA
	// ==============================
	const filteredData = useMemo(() => {
		return data.filter((item) =>
			item.name.toLowerCase().includes(search.toLowerCase()),
		);
	}, [data, search]);

	const totalPages = Math.ceil(filteredData.length / entriesPerPage);

	const paginatedData = filteredData.slice(
		(currentPage - 1) * entriesPerPage,
		currentPage * entriesPerPage,
	);

	// ==============================
	// SUMMARY CALCULATIONS
	// ==============================
	const totalRegular = filteredData.reduce(
		(sum, item) => sum + parseFloat(item.regular),
		0,
	);

	const totalOT = filteredData.reduce(
		(sum, item) => sum + parseFloat(item.ot),
		0,
	);

	const totalLate = filteredData.reduce(
		(sum, item) => sum + parseFloat(item.late),
		0,
	);

	const totalUndertime = filteredData.reduce(
		(sum, item) => sum + parseFloat(item.undertime),
		0,
	);
	const roundValue = (value) => Math.round(value * 100) / 100;
	const roundedTotalRegular = roundValue(totalRegular);
	const roundedTotalOT = roundValue(totalOT);
	const roundedTotalLate = roundValue(totalLate);
	const roundedTotalUndertime = roundValue(totalUndertime);

	const summaryCards = [
		{ label: 'Regular Hours', value: roundedTotalRegular, unit: 'h' },
		{ label: 'Total Overtime', value: roundedTotalOT, unit: 'h' },
		{ label: 'Total Late (min)', value: roundedTotalLate, unit: 'm' },
		{ label: 'Undertime (min)', value: roundedTotalUndertime, unit: 'm' },
	];
		// ==============================
	//  METRICS CHART
	// ==============================
	const getMetrics = (items) => {
		let regularMinutes = 0;
		let overtimeMinutes = 0;
		let lateMinutes = 0;
		let undertimeMinutes = 0;

		for (let i = 0; i < items.length; i += 1) {
			const item = items[i];
			regularMinutes += parseFloat(item.regular) * 60;
			overtimeMinutes += parseFloat(item.ot) * 60;
			lateMinutes += parseFloat(item.late);
			undertimeMinutes += parseFloat(item.undertime);
		}

		return {
			regular: regularMinutes,
			overtime: overtimeMinutes,
			late: lateMinutes,
			undertime: undertimeMinutes,
		};
	};

	const filteredMetricDefinitions = useMemo(() => {
		if (metricsFilter === 'hours')
			return METRIC_DEFINITIONS.filter((metric) => metric.group === 'hours');
		if (metricsFilter === 'attendance')
			return METRIC_DEFINITIONS.filter((metric) => metric.group === 'attendance');
		return METRIC_DEFINITIONS;
	}, [metricsFilter]);

	const chartLabels = filteredMetricDefinitions.map((metric) => metric.label);
	const chartColors = filteredMetricDefinitions.map((metric) => metric.color);
	const normalizedSearch = search.toLowerCase();
	const filteredDailyData = useMemo(
		() =>
			dailyData.filter((item) =>
				item.name.toLowerCase().includes(normalizedSearch),
			),
		[dailyData, normalizedSearch],
	);
	const filteredWeeklyData = useMemo(
		() =>
			weeklyData.filter((item) =>
				item.name.toLowerCase().includes(normalizedSearch),
			),
		[weeklyData, normalizedSearch],
	);
	const dailyMetricsMap = useMemo(
		() => getMetrics(filteredDailyData),
		[filteredDailyData],
	);
	const weeklyMetricsMap = useMemo(
		() => getMetrics(filteredWeeklyData),
		[filteredWeeklyData],
	);
	const dailyMetrics = filteredMetricDefinitions.map(
		(metric) => dailyMetricsMap[metric.key],
	);
	const weeklyMetrics = filteredMetricDefinitions.map(
		(metric) => weeklyMetricsMap[metric.key],
	);

	useEffect(() => {
		if (!dailyChartRef.current || !weeklyChartRef.current) return;

		if (dailyChartInstanceRef.current) dailyChartInstanceRef.current.destroy();
		if (weeklyChartInstanceRef.current) weeklyChartInstanceRef.current.destroy();

		const baseOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: { legend: { display: false } },
			scales: {
				y: {
					beginAtZero: true,
					ticks: { precision: 0 },
				},
			},
		};

		dailyChartInstanceRef.current = new Chart(dailyChartRef.current, {
			type: 'bar',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Daily Metrics',
						data: dailyMetrics,
						backgroundColor: chartColors,
						borderRadius: 8,
					},
				],
			},
			options: baseOptions,
		});

		weeklyChartInstanceRef.current = new Chart(weeklyChartRef.current, {
			type: 'bar',
			data: {
				labels: chartLabels,
				datasets: [
					{
						label: 'Weekly Metrics',
						data: weeklyMetrics,
						backgroundColor: chartColors,
						borderRadius: 8,
					},
				],
			},
			options: baseOptions,
		});

		return () => {
			if (dailyChartInstanceRef.current) dailyChartInstanceRef.current.destroy();
			if (weeklyChartInstanceRef.current) weeklyChartInstanceRef.current.destroy();
		};
	}, [dailyMetrics, weeklyMetrics, chartLabels, chartColors]);
	return (
		<main className="flex-1 flex flex-col overflow-hidden">
			{/* HEADER */}
			<header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10">
				<div className="flex items-center gap-4">
					<h2 className="text-xl font-bold tracking-tight">
						Attendance Reports
					</h2>
				</div>
			</header>

			<div className="flex-1 overflow-y-auto p-8">
				{/* SUMMARY CARDS */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					{summaryCards.map((card) => (
						<SummaryCard
							key={card.label}
							label={card.label}
							value={card.value}
							unit={card.unit}
						/>
					))}
				</div>

				<div className="flex justify-end mb-3">
					<select
						value={metricsFilter}
						onChange={(e) => setMetricsFilter(e.target.value)}
						className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
						<option value="all">All Metrics</option>
						<option value="hours">Hours Only</option>
						<option value="attendance">Attendance Only</option>
					</select>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
					<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
						<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">
							Daily Reports Metrics
						</h3>
						<div className="h-72">
							<canvas ref={dailyChartRef} />
						</div>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
						<h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">
							Weekly Reports Metrics
						</h3>
						<div className="h-72">
							<canvas ref={weeklyChartRef} />
						</div>
					</div>
				</div>

				{/* FILTER SECTION */}
				<div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6">
					<div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
						<div className="flex border-slate-200 dark:border-slate-800 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
							<button
								onClick={() => setActiveTab('daily')}
								className={`px-4 py-1.5 text-sm font-semibold rounded-md ${
									activeTab === 'daily'
										? 'bg-white dark:bg-slate-900 text-primary shadow-sm'
										: 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
								}`}>
								Daily Reports
							</button>

							<button
								onClick={() => setActiveTab('weekly')}
								className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
								Weekly Summary
							</button>
						</div>

						<div className="flex flex-wrap items-center gap-4">
							<div className="relative">
								<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
									search
								</span>
								<input
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search employee..."
									type="text"
									className="pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary w-64"
								/>
							</div>
						</div>
					</div>

					{/* TABLE */}
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead>
								<tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
									<th className="px-6 py-4 font-semibold">Employee Name</th>
									<th className="px-6 py-4 font-semibold">Date</th>
									<th className="px-6 py-4 font-semibold text-center">
										Regular
									</th>
									<th className="px-6 py-4 font-semibold text-center">
										OT (hrs)
									</th>
									<th className="px-6 py-4 font-semibold text-center">
										ND (hrs)
									</th>
									<th className="px-6 py-4 font-semibold text-center">
										Late (m)
									</th>
									<th className="px-6 py-4 font-semibold text-center">
										Undertime (m)
									</th>
									<th className="px-6 py-4 font-semibold">Status</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-slate-200 dark:divide-slate-800">
								{loading ? (
									<tr>
										<td
											colSpan="8"
											className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
											Loading reports...
										</td>
									</tr>
								) : (
									paginatedData.map((item, index) => (
										<tr
											key={index}
											className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
														{item.initials}
													</div>
													<span className="text-sm font-medium">{item.name}</span>
												</div>
											</td>

											<td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
												{item.date}
											</td>

											<td className="px-6 py-4 text-sm text-center">
												{item.regular}
											</td>

											<td className="px-6 py-4 text-sm text-center">{item.ot}</td>

											<td className="px-6 py-4 text-sm text-center">{item.nd}</td>

											<td className="px-6 py-4 text-sm text-center">
												{item.late}
											</td>

											<td className="px-6 py-4 text-sm text-center">
												{item.undertime}
											</td>

											<td className="px-6 py-4">
												<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
													{item.status}
												</span>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* PAGINATION */}
					<div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
						<p className="text-sm text-slate-500 dark:text-slate-400">
							Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
							{Math.min(currentPage * entriesPerPage, filteredData.length)} of{' '}
							{filteredData.length} entries
						</p>

						<div className="flex gap-2">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
								Previous
							</button>

							{[...Array(totalPages)].map((_, i) => (
								<button
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`px-3 py-1 text-sm rounded ${
										currentPage === i + 1
											? 'bg-primary text-white'
											: 'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
									}`}>
									{i + 1}
								</button>
							))}

							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(prev + 1, totalPages))
								}
								className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
								Next
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
