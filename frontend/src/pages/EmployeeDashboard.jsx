const EmployeeDashboard = () => {
	return (
		<div class="flex-1 overflow-y-auto p-8 space-y-8">
			<section class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div class="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
					<div class="flex items-center gap-6">
						<div class="bg-primary/5 p-4 rounded-2xl border border-primary/10">
							<span class="material-symbols-outlined text-primary text-5xl">
								schedule
							</span>
						</div>
						<div>
							<p class="text-sm font-medium text-slate-500 uppercase tracking-wider">
								Current Status:{' '}
								<span class="text-amber-600 dark:text-amber-400">
									Clocked Out
								</span>
							</p>
							<h3 class="text-4xl font-bold tracking-tight mt-1">
								10:45:22 AM
							</h3>
							<p class="text-slate-500 font-medium">Monday, October 23, 2023</p>
						</div>
					</div>
					<div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
						<button class="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
							<span class="material-symbols-outlined">login</span>
							Punch In
						</button>
						<button class="bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2">
							<span class="material-symbols-outlined">logout</span>
							Punch Out
						</button>
					</div>
				</div>

				{/* <div class="bg-linear-to-br from-primary to-blue-700 p-6 rounded-xl text-white shadow-lg flex flex-col justify-between">
					<div>
						<h4 class="font-bold text-lg mb-2">Upcoming Holiday</h4>
						<p class="text-blue-100 text-sm">
							Labor Day is coming up next Monday. All systems will be on
							maintenance mode.
						</p>
					</div>
					<div class="mt-4 flex items-center justify-between">
						<span class="text-xs bg-white/20 px-2 py-1 rounded">
							Oct 30, 2023
						</span>
						<a
							class="text-sm font-medium underline underline-offset-4 decoration-blue-300"
							href="#">
							View Calendar
						</a>
					</div>
				</div> */}
			</section>
			{/* today summary */}
			<section>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-bold">Today's Summary</h3>
					<span class="text-xs font-medium text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
						Live Updates
					</span>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
					<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
						<p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
							Regular Hours
						</p>
						<p class="text-2xl font-bold">8.0h</p>
						<div class="flex items-center gap-1 text-emerald-500 mt-2">
							<span class="material-symbols-outlined text-sm">trending_up</span>
							<span class="text-xs font-medium">+0%</span>
						</div>
					</div>
					<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
						<p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
							Overtime (OT)
						</p>
						<p class="text-2xl font-bold">0.0h</p>
						<div class="flex items-center gap-1 text-slate-400 mt-2">
							<span class="material-symbols-outlined text-sm">remove</span>
							<span class="text-xs font-medium">No change</span>
						</div>
					</div>
					<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
						<p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
							Night Diff (ND)
						</p>
						<p class="text-2xl font-bold">0.0h</p>
						<div class="flex items-center gap-1 text-slate-400 mt-2">
							<span class="material-symbols-outlined text-sm">remove</span>
							<span class="text-xs font-medium">No change</span>
						</div>
					</div>
					<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
						<p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
							Late
						</p>
						<p class="text-2xl font-bold text-red-500">15m</p>
						<div class="flex items-center gap-1 text-red-500 mt-2">
							<span class="material-symbols-outlined text-sm">trending_up</span>
							<span class="text-xs font-medium">+5%</span>
						</div>
					</div>
					<div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
						<p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
							Undertime
						</p>
						<p class="text-2xl font-bold">0m</p>
						<div class="flex items-center gap-1 text-emerald-500 mt-2">
							<span class="material-symbols-outlined text-sm">
								trending_down
							</span>
							<span class="text-xs font-medium">-10%</span>
						</div>
					</div>
				</div>
			</section>

			{/* attendance history */}
			<section>
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-bold">Recent Attendance History</h3>
					<button class="text-primary text-sm font-semibold hover:underline">
						Download Report
					</button>
				</div>
				<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
					<table class="w-full text-left border-collapse">
						<thead>
							<tr class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Date
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Clock In
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Clock Out
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Work Hours
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
									Status
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-100 dark:divide-slate-800">
							<tr>
								<td class="px-6 py-4 font-medium">Oct 20, 2023</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									08:55 AM
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									06:05 PM
								</td>
								<td class="px-6 py-4 font-semibold">9.1h</td>
								<td class="px-6 py-4 text-right">
									<span class="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-xs font-bold">
										On Time
									</span>
								</td>
							</tr>
							<tr>
								<td class="px-6 py-4 font-medium">Oct 19, 2023</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									09:12 AM
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									06:00 PM
								</td>
								<td class="px-6 py-4 font-semibold">8.8h</td>
								<td class="px-6 py-4 text-right">
									<span class="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded text-xs font-bold">
										Late (12m)
									</span>
								</td>
							</tr>
							<tr>
								<td class="px-6 py-4 font-medium">Oct 18, 2023</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									08:58 AM
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									06:15 PM
								</td>
								<td class="px-6 py-4 font-semibold">9.2h</td>
								<td class="px-6 py-4 text-right">
									<span class="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-xs font-bold">
										On Time
									</span>
								</td>
							</tr>
							<tr>
								<td class="px-6 py-4 font-medium">Oct 17, 2023</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									08:50 AM
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									05:45 PM
								</td>
								<td class="px-6 py-4 font-semibold">8.9h</td>
								<td class="px-6 py-4 text-right">
									<span class="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-xs font-bold">
										On Time
									</span>
								</td>
							</tr>
							<tr>
								<td class="px-6 py-4 font-medium">Oct 16, 2023</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									09:05 AM
								</td>
								<td class="px-6 py-4 text-slate-600 dark:text-slate-400">
									06:00 PM
								</td>
								<td class="px-6 py-4 font-semibold">8.9h</td>
								<td class="px-6 py-4 text-right">
									<span class="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-xs font-bold">
										On Time
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-center">
						<button class="text-slate-500 text-sm font-medium hover:text-primary transition-colors">
							View All Records
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default EmployeeDashboard;
