import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "Sl No",
    selector: (row) => row.sno,
  },
  {
    name: "Company Name",
    selector: (row) => row.comp_name,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true
  },
];

export const CompanyButtons = ({ _id, onCompanyDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/companies/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Company deleted successfully!");
          onCompanyDelete(); // Refetch data after deletion
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded-md"
        onClick={() => navigate(`/admin-dashboard/companies/${_id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white rounded-md"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
