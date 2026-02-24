import { Route, Routes } from 'react-router';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
      <Toaster />
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/dashboard/admin"
					element={
						<ProtectedRoute role="admin" children={''}>
							<AdminLayout />
						</ProtectedRoute>
					}>
					<Route index element={<AdminDashboard />} />
				</Route>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute role="employee" children={''}>
							<EmployeeLayout />
						</ProtectedRoute>
					}>
					<Route index element={<EmployeeDashboard />} />
				</Route>
				<Route path="*" element={<div>404 Not Found</div>} />
			</Routes>
		</>
	);
}

export default App;
