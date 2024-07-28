import TableTemplate from '@/components/helper/TableTemplate';
import { getAllNotices } from '@/redux/slices/notice/noticeHandle';
import { deleteUser } from '@/redux/slices/user/userHandle';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle, AiOutlineCloseCircle } from 'react-icons/ai'; // Importing icons from react-icons
import PropTypes from 'prop-types';

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user);
console.log(noticesList)
    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    const deleteHandler = (deleteID) => {
        dispatch(deleteUser(deleteID, "Notice"))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            });
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <button
                onClick={() => deleteHandler(row.id, "Notice")}
                className="text-red-600 hover:text-red-800"
            >
                <AiOutlineCloseCircle size={20} />
            </button>
        );
    };

    NoticeButtonHaver.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string,
            details: PropTypes.string,
            date: PropTypes.string,
        }).isRequired,
    };

    const actions = [
        {
            icon: <AiFillPlusCircle size={24} />,
            name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice"),
        },
        {
            icon: <AiOutlineCloseCircle size={24} />,
            name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices"),
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

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            ) : (
                <div className="p-4">
                    <div className="bg-white shadow rounded-lg p-4 overflow-auto">
                        {Array.isArray(noticesList) && noticesList.length > 0 && (
                            <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                        )}
                        <div className="fixed right-4 top-1/2 transform -translate-y-1/2">
                            <button
                                className="bg-blue-500 text-white p-3 rounded-full shadow-lg"
                                onClick={() => setShowPopup(!showPopup)}
                            >
                                <AiFillPlusCircle size={24} />
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
                    </div>
                </div>
            )}
        </>
    );
};

export default ShowNotices;
