const KPICard = ({ title, value, className, icon }) => {
	return (
		<div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
			<div className="flex justify-between items-start">
				<div>
					<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
						{title}
					</p>
					<p className="text-3xl font-black mt-1">{value}</p>
				</div>
				<div className={`${className}`}>
					<span className="material-symbols-outlined">{icon}</span>
				</div>
			</div>
		</div>
	);
};

export default KPICard;
