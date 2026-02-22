import { useEffect, useState } from 'react';

const TimeStatusCard = () => {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [isClockedIn, setIsClockedIn] = useState(false);

	// Live Clock
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const handlePunchIn = () => {
		setIsClockedIn(true);
		// TODO: call backend API here
	};

	const handlePunchOut = () => {
		setIsClockedIn(false);
		// TODO: call backend API here
	};

	const formattedTime = currentTime.toLocaleTimeString();
	const formattedDate = currentTime.toLocaleDateString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
			{/* Left Section */}
			<div className="flex items-center gap-6">
				<div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
					<span className="material-symbols-outlined text-primary text-5xl">
						schedule
					</span>
				</div>

				<div>
					<p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
						Current Status:{' '}
						<span
							className={
								isClockedIn
									? 'text-green-600 dark:text-green-400'
									: 'text-amber-600 dark:text-amber-400'
							}>
							{isClockedIn ? 'Clocked In' : 'Clocked Out'}
						</span>
					</p>

					<h3 className="text-4xl font-bold tracking-tight mt-1">
						{formattedTime}
					</h3>

					<p className="text-slate-500 font-medium">{formattedDate}</p>
				</div>
			</div>

			{/* Right Section */}
			<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
				<button
					onClick={handlePunchIn}
					disabled={isClockedIn}
					className={`px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
						isClockedIn
							? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
							: 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
					}`}>
					<span className="material-symbols-outlined">login</span>
					Punch In
				</button>

				<button
					onClick={handlePunchOut}
					disabled={!isClockedIn}
					className={`px-8 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
						!isClockedIn
							? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
							: 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
					}`}>
					<span className="material-symbols-outlined">logout</span>
					Punch Out
				</button>
			</div>
		</div>
	);
};

export default TimeStatusCard;
