import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSclasses } from '@/redux/slices/sclass/sclassHandle';
import { registerUser } from '@/redux/slices/user/userHandle';
import { underControl } from '@/redux/slices/user/userSlice';
import Popup from '@/components/helper/Popup';
import PropTypes from 'prop-types';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [studentName, setStudentName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const fields = { studentName, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
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
        <>
            <div className="register p-6 max-w-lg mx-auto bg-white rounded-md shadow-md">
                <form className="registerForm space-y-4" onSubmit={submitHandler}>
                    <span className="registerTitle text-2xl font-semibold">Add Student</span>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        className="registerInput block w-full p-2 border border-gray-300 rounded-md"
                        type="text"
                        placeholder="Enter student's name..."
                        value={studentName}
                        onChange={(event) => setStudentName(event.target.value)}
                        autoComplete="studentName"
                        required
                    />

                    {situation === "Student" && (
                        <>
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <select
                                className="registerInput block w-full p-2 border border-gray-300 rounded-md"
                                value={className}
                                onChange={changeHandler}
                                required
                            >
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </select>
                        </>
                    )}

                    <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                    <input
                        className="registerInput block w-full p-2 border border-gray-300 rounded-md"
                        type="number"
                        placeholder="Enter student's Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        className="registerInput block w-full p-2 border border-gray-300 rounded-md"
                        type="password"
                        placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    <button
                        className="registerButton w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                        type="submit"
                        disabled={loader}
                    >
                        {loader ? (
                            <div className="loader border-t-2 border-b-2 border-gray-900 w-5 h-5 mx-auto rounded-full animate-spin"></div>
                        ) : (
                            'Add'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
}

AddStudent.propTypes = {
    situation: PropTypes.string
}
export default AddStudent;
