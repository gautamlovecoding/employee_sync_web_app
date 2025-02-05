import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const List = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  let sno = 1;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${user?._id || user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search By Company Name"
          className="px-4 py-0.5 rounded-md"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-indigo-600 text-white hover:bg-indigo-700 hover:no-underline rounded-md"
        >
          Add New Leave
        </Link>
      </div>
      <div className="flex-1 overflow-auto mt-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="border px-6 py-3">S.No</th>
              <th className="border px-6 py-3">Leave Type</th>
              <th className="border px-6 py-3">Start Date</th>
              <th className="border px-6 py-3">End Date</th>
              <th className="border px-6 py-3">Reason</th>
              <th className="border px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr
                key={leave._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="border px-6 py-4">{sno++}</td>
                <td className="border px-6 py-4">{leave.leaveType}</td>
                <td className="border px-6 py-4">
                  {new Date(leave.startDate).toLocaleDateString("en-GB")}
                </td>
                <td className="border px-6 py-4">
                  {new Date(leave.endDate).toLocaleDateString("en-GB")}
                </td>
                <td className="border px-6 py-4">{leave.reason}</td>
                <td className="border px-6 py-4">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
