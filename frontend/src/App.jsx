import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';
import Settings from './pages/Settings';
import Reports from './pages/Reports';

function App() {
	return (
		<>
			<Toaster />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="admin/"
					element={
						<ProtectedRoute role="admin" children={''}>
							<AdminLayout />
						</ProtectedRoute>
					}>
					<Route path='dashboard' element={<AdminDashboard />} />
					<Route path='reports' element={<Reports />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route
					path="employee/"
					element={
						<ProtectedRoute role="employee" children={''}>
							<EmployeeLayout />
						</ProtectedRoute>
					}>
					<Route path='dashboard' element={<EmployeeDashboard />} />
					<Route path="settings" element={<Settings />} />
				</Route>
				<Route path="*" element={<div>404 Not Found</div>} />
			</Routes>
		</>
	);
}

export default App;
