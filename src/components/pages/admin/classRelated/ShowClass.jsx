import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiPlusCircle, FiMoreHorizontal } from 'react-icons/fi';
import { FaUserPlus, FaRegAddressBook } from 'react-icons/fa';
import { getAllSclasses } from '@/redux/slices/sclass/sclassHandle';
import TableTemplate from '@/components/helper/TableTemplate';
import Popup from '@/components/helper/Popup';
import PropTypes from 'prop-types';

const ShowClasses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showAddClassPopup, setShowAddClassPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowDeletePopup(true);
        // Implement your delete logic here
        // dispatch(deleteUser(deleteID, address))
        //   .then(() => {
        //     dispatch(getAllSclasses(adminID, "Sclass"));
        //   })
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    });

    const SclassButtonHaver = ({ row }) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const actionsRef = useRef(null);

        const handleClick = (event) => setAnchorEl(event.currentTarget);
        const handleClose = () => setAnchorEl(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (actionsRef.current && !actionsRef.current.contains(event.target)) {
                    handleClose();
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const actions = [
            { icon: <FaUserPlus />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
            { icon: <FaRegAddressBook />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
        ];

        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => deleteHandler(row.id, "Sclass")}
                    className="text-red-500 hover:text-red-700"
                >
                    <MdDelete size={24} />
                </button>
                <button
                    onClick={() => navigate("/Admin/classes/class/" + row.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    View
                </button>
                <div className="relative" ref={actionsRef}>
                    <button
                        onClick={handleClick}
                        className="flex items-center text-gray-600 hover:text-gray-800"
                    >
                        <FiMoreHorizontal size={24} />
                        <span className="ml-2">More</span>
                    </button>
                    <div
                        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-50 ${anchorEl ? 'block' : 'hidden'}`}
                    >
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={() => { action.action(); handleClose(); }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                            >
                                {action.icon}
                                {action.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    SclassButtonHaver.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired,
    };

    const fixedButtonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fixedButtonRef.current && !fixedButtonRef.current.contains(event.target)) {
                setShowAddClassPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {getresponse && (
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => navigate("/Admin/addclass")}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Add Class
                            </button>
                        </div>
                    )}
                    {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                        <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                    )}
                    <div className="fixed bottom-4 right-4" ref={fixedButtonRef}>
                        <button
                            onClick={() => setShowAddClassPopup(!showAddClassPopup)}
                            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
                        >
                            <FiPlusCircle size={24} />
                        </button>
                        {showAddClassPopup && (
                            <div className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-gray-300 rounded shadow-lg z-50">
                                <button
                                    onClick={() => {
                                        navigate("/Admin/addclass");
                                        setShowAddClassPopup(false);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                                >
                                    <AiOutlinePlus size={24} />
                                    Add New Class
                                </button>
                                <button
                                    disabled
                                    onClick={() => alert('Delete All Classes functionality is not available yet.')}
                                    className="w-full text-left px-4 py-2 flex items-center gap-2 text-gray-400"
                                >
                                    <MdDelete size={24} />
                                    Delete All Classes
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
            <Popup message={message} setShowPopup={setShowDeletePopup} showPopup={showDeletePopup} />
        </>
    );
};

export default ShowClasses;
