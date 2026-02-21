import { Route, Routes } from "react-router"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import AdminLayout from "./layouts/AdminLayout"
import EmployeeLayout from "./layouts/EmployeeLayout"

function App() {

  return (
    <Routes>
      <Route path="/dashboard/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/dashboard" element={<EmployeeLayout/>}>
        <Route index element={<EmployeeDashboard />} />
      </Route>

    </Routes>
  )
}

export default App
