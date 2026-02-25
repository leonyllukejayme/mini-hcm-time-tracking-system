import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useDailySummary = (apiBaseUrl) => {
	const [employees, setEmployees] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchDailySummary = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (!token) return;
		setIsLoading(true);

		try {
			const month = new Date().toISOString().slice(5, 7);
			const usersResponse = await axios.get(`${apiBaseUrl}/api/admin/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const users = Array.isArray(usersResponse.data) ? usersResponse.data : [];
			const userNameById = users.reduce((acc, user) => {
				const userId = user?.userId || user?._id || user?.uid;
				if (userId) {
					acc[userId] = user?.name || user?.fullName || 'Unknown Employee';
				}
				return acc;
			}, {});

			const { data } = await axios.get(
				`${apiBaseUrl}/api/admin/daily-reports/month/${month}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);
			// console.log(res.data);
			const mappedEmployees = Array.isArray(data)
				? data.map((entry, index) => ({
						id: entry?.id || `${entry?.userId || 'emp'}-${entry?.date || index}`,
						name:
							userNameById[entry?.userId] ||
							entry?.name ||
							entry?.userId ||
							'Unknown Employee',
						employeeId: entry?.employeeId || entry?.userId || `EMP-${index + 1}`,
						// avatar: entry?.avatar || `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
						timeIn: entry.timeIn || "--",
						timeOut: entry.timeOut || "--",
						regularHours: Number(entry?.totals?.regularHours || 0),
						overtime: Number(entry?.totals?.overtimeHours || 0),
						nightDiff: Number(entry?.totals?.nightDiffHours || 0),
						lateMinutes: Number(entry?.totals?.lateMinutes || 0),
						undertime: Number(entry?.totals?.undertimeMinutes || 0),
					}))
				: [];

			setEmployees(mappedEmployees);
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

