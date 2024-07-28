import { getAllTeachers } from '@/redux/slices/teacher/teacherHandle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Popup from '@/components/helper/Popup';
import { IoPersonRemoveSharp, IoPersonAdd } from "react-icons/io5";
import SpeedDialTemplate from '@/components/helper/SpeedDialTemplate';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
        console.log(deleteID, address)
        // dispatch(deleteUser(deleteID, address)).then(() => {
        //     dispatch(getAllTeachers(currentUser._id));
        // });
    };
    deleteHandler.propTypes = {
        deleteID: PropTypes.string,
        address: PropTypes.string,
    }


    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'teachSubject', label: 'Subject', minWidth: 100 },
        { id: 'teachSclass', label: 'Class', minWidth: 170 },
    ];

    const rows = teachersList.map((teacher) => {
        return {
            name: teacher.name,
            teachSubject: teacher.teachSubject?.subName || null,
            teachSclass: teacher.teachSclass.sclassName,
            teachSclassID: teacher.teachSclass._id,
            id: teacher._id,
        };
    });

    const actions = [
        {
            icon: <IoPersonAdd color="primary" />, name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <IoPersonRemoveSharp color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];
    console.log(actions)

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    } else if (response) {
        return (
            <div className="flex justify-end p-4">
                <button onClick={() => navigate("/Admin/teachers/chooseclass")}>
                    Add Teacher
                </button>
            </div>
        );
    } else if (error) {
        console.log(error);
    }

    return (
        <div className="p-4">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.id}
                                    className="py-2 px-4 border-r text-left"
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </th>
                            ))}
                            <th className="py-2 px-4 text-center border-r">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <tr key={row.id} className="border-b">
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'teachSubject') {
                                            return (
                                                <td
                                                    key={column.id}
                                                    className="py-2 px-4 border-r text-center"
                                                >
                                                    {value ? (
                                                        value
                                                    ) : (
                                                        <button
                                                            onClick={() => navigate(`/Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`)}
                                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                        >
                                                            Add Subject
                                                        </button>
                                                    )}
                                                </td>
                                            );
                                        }
                                        return (
                                            <td
                                                key={column.id}
                                                className="py-2 px-4 border-r text-left"
                                            >
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </td>
                                        );
                                    })}
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => deleteHandler(row.id, "Teacher")}
                                            className="text-red-500 hover:text-red-700 mr-2"
                                        >
                                            <IoPersonRemoveSharp color="error" />
                                        </button>
                                        <button
                                            onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <div className="text-sm">
                    <span>Rows per page:</span>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setRowsPerPage(parseInt(e.target.value, 10));
                            setPage(0);
                        }}
                        className="ml-2 border border-gray-300 rounded px-2 py-1"
                    >
                        {[5, 10, 25, 100].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        className="px-4 py-2 border border-gray-300 rounded mr-2"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">Page {page + 1}</span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(rows.length / rowsPerPage) - 1))}
                        className="px-4 py-2 border border-gray-300 rounded ml-2"
                    >
                        Next
                    </button>
                </div>
            </div>

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ShowTeachers;
