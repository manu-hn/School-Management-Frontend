/* eslint-disable react/prop-types */
import  { useState } from 'react';
// import PropTypes from 'prop-types';
const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <tr key={row.id} className="hover:bg-gray-100">
                                {columns.map((column, index) => {
                                    const value = row[column.id];
                                    return (
                                        <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {
                                                column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value
                                            }
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="px-6 py-3 flex justify-between items-center bg-gray-50 border-t border-gray-200">
                <div className="flex items-center">
                    <span className="text-sm text-gray-500">
                        Rows per page:
                    </span>
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="ml-2 border border-gray-300 rounded-md p-1"
                    >
                        {[5, 10, 25, 100].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0}
                        className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md mr-2"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-500">
                        Page {page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                    </span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                        className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md ml-2"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableViewTemplate;
