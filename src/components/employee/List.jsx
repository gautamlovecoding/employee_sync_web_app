import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  const fetchEmployees = async () => {
    setEmpLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/employees/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let slNo = 1;
        const data = response.data.employees.map((employee) => ({
          _id: employee._id,
          sno: slNo++,
          comp_name: employee.company.comp_name,
          name: employee.userId.name,
          dob: new Date(employee.dob).toLocaleDateString(),
          profileImage: <img className="w-20 h-20 rounded-full object-cover shadow-md" src={`http://localhost:5000/${employee.userId.profileImage}`} />,
          action: <EmployeeButtons _id={employee._id} />,
        }));
        console.log("Mapped Employees Data:", data);
        setEmployees(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    } finally {
      setEmpLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-5 h-screen flex flex-col">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Company Name"
          className="px-4 py-1 border border-gray-400 rounded-sm"
        />
        <Link
          to="/admin-dashboard/add-employees"
          className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:no-underline"
        >
          Add New Employee
        </Link>
      </div>
      <div>
        <DataTable columns={columns} data={employees} />
      </div>
    </div>
  );
};

export default List;
