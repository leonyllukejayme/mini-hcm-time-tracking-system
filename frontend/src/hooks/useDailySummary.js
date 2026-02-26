import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useDailySummary = (apiBaseUrl) => {
	const [employees, setEmployees] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const toIsoString = (value) => {
		if (!value) return null;
		if (typeof value === 'string') return value;
		if (value instanceof Date) return value.toISOString();
		if (typeof value?._seconds === 'number') {
			return new Date(value._seconds * 1000).toISOString();
		}
		return null;
	};

	const fetchDailySummary = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (!token) return;
		setIsLoading(true);

		try {
			const month = new Date().toISOString().slice(5, 7);
			const [usersResponse, dailyReportsResponse, punchesResponse] = await Promise.all([
				axios.get(`${apiBaseUrl}/api/admin/users`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}),
				axios.get(`${apiBaseUrl}/api/admin/daily-reports/month/${month}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}),
				axios.get(`${apiBaseUrl}/api/admin/punches`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}),
			]);

			const users = Array.isArray(usersResponse?.data) ? usersResponse.data : [];
			const userNameById = users.reduce((acc, user) => {
				const userId = user?.userId || user?._id || user?.uid;
				if (userId) {
					acc[userId] = user?.name || user?.fullName || 'Unknown Employee';
				}
				return acc;
			}, {});

			const dailyReports = Array.isArray(dailyReportsResponse?.data)
				? dailyReportsResponse.data
				: [];
			const punches = Array.isArray(punchesResponse?.data) ? punchesResponse.data : [];
			const currentMonthPrefix = `${new Date().getFullYear()}-${month}`;

			const mappedById = new Map(
				dailyReports.map((entry, index) => {
					const id = entry?.id || `${entry?.userId || 'emp'}-${entry?.date || index}`;
					return [
						id,
						{
							id,
							name:
								userNameById[entry?.userId] ||
								entry?.name ||
								entry?.userId ||
								'Unknown Employee',
							employeeId: entry?.employeeId || entry?.userId || `EMP-${index + 1}`,
							timeIn: entry?.timeIn || "--",
							timeOut: entry?.timeOut || "--",
							regularHours: Number(entry?.totals?.regularHours || 0),
							overtime: Number(entry?.totals?.overtimeHours || 0),
							nightDiff: Number(entry?.totals?.nightDiffHours || 0),
							lateMinutes: Number(entry?.totals?.lateMinutes || 0),
							undertime: Number(entry?.totals?.undertimeMinutes || 0),
						},
					];
				}),
			);

			punches.forEach((entry, index) => {
				const date = entry?.date || '';
				if (!date.startsWith(currentMonthPrefix)) return;
				const timeOut = toIsoString(entry?.timeOut);
				if (timeOut) return;
				const id = `${entry?.userId || 'emp'}_${date}`;
				if (mappedById.has(id)) return;

				mappedById.set(id, {
					id,
					name:
						userNameById[entry?.userId] ||
						entry?.name ||
						entry?.userId ||
						'Unknown Employee',
					employeeId: entry?.employeeId || entry?.userId || `EMP-${index + 1}`,
					timeIn: toIsoString(entry?.timeIn) || "--",
					timeOut: "--",
					regularHours: Number(entry?.computed?.regularHours || 0),
					overtime: Number(entry?.computed?.overtimeHours || 0),
					nightDiff: Number(entry?.computed?.nightDiffHours || 0),
					lateMinutes: Number(entry?.computed?.lateMinutes || 0),
					undertime: Number(entry?.computed?.undertimeMinutes || 0),
				});
			});

			setEmployees(Array.from(mappedById.values()));
		} catch (error) {
			console.error('Failed to fetch daily summary:', error);
			setEmployees([]);
		} finally {
			setIsLoading(false);
		}
	}, [apiBaseUrl]);

	useEffect(() => {
		fetchDailySummary();
	}, [fetchDailySummary]);

	return { employees, isLoading, refetchDailySummary: fetchDailySummary };
};
