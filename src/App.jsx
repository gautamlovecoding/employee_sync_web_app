import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/shared/Layout'
import AdminDashboard from './pages/AdminDashboard'
import Company from './pages/Company'
import Login from './pages/Login'
import EmployeeDashboard from './pages/EmployeeDashboard'

function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="company" element={<Company />} />
                </Route> */}
                <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
                <Route path="/employee-dashboard" element={<EmployeeDashboard/>}></Route>
            </Routes>
        </Router>
    )
}

export default App