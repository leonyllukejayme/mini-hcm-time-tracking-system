const Header = () => {
	return (
		<header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
			<div class="flex items-center gap-4">
				<h2 class="text-xl font-bold text-slate-900 dark:text-white">
					Admin Dashboard
				</h2>
				<div class="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
				<div class="flex items-center gap-2 text-sm font-medium text-slate-500">
					<span class="material-symbols-outlined text-base">
						calendar_today
					</span>
					<span>May 22 - May 28, 2024</span>
					<button class="material-symbols-outlined text-base hover:text-primary transition-colors cursor-pointer">
						expand_more
					</button>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
					<span class="material-symbols-outlined">notifications</span>
				</button>
				<button class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
					<span class="material-symbols-outlined text-sm">download</span>
					Export Reports
				</button>
			</div>
		</header>
	);
};

export default Header;
