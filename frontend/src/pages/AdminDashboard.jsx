const AdminDashboard = () => {
	return (
		<div class="flex-1 overflow-y-auto p-8 space-y-8">
			{/* KPI Cards */}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
					<div class="flex justify-between items-start">
						<div>
							<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
								Total Employees
							</p>
							<p class="text-3xl font-black mt-1">1,248</p>
						</div>
						<div class="p-2 bg-primary/10 rounded-lg text-primary">
							<span class="material-symbols-outlined">groups</span>
						</div>
					</div>
					<div class="mt-4 flex items-center gap-1 text-[13px] font-medium text-emerald-600">
						<span class="material-symbols-outlined text-sm">trending_up</span>
						<span>+2.5%</span>
						<span class="text-slate-400 font-normal ml-1">from last month</span>
					</div>
				</div>
				<div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
					<div class="flex justify-between items-start">
						<div>
							<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
								Present Today
							</p>
							<p class="text-3xl font-black mt-1">1,102</p>
						</div>
						<div class="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
							<span class="material-symbols-outlined">how_to_reg</span>
						</div>
					</div>
					<div class="mt-4 flex items-center gap-1 text-[13px] font-medium text-rose-600">
						<span class="material-symbols-outlined text-sm">trending_down</span>
						<span>-1.2%</span>
						<span class="text-slate-400 font-normal ml-1">vs yesterday</span>
					</div>
				</div>
				<div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
					<div class="flex justify-between items-start">
						<div>
							<p class="text-xs font-bold text-slate-500 uppercase tracking-wider">
								Late Today
							</p>
							<p class="text-3xl font-black mt-1">14</p>
						</div>
						<div class="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
							<span class="material-symbols-outlined">schedule</span>
						</div>
					</div>
					<div class="mt-4 flex items-center gap-1 text-[13px] font-medium text-emerald-600">
						<span class="material-symbols-outlined text-sm">
							arrow_downward
						</span>
						<span>-5.0%</span>
						<span class="text-slate-400 font-normal ml-1">improvement</span>
					</div>
				</div>
				{/* Add more KPI cards as needed */}
			</div>
			{/* table */}
			<div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
				<div class="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h3 class="font-black text-lg">Weekly Aggregate Reports</h3>
						<p class="text-sm text-slate-500">
							Consolidated attendance metrics for the current week
						</p>
					</div>
					<div class="flex items-center gap-2">
						<div class="relative">
							<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
								search
							</span>
							<input
								class="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64"
								placeholder="Search employee..."
								type="text"
							/>
						</div>
						<button class="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
							<span class="material-symbols-outlined text-slate-600 dark:text-slate-400">
								filter_list
							</span>
						</button>
					</div>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full text-left border-collapse">
						<thead>
							<tr class="bg-slate-50 dark:bg-slate-800/50">
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Employee
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Regular Hrs
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									OT (Overtime)
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									ND (Night Diff)
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-rose-500">
									Late (Min)
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
									Undertime
								</th>
								<th class="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
									Actions
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-100 dark:divide-slate-800">
							<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div class="size-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
											<img
												alt="User"
												class="w-full h-full object-cover"
												data-alt="Male employee profile photo small thumbnail"
												src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk-4acjc_nxY-gq6de6SPxzhkxeGmCv1B3PmXSQgJbTvAql8ZhqNRUQNLUZx3FaAxR0q7ZqhbNZcPdlgCgl_RpBNs_cY5460G3wmzPJRXwK6xrZij756_g_lEhahux3aefsSrp7CRCsdab71cJ_Hs7sBIUx_z52YcQMuzUqLDhzJAv7Jw5zp6hMzyhVrEECTtfByo5uQ94CwREZa9Wngi-nI_c7YN2TKxPQKk_LLS-d6Zr-2vVQFj2125YSqHj1xk6G_-ccWal049a"
											/>
										</div>
										<div>
											<p class="text-sm font-bold">John Doe</p>
											<p class="text-[10px] text-slate-500">ID: EMP-001</p>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 text-sm font-medium">40.00</td>
								<td class="px-6 py-4 text-sm font-medium text-primary">4.50</td>
								<td class="px-6 py-4 text-sm font-medium">0.00</td>
								<td class="px-6 py-4 text-sm font-bold text-rose-500">12</td>
								<td class="px-6 py-4 text-sm font-medium text-slate-400">
									0.00
								</td>
								<td class="px-6 py-4 text-right">
									<button class="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
										Edit Punches
									</button>
								</td>
							</tr>
						</tbody>
						<tfoot class="bg-slate-50 dark:bg-slate-800/50">
							<tr class="font-bold text-slate-900 dark:text-white">
								<td class="px-6 py-4 text-sm">Team Totals</td>
								<td class="px-6 py-4 text-sm">158.25</td>
								<td class="px-6 py-4 text-sm">18.50</td>
								<td class="px-6 py-4 text-sm">8.00</td>
								<td class="px-6 py-4 text-sm text-rose-500">57m</td>
								<td class="px-6 py-4 text-sm text-amber-600">1.75</td>
								<td class="px-6 py-4 text-right"></td>
							</tr>
						</tfoot>
					</table>
				</div>
				<div class="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
					<p class="text-xs text-slate-500 font-medium">
						Showing 4 of 1,248 entries
					</p>
					<div class="flex gap-2">
						<button class="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
							Previous
						</button>
						<button class="px-3 py-1 bg-primary text-white rounded-md text-xs font-bold shadow-sm">
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
