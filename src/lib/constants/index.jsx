import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "compnies",
    label: "Company",
    path: "/company",
    icon: <HiOutlineCube />,
  },
  {
    key: "employees",
    label: "Employee",
    path: "/employee",
    icon: <HiOutlineUsers />,
  },
  {
    key: "projects",
    label: "Projects",
    path: "/projects",
    icon: <HiOutlineShoppingCart />,
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
