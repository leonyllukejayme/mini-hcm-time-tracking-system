import dayjs from 'dayjs';

/**
 * Calculates work hours including regular, overtime, late, undertime, and night differential hours.
 * @param {string} timeIn - Clock-in time
 * @param {string} timeOut - Clock-out time
 * @param {string} scheduleStart - Expected shift start time (HH:mm format)
 * @param {string} scheduleEnd - Expected shift end time (HH:mm format)
 * @returns {Object} Object containing totalWorkedHours, regularHours, overtimeHours, nightDiffHours, lateMinutes, undertimeMinutes
 */
function calculateHours(timeIn, timeOut, scheduleStart, scheduleEnd) {
	const start = dayjs(timeIn);
	const end = dayjs(timeOut);

	// Create shift boundaries using the same date as the clock-in time
	const shiftStart = dayjs(start.format('YYYY-MM-DD') + ' ' + scheduleStart);
	const shiftEnd = dayjs(start.format('YYYY-MM-DD') + ' ' + scheduleEnd);

	// Calculate total minutes worked
	const totalWorked = end.diff(start, 'minute');

	// Calculate late minutes if employee clocked in after shift start
	const lateMinutes = start.isAfter(shiftStart)
		? start.diff(shiftStart, 'minute')
		: 0;

	// Calculate undertime minutes if employee clocked out before shift end
	const undertimeMinutes = end.isBefore(shiftEnd)
		? shiftEnd.diff(end, 'minute')
		: 0;

	// Calculate overtime minutes if employee clocked out after shift end
	const overtimeMinutes = end.isAfter(shiftEnd)
		? end.diff(shiftEnd, 'minute')
		: 0;

	// Calculate regular minutes by subtracting deductions from total worked
	const regularMinutes =
		totalWorked - overtimeMinutes - lateMinutes - undertimeMinutes;

	// Calculate night differential hours (10pm to 6am)
	const nightDiffMinutes = computeNightDiff(start, end);

	return {
		totalWorkedHours: totalWorked / 60,
		regularHours: regularMinutes / 60,
		overtimeHours: overtimeMinutes / 60,
		nightDiffHours: nightDiffMinutes / 60,
		lateMinutes,
		undertimeMinutes,
	};
}

/**
 * Computes night differential minutes (10pm to 6am rate applies).
 * @param {dayjs.Dayjs} start - Start time
 * @param {dayjs.Dayjs} end - End time
 * @returns {number} Total minutes worked during night hours
 */
function computeNightDiff(start, end) {
	let ndMinutes = 0;

	let current = start;

	// Iterate through each minute and count those between 10pm-6am
	while (current.isBefore(end)) {
		const hour = current.hour();

		if (hour >= 22 || hour < 6) {
			ndMinutes++;
		}

		current = current.add(1, 'minute');
	}

	return ndMinutes;
}

export { calculateHours };
