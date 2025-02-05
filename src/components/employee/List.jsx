import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomDataTable from "../shared/CustomDataTable";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

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
          profileImage: (
            <img
              className="w-20 h-20 rounded-full object-cover shadow-md"
              src={`http://localhost:5000/${employee.userId.profileImage}`}
            />
          ),
          action: <EmployeeButtons _id={employee._id} />,
        }));
        setEmployees(data);
        setFilteredEmployees(data);
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

  const handleFilter = (e) => {
    const filteredData = employees.filter((employee) =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filteredData);
  };

  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <CustomDataTable 
          data={filteredEmployees}
          columns={columns}
          searchPlaceholder="Search By Name"
          onSearch={handleFilter}
          addNewButton={{
            label: "Employee",
            path: "/admin-dashboard/add-employees"
          }}
        />
      )}
    </>
  );
};

export default List;
