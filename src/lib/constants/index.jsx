import { HiOutlineViewGrid, HiOutlineQuestionMarkCircle } from "react-icons/hi";
import {
  FaCogs,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/admin-dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "companies",
    label: "Company",
    path: "/admin-dashboard/companies",
    icon: <FaBuilding />,
  },
  {
    key: "employees",
    label: "Employee",
    path: "/admin-dashboard/employees",
    icon: <FaUsers />,
  },
  {
    key: "salary",
    label: "Salary",
    path: "/admin-dashboard/salary/add",
    icon: <FaMoneyBillWave />,
  },
  {
    key: "leave",
    label: "Leave",
    path: "/leave",
    icon: <FaCalendarAlt />,
  },
  {
    key: "settings",
    label: "Setting",
    path: "/settings",
    icon: <FaCogs />,
  },
];
export const EMPLOYEE_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/employee-dashboard",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "profile",
    label: "My Profile",
    path: "/employee-dashboard/profile",
    icon: <FaBuilding />,
  },
  {
    key: "leaves",
    label: "Leaves",
    path: "/employee-dashboard/leaves",
    icon: <FaUsers />,
  },
  {
    key: "salary",
    label: "Salary",
    path: "/employee-dashboard/salary/add",
    icon: <FaMoneyBillWave />,
  },
  {
    key: "settings",
    label: "Setting",
    path: "/employee-dashboard/settings",
    icon: <FaCogs />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
