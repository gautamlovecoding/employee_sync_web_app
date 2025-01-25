import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/shared/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import { PrivateRoutes } from "./utils/PrivateRoute";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import AddCompany from "./components/company/AddCompany";
import CompanyList from "./components/company/CompanyList";
import EditCompany from "./components/company/EditCompany";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="/admin-dashboard/companies" element={<CompanyList />} />
          <Route path="/admin-dashboard/add-companies" element={<AddCompany />} />
          <Route path="/admin-dashboard/companies/:id" element={<EditCompany />} />
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employees" element={<Add />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />
        </Route>
        <Route
          path="/employee-dashboard"
          element={<EmployeeDashboard />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
