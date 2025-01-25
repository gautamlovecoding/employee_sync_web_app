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
    key: "leave",
    label: "Leave",
    path: "/leave",
    icon: <FaCalendarAlt />,
  },
  {
    key: "salary",
    label: "Salary",
    path: "/salary",
    icon: <FaMoneyBillWave />,
  },
  {
    key: "settings",
    label: "Setting",
    path: "/settings",
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
