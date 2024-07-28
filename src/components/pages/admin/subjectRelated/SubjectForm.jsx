import  { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from "@/redux/slices/user/userHandle";
import { underControl } from "@/redux/slices/user/userSlice";
import Popup from "@/components/helper/Popup";

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <form onSubmit={submitHandler} className="p-4">
            <div className="mb-4">
                <h2 className="text-2xl font-bold">Add Subjects</h2>
            </div>
            <div className="space-y-4">
                {subjects.map((subject, index) => (
                    <div key={index} className="flex flex-wrap gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700">Subject Name</label>
                            <input
                                type="text"
                                value={subject.subName}
                                onChange={handleSubjectNameChange(index)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Subject Code</label>
                            <input
                                type="text"
                                value={subject.subCode}
                                onChange={handleSubjectCodeChange(index)}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700">Sessions</label>
                            <input
                                type="number"
                                value={subject.sessions}
                                onChange={handleSessionsChange(index)}
                                className="w-full p-2 border border-gray-300 rounded"
                                min="0"
                                required
                            />
                        </div>
                        <div className="flex items-end">
                            {index === 0 ? (
                                <button
                                    type="button"
                                    onClick={handleAddSubject}
                                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
                                >
                                    Add Subject
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleRemoveSubject(index)}
                                    className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-100"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        className={`px-4 py-2 text-white rounded ${loader ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={loader}
                    >
                        {loader ? (
                            <div className="flex items-center justify-center">
                                <svg className="w-6 h-6 text-white animate-spin" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" strokeWidth="2" d="M4 12A8 8 0 0120 12A8 8 0 014 12z" />
                                </svg>
                            </div>
                        ) : (
                            'Save'
                        )}
                    </button>
                </div>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </div>
        </form>
    );
};

export default SubjectForm;
