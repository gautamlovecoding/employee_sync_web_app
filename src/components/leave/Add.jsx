import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () => {
    const {user} = useAuth();
  const [leave, setLeave] = useState({
    userId: user?._id || user?.id,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevLeave) => ({
      ...prevLeave,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
          `http://localhost:5000/api/leave/add`,
          leave,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          navigate("/employee-dashboard/leaves");
        }
      } catch (error) {
        console.error(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-10">
      <div className="bg-white p-4 sm:p-8 rounded-md shadow-md">
        <h3 className="text-xl sm:text-2xl font-bold">Request For Leave</h3>
        <form onSubmit={handleSubmit} className="mt-4 sm:mt-6">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Leave Type
              </label>
              <select
                name="leaveType"
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Annual Leave">Annual Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  From Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="reason"
                  rows="4"
                  placeholder="Enter your reason for leave"
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 hover:no-underline transition duration-300"
              >
                Add Leave
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
