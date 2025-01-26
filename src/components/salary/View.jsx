import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const View = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();

  let sno = 1;

  const fetchSalary = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  const filterSalaries = (q) => {
    const filterRecord = salaries.filter((salary) =>
      salary.employeeId.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filterRecord);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          {/* <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-2 rounded-md py-0.5 border-grey-300"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div> */}

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500 mt-5">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                <tr>
                  <th className="border px-6 py-3">S.No</th>
                  <th className="border px-6 py-3">Employee ID</th>
                  <th className="border px-6 py-3">Salary</th>
                  <th className="border px-6 py-3">Allowance</th>
                  <th className="border px-6 py-3">Deduction</th>
                  <th className="border px-6 py-3">Total</th>
                  <th className="border px-6 py-3">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="border px-6 py-4">{sno++}</td>
                    <td className="border px-6 py-4">
                      {salary.employeeId.employeeId}
                    </td>
                    <td className="border px-6 py-4">{salary.basicSalary}</td>
                    <td className="border px-6 py-4">{salary.allowances}</td>
                    <td className="border px-6 py-4">{salary.deductions}</td>
                    <td className="border px-6 py-4">{salary.netSalary}</td>
                    <td className="border px-6 py-4">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-screen -mt-20">
              <h2 className="text-xl font-bold text-gray-600">No Record Found</h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
