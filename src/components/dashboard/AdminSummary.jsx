import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaCogs,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaBuilding,
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={13} />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Companies"
          number={13}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={13}
          color="bg-green-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number="$657"
          color="bg-red-600"
        />
      </div>
      <div className="mt-12">
        <h3 className="text-center text-2xl font-bold">Leave Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text="Leave Applied"
            number={5}
            color="bg-indigo-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text="Leave Approved"
            number={3}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={4}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={1}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
