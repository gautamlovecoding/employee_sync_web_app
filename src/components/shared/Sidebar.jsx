import React from "react";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { FcBusinessman } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/constants";

const linkClass =
  "flex items-center gap-2 font-medium px-4 py-3 hover:bg-indigo-600 hover:text-white hover:no-underline active:bg-indigo-500 rounded-md text-base transition-all duration-200";

export default function Sidebar() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 w-64 p-4 flex flex-col shadow-lg">
      <div className="flex items-center gap-3 px-4 py-4">
        <FcBusinessman fontSize={45} />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500 text-2xl font-semibold">
          StaffSync
        </span>
      </div>
      <div className="py-6 flex flex-1 flex-col gap-1">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-1 pt-3 border-t border-gray-600">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div
          className={classNames(
            linkClass,
            "cursor-pointer text-red-500 hover:bg-red-600 hover:text-white"
          )}
        >
          <span className="text-2xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path ? "bg-indigo-700 text-white" : "text-gray-400",
        linkClass
      )}
    >
      <span className="text-2xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
