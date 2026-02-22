const SummaryCard = ({ title, value }) => {
	return (
		<div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
			<p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
				{title}
			</p>
			<p className="text-2xl font-bold">{value}</p>
		</div>
	);
};

export default SummaryCard;
