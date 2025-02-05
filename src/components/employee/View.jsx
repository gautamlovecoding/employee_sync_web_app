import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        console.error(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const DetailRow = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition-colors">
      <p className="text-base sm:text-lg font-semibold text-gray-700 sm:w-1/3 text-center">
        {label}:
      </p>
      <p className="text-gray-500 font-medium flex-1 text-center sm:text-left">
        {value}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 sm:p-4 md:p-8">
      {employee ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 sm:p-6 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold text-center">
              Employee Details
            </h2>
          </div>

          <div className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Employee Image Section */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden group">
                  <div
                    className={`absolute inset-0 bg-gray-200 animate-pulse ${
                      !imageLoading && "hidden"
                    }`}
                  ></div>
                  <img
                    src={`http://localhost:5000/${employee.userId.profileImage}`}
                    alt={employee.userId.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                  {employee.userId.name}
                </h3>
                <p className="text-gray-500 font-medium text-center">
                  ID: {employee.employeeId}
                </p>
              </div>

              {/* Employee Details Section */}
              <div className="space-y-1 sm:space-y-2 bg-gray-50 rounded-xl p-3 sm:p-4">
                <DetailRow
                  label="Date of Birth"
                  value={new Date(employee.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
                <DetailRow label="Gender" value={employee.gender} />
                <DetailRow label="Company" value={employee.company.comp_name} />
                <DetailRow
                  label="Marital Status"
                  value={employee.maritialStatus}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-gray-200 h-10 w-10 sm:h-12 sm:w-12"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
