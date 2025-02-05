import React, { useEffect, useState } from "react";
import { columns, CompanyButtons } from "../../utils/CompanyHelper";
import axios from "axios";
import CustomDataTable from "../shared/CustomDataTable";

const CompanyList = () => {
  const [company, setCompany] = useState([]);
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
        setCompany(data);
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
        <CustomDataTable 
          data={filteredCompany}
          columns={columns}
          searchPlaceholder="Search By Company Name"
          onSearch={filterCompany}
          addNewButton={{
            label: "Company",
            path: "/admin-dashboard/add-companies"
          }}
        />
      )}
    </>
  );
};

export default CompanyList;
