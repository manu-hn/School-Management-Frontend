import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUserDetails } from '@/redux/slices/user/userHandle';
import { getSubjectList } from '@/redux/slices/sclass/sclassHandle';
import { updateStudentFields } from '@/redux/slices/student/studentHandle';
import Popup from '@/components/helper/Popup';


const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [chosenSubName, setChosenSubName] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === 'Student') {
            setStudentID(params.id);
            const stdID = params.id;
            dispatch(getUserDetails(stdID, 'Student'));
        } else if (situation === 'Subject') {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, 'Student'));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === 'Student') {
            dispatch(getSubjectList(userDetails.sclassName._id, 'ClassSubjects'));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, 'StudentAttendance'));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage('error');
        } else if (statestatus === 'added') {
            setLoader(false);
            setShowPopup(true);
            setMessage('Done Successfully');
        }
    }, [response, statestatus, error]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="w-full max-w-md px-8 py-16 bg-white shadow-lg rounded-lg">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4">
                                Student Name: {userDetails.name}
                            </h2>
                            {currentUser.teachSubject && (
                                <h2 className="text-xl mb-4">
                                    Subject Name: {currentUser.teachSubject?.subName}
                                </h2>
                            )}
                        </div>
                        <form onSubmit={submitHandler}>
                            {situation === 'Student' && (
                                <div className="mb-4">
                                    <label htmlFor="subjectSelect" className="block text-gray-700">
                                        Select Subject
                                    </label>
                                    <select
                                        id="subjectSelect"
                                        value={subjectName}
                                        onChange={changeHandler}
                                        className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                        required
                                    >
                                        {subjectsList ? (
                                            subjectsList.map((subject, index) => (
                                                <option key={index} value={subject.subName}>
                                                    {subject.subName}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">Add Subjects For Attendance</option>
                                        )}
                                    </select>
                                </div>
                            )}
                            <div className="mb-4">
                                <label htmlFor="statusSelect" className="block text-gray-700">
                                    Attendance Status
                                </label>
                                <select
                                    id="statusSelect"
                                    value={status}
                                    onChange={(event) => setStatus(event.target.value)}
                                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                >
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="date" className="block text-gray-700">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    className="mt-2 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                disabled={loader}
                            >
                                {loader ? (
                                    <div className="flex justify-center">
                                        <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full" />
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

StudentAttendance.propTypes = {
    situation: PropTypes.string
}

export default StudentAttendance;
