const Header = ({
	role = 'employee',
	title,
	dateRange = 'May 22 - May 28, 2024',
}) => {
	const isAdmin = role === 'admin';

	return (
		<header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
			{/* Left Section */}
			<div className="flex items-center gap-4">
				<h2 className="text-xl font-bold text-slate-900 dark:text-white">
					{title || (isAdmin ? 'Admin Dashboard' : 'Employee Dashboard')}
				</h2>

				<div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

				<div className="flex items-center gap-2 text-sm font-medium text-slate-500">
					<span className="material-symbols-outlined text-base">
						calendar_today
					</span>

					<span>{dateRange}</span>

					<button className="material-symbols-outlined text-base hover:text-primary transition-colors cursor-pointer">
						expand_more
					</button>
				</div>
			</div>

			{/* Right Section */}
			<div className="flex items-center gap-3">
				{/* Notifications */}
				<button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
					<span className="material-symbols-outlined">notifications</span>
				</button>

				{/* Admin Only Button */}
				{isAdmin ? (
					<button
						className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors">
						<span className="material-symbols-outlined text-sm">
							person_add
						</span>
						Add Employee
					</button>
				) : null}
			</div>
		</header>
	);
};

export default Header;
