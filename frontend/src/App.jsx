import { Route, Routes } from "react-router"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import AdminLayout from "./layouts/AdminLayout"
import EmployeeLayout from "./layouts/EmployeeLayout"
import Login from "./pages/Login"
import ProtectedRoute from "./ProtectedRoute"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/admin" element={<ProtectedRoute role="admin" children={''}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/dashboard" element={<ProtectedRoute role="employee" children={''}><EmployeeLayout /></ProtectedRoute>}>
        <Route index element={<EmployeeDashboard />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} />

    </Routes>
  )
}

export default App
