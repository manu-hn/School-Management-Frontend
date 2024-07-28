import Popup from '@/components/helper/Popup';
import TableTemplate from '@/components/helper/TableTemplate';
import { getAllStudents } from '@/redux/slices/student/studentHandle';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { FiAlignCenter } from 'react-icons/fi';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getAllStudents(currentUser._id));
        }
    }, [currentUser?._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const popupRef = useRef(null);

    const deleteHandler = (deleteID) => {
        console.log(deleteID)
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const studentColumns = [
        { id: 'studentName', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];
  

    const studentRows = studentsList && studentsList.length > 0 ? studentsList.map((student) => ({
        studentName: student.name || student.studentName,
        rollNum: student.rollNum,
        sclassName: student.sclassName.sclassName,
        id: student._id,
    })) : [];
    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = useState(false);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Admin/students/student/attendance/${row.id}`);
            } else if (selectedIndex === 1) {
                navigate(`/Admin/students/student/marks/${row.id}`);
            }
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
            handleClick();
        };

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
        };

        const handleClose = (event) => {
            if (event.currentTarget.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        return (
            <div className="flex items-center space-x-2">
                <button
                    className="text-red-500"
                    onClick={() => deleteHandler(row.id)}
                >
                    <i className="fas fa-user-times"></i>
                </button>
                <button
                    onClick={() => navigate(`/Admin/students/student/${row.id}`)}
                >
                    View
                </button>
                <div className="relative inline-block text-left">
                    <button
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                        onClick={handleToggle}
                    >
                        {options[selectedIndex]}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.185l3.71-3.95a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                            <div className="py-1">
                                {options.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`${index === selectedIndex ? 'font-semibold' : ''} text-gray-700 block px-4 py-2 text-sm w-full text-left`}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    StudentButtonHaver.propTypes = {
        row: PropTypes.shape({
            studentName: PropTypes.string,
            rollNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            sclassName: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
    };

    const actions = [
        {
            icon: <i className="fas fa-user-plus text-blue-500"></i>,
            name: 'Add New Student',
            action: () => navigate("/Admin/addstudents"),
        },
        {
            icon: <i className="fas fa-user-minus text-red-500"></i>,
            name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id),
        },
    ];

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const rowsPerPage = 5;

    // Calculate paginated data
    const paginatedRows = studentRows.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-4">
                    Loading...
                </div>
            ) : (
                <>
                    <div className="w-full overflow-hidden">
                        {studentRows.length > 0 ? (
                            <TableTemplate
                                buttonHaver={StudentButtonHaver}
                                columns={studentColumns}
                                rows={paginatedRows}
                            />
                        ) : (
                            <div className="text-center py-4">
                                No data available
                            </div>
                        )}
                    </div>
                    {studentRows.length > rowsPerPage && (
                        <div className="flex justify-center items-center py-4">
                            <button
                                className="mx-2 p-2"
                                disabled={currentPage === 0}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                            >
                                Previous
                            </button>
                            <span>
                                Page {currentPage + 1} of {Math.ceil(studentRows.length / rowsPerPage)}
                            </span>
                            <button
                                className="mx-2 p-2"
                                disabled={currentPage >= Math.ceil(studentRows.length / rowsPerPage) - 1}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(studentRows.length / rowsPerPage) - 1))}
                            >
                                Next
                            </button>
                        </div>
                    )}
                    <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
                        <button
                            className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
                            onClick={() => setShowPopup(!showPopup)}
                        >
                            <FiAlignCenter className='text-2xl' />
                        </button>
                        {showPopup && (
                            <div
                                ref={popupRef}
                                className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                            >
                                <div className="py-1">
                                    {actions.map((action, index) => (
                                        <button
                                            key={index}
                                            className="flex items-center p-2 hover:bg-gray-100 w-full text-left"
                                            onClick={action.action}
                                        >
                                            {action.icon}
                                            <span className="ml-2">{action.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <Popup show={showPopup} message={message} onClose={() => setShowPopup(false)} />
                </>
            )}
        </>
    );
};

export default ShowStudents;
