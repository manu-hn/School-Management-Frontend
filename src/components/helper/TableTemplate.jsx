import { useState } from 'react';
import PropTypes from 'prop-types';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getRowValue = (row, columnId) => {
       
        if (row[columnId] !== undefined) {
            return row[columnId];
        }
        if (columnId === 'name' || columnId === 'studentName') {
            return row.studentName || row.name || 'N/A';
        }
        return null;
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100 border-b border-gray-300">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className={`px-4 py-2 text-left ${column.align === 'right' ? 'text-right' : ''}`}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 ? (
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <tr key={row.id} className="hover:bg-gray-100">
                                        {columns.map((column) => {
                                            const value = getRowValue(row, column.id);
                                            
                                            return (
                                                <td
                                                    key={column.id}
                                                    className={`px-4 py-2 ${column.align === 'right' ? 'text-right' : ''}`}
                                                >
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </td>
                                            );
                                        })}
                                        <td className="px-4 py-2 text-center">
                                            <ButtonHaver row={row} />
                                        </td>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-4 py-2 text-center text-gray-500">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <span className="text-sm text-gray-700">
                        {rows.length} items
                    </span>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        className="px-3 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleChangePage(null, page - 1)}
                        disabled={page === 0}
                    >
                        Prev
                    </button>
                    <button
                        className="px-3 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
                        onClick={() => handleChangePage(null, page + 1)}
                        disabled={(page + 1) * rowsPerPage >= rows.length}
                    >
                        Next
                    </button>
                    <select
                        className="px-2 py-1 border border-gray-300 rounded"
                        value={rowsPerPage}
                        onChange={handleChangeRowsPerPage}
                    >
                        {[5, 10, 25, 100].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

TableTemplate.propTypes = {
    buttonHaver: PropTypes.elementType.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            minWidth: PropTypes.number.isRequired,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string,
            studentName: PropTypes.string,
            rollNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
        })
    ),
};

export default TableTemplate;
