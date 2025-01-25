import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, CompanyButtons } from "../../utils/CompanyHelper";
import axios from "axios";

const CompanyList = () => {
  const [company, setComapny] = useState([]);
  const [compLoading, setCompLoading] = useState(false);
  const [filteredCompany, setFilteredCompany] = useState([]);

  const fetchCompanies = async () => {
    setCompLoading(true);
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
        let slNo = 1;
        const data = response.data.companies.map((company) => ({
          _id: company._id,
          sno: slNo++,
          comp_name: company.comp_name,
          action: (
            <CompanyButtons
              _id={company._id}
              onCompanyDelete={fetchCompanies}
            />
          ),
        }));
        setComapny(data);
        setFilteredCompany(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    } finally {
      setCompLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filterCompany = (e) => {
    const filteredData = company.filter((company) =>
      company.comp_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCompany(filteredData);
  };

  return (
    <>
      {compLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5 h-screen flex flex-col">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Companies</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Company Name"
              className="px-4 py-1 border border-gray-400 rounded-sm"
              onChange={filterCompany}
            />
            <Link
              to="/admin-dashboard/add-companies"
              className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:no-underline"
            >
              Add New Company
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <DataTable columns={columns} data={filteredCompany} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyList;
