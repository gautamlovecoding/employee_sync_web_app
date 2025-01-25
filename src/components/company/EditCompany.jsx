import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState([]);
  const [compLoading, setCompLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setCompLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/companies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setCompany(response.data.company);
        }
      } catch (error) {
        console.log(error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      } finally {
        setCompLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/companies/${id}`,
        company,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/companies");
      }
    } catch (error) {
      console.log(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  return (
    <>
      {compLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <h3 className="text-2xl font-bold mb-6">Edit Company</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="comp_name"
                className="text-sm font-medium text-gray-700"
              >
                Comapany Name
              </label>
              <input
                type="text"
                name="comp_name"
                onChange={handleChange}
                value={company.comp_name}
                placeholder="Enter Company Name"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter Description"
                onChange={handleChange}
                value={company.description}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Edit Company
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditCompany;
