import { Route, Routes } from "react-router"
import Layout from "./layouts/layout"
import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<EmployeeDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
