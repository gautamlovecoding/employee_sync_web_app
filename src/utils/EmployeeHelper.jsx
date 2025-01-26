import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "170px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "130px",
    center: true,
  },
  {
    name: "Company",
    selector: (row) => row.comp_name,
    sortable: true,
    width: "200px",
  },
  {
    name: "Date of Birth",
    selector: (row) => row.dob,
    width: "130px",
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => row.action,
    center: true,
  },
];

export const fetchCompanies = async () => {
  let companies = [];
  try {
    const response = await axios.get(
      "http://localhost:5000/api/companies/list",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      companies = response.data.companies;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.message);
    }
  }
  return companies;
};

//company for salary form
export const getEmployees = async (id) => {
  let employees = [];
  try {
    const response = await axios.get(
      `http://localhost:5000/api/employees/company/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.message);
    }
  }
  return employees;
};

export const EmployeeButtons = ({ _id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-500 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}
      >
        View
      </button>
      <button className="px-3 py-1 bg-blue-500 text-white" onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}>Edit</button>
      <button className="px-3 py-1 bg-yellow-500 text-white" onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}>Salary</button>
      <button className="px-3 py-1 bg-red-500 text-white">Leave</button>
    </div>
  );
};
