import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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

        console.log("response>>>>>", response.data);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      {employee ? (
        <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Employee Image */}
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Employee"
                className="w-48 h-48 rounded-full object-cover shadow-md border-4 border-purple-300"
              />
            </div>

            {/* Employee Details */}
            <div className="space-y-6 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-start">
                <p className="text-lg font-semibold text-gray-700 mr-2">
                  Name:
                </p>
                <p className="text-gray-800 font-medium">
                  {employee.userId.name}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-start">
                <p className="text-lg font-semibold text-gray-700 mr-2">
                  Employee ID:
                </p>
                <p className="text-gray-800 font-medium">
                  {employee.employeeId}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-start">
                <p className="text-lg font-semibold text-gray-700 mr-2">
                  Date of Birth:
                </p>
                <p className="text-gray-800 font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-start">
                <p className="text-lg font-semibold text-gray-700 mr-2">
                  Gender:
                </p>
                <p className="text-gray-800 font-medium">{employee.gender}</p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-start">
                <p className="text-lg font-semibold text-gray-700 mr-2">
                  Company:
                </p>
                <p className="text-gray-800 font-medium">
                  {employee.company.comp_name}
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-start">
                <p className="text-lg font-semibold text-gray-700 mr-2">
                  Marital Status:
                </p>
                <p className="text-gray-800 font-medium">
                  {employee.maritialStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 font-medium text-lg">
          Loading...
        </div>
      )}
    </div>
  );
};

export default View;
