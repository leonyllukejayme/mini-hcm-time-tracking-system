const Sidebar = () => {
	return (
		<aside class="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col w-9xl shrink-0">
			<div class="p-6 flex items-center gap-3">
				<div class="size-10 rounded-lg bg-primary flex items-center justify-center text-white">
					<span class="material-symbols-outlined">corporate_fare</span>
				</div>
				<div>
					<h1 class="text-sm font-bold leading-none">Mini HCM</h1>
					<p class="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
						Admin Portal
					</p>
				</div>
			</div>
			<nav class="flex-1 px-4 space-y-1">
				<a
					class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium"
					href="#">
					<span class="material-symbols-outlined">dashboard</span>
					<span class="text-sm">Dashboard</span>
				</a>
				<a
					class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
					href="#">
					<span class="material-symbols-outlined">badge</span>
					<span class="text-sm">Employee List</span>
				</a>
			</nav>
			<div class="p-4 border-t border-slate-200 dark:border-slate-800">
				<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
					<span class="material-symbols-outlined">settings</span>
					<span class="text-sm font-medium">Settings</span>
				</button>
				{/* <div class="mt-4 flex items-center gap-3 px-3">
					<div class="size-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
						<img
							alt="Admin"
							data-alt="Corporate administrator profile portrait photo"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnfnfjxAliGAkG7no_CDTrV8UPQ46sR0c1cXCvbzNvDy8df-osKOtAnpNzb3qQ4D84shXbZhEgcqrtenuFc-QHfP2xiheUlT1vRwir3NzWIJ9s2gTs5e5jDEj7lNRtVxjiW6Y7O8UMseHeMTZCuhGjkaoDs1ge1x6RhDXH-9NLASHKWB85TvdGjECAuzC7t09UxKSn7Q4aMjQ016eUmKa3Xau7tnb3y6pojkwhobq5zS82sKz3EI1VEIGZFHBp3iC7PKxi2IxarJgt"
						/>
					</div>
					<div class="flex-1 overflow-hidden">
						<p class="text-xs font-bold truncate">Alex Richards</p>
						<p class="text-[10px] text-slate-500 uppercase">Super Admin</p>
					</div>
				</div> */}
			</div>
		</aside>
	);
};

export default Sidebar;
