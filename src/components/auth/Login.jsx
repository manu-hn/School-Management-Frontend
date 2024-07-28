import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/user/userHandle';
import Popup from '@/components/helper/Popup';
import PropTypes from 'prop-types';

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
           
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "abcd05";

        if (role === "Admin") {
            const email = "admin@123.com";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Student") {
            const rollNum = "5";
            const studentName = "John Doe";
            const fields = { rollNum, studentName, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        } else if (role === "Teacher") {
            const email = "tony@stark.com";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            } else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <div className="flex h-screen">
            <div className="w-full max-w-md mx-auto my-auto p-8 bg-white rounded-md shadow-md">
                <h2 className="text-4xl font-semibold text-gray-800 mb-2">{role} Login</h2>
                <p className="text-sm text-gray-600 mb-6">Welcome back! Please enter your details</p>
                <form noValidate onSubmit={handleSubmit}>
                    {role === "Student" ? (
                        <>
                            <div className="mb-4">
                                <label htmlFor="rollNumber" className="block text-gray-700">Enter your Roll Number</label>
                                <input
                                    id="rollNumber"
                                    name="rollNumber"
                                    type="number"
                                    className={`w-full p-2 border ${rollNumberError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    onChange={handleInputChange}
                                />
                                {rollNumberError && <p className="text-red-500 text-sm">Roll Number is required</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="studentName" className="block text-gray-700">Enter your name</label>
                                <input
                                    id="studentName"
                                    name="studentName"
                                    type="text"
                                    className={`w-full p-2 border ${studentNameError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    onChange={handleInputChange}
                                />
                                {studentNameError && <p className="text-red-500 text-sm">Name is required</p>}
                            </div>
                        </>
                    ) : (
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Enter your email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`w-full p-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                onChange={handleInputChange}
                            />
                            {emailError && <p className="text-red-500 text-sm">Email is required</p>}
                        </div>
                    )}
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type={toggle ? 'text' : 'password'}
                            className={`w-full p-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            onChange={handleInputChange}
                        />
                        <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setToggle(!toggle)}>
                            {toggle ? 'Hide' : 'Show'}
                        </span>
                        {passwordError && <p className="text-red-500 text-sm">Password is required</p>}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <Link to="#" className="text-indigo-600 hover:text-indigo-800">Forgot password?</Link>
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 text-white bg-red-600 rounded-md ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loader ? 'Loading...' : 'Login'}
                    </button>
                    <button
                        type="button"
                        onClick={guestModeHandler}
                        className="w-full mt-4 p-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-100"
                    >
                        Login as Guest
                    </button>
                    {role === "Admin" && (
                        <div className="flex justify-between items-center mt-4">
                            <span>Don&apos;t have an account?</span>
                            <Link to="/Adminregister" className="text-indigo-600 hover:text-indigo-800">Sign up</Link>
                        </div>
                    )}
                </form>
            </div>
            <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${'bgpic'})` }}></div>
            {guestLoader && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="text-white">Please Wait</div>
                </div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
}

LoginPage.propTypes = {
    role: PropTypes.string
}
export default LoginPage;
