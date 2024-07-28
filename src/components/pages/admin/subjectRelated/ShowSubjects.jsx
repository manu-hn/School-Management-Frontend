import Popup from '@/components/helper/Popup';
import TableTemplate from '@/components/helper/TableTemplate';
import { getSubjectList } from '@/redux/slices/sclass/sclassHandle';
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SpeedDialTemplate from '@/components/helper/SpeedDialTemplate';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);
console.log(currentUser)
    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);

        // Uncomment and implement the actual delete logic if needed
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        //     });
    };

    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    });

    const SubjectsButtonHaver = ({ row }) => (
        <>
            <button
                onClick={() => deleteHandler(row.id, "Subject")}
                className="text-red-500 hover:text-red-700 p-2"
            >
                <AiOutlineDelete size={24} />
            </button>
            <button
                onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ml-2"
            >
                <MdVisibility size={24} />
            </button>
        </>
    );

    SubjectsButtonHaver.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.string.isRequired,
            sclassID: PropTypes.string,
        }).isRequired,
    };

    const actions = [
        {
            icon: <AiOutlinePlus size={24} className="text-blue-500" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <AiOutlineDelete size={24} className="text-red-500" />,
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <>
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="relative">
                    {Array.isArray(subjectsList) && subjectsList.length > 0 && (
                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                    )}
                    <SpeedDialTemplate actions={actions} />
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;
