import React from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const CustomDataTable = ({ 
  data, 
  columns, 
  searchPlaceholder,
  onSearch,
  addNewButton = {
    label: "",
    path: "",
  }
}) => {
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">{`Manage ${addNewButton.label}`}</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="px-4 py-1 border border-gray-400 rounded-sm"
          onChange={onSearch}
        />
        <Link
          to={addNewButton.path}
          className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:no-underline"
        >
          {`Add New ${addNewButton.label}`}
        </Link>
      </div>
      <div className={`flex-1 flex flex-col min-h-0 ${data.length <= 10 ? '' : 'overflow-auto'}`}>
        <DataTable 
          columns={columns} 
          data={data} 
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          fixedHeader
          className="h-full"
          noTableHead={data.length === 0}
        />
      </div>
    </div>
  );
};

export default CustomDataTable; 