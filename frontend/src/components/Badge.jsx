const Badge = ({ title }) => {
	if (title === 'Late') {
		return (
			<span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded text-xs font-bold">
				Late
			</span>
		);
	} else if (title === 'On Time') {
		return (
			<span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded text-xs font-bold">
				On Time
			</span>
		);
	}
	else if (title === 'In Progress') {
		return (
			<span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded text-xs font-bold">
				In Progress
			</span>
		);
	}
};

export default Badge;
