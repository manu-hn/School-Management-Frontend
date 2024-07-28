import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/slices/user/userHandle';
import Popup from '@/components/helper/Popup';
// import bgpic from "../../assets/designlogin.jpg";
const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            <div className="flex flex-col items-center justify-center w-full  p-8 bg-white">
                <h2 className="text-4xl font-semibold text-gray-800 mb-2">Admin Register</h2>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Create your own school by registering as an admin.
                    <br />
                    You will be able to add students and faculty and manage the system.
                </p>
                <form className="w-full max-w-md" noValidate onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="adminName" className="block text-gray-700">Enter your name</label>
                        <input
                            id="adminName"
                            name="adminName"
                            type="text"
                            className={`w-full p-2 border ${adminNameError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            onChange={handleInputChange}
                        />
                        {adminNameError && <p className="text-red-500 text-sm">Name is required</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="schoolName" className="block text-gray-700">Create your school name</label>
                        <input
                            id="schoolName"
                            name="schoolName"
                            type="text"
                            className={`w-full p-2 border ${schoolNameError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            onChange={handleInputChange}
                        />
                        {schoolNameError && <p className="text-red-500 text-sm">School name is required</p>}
                    </div>
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
                    </div>
                    <button
                        type="submit"
                        className={`w-full p-2 text-white bg-purple-600 rounded-md ${loader ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loader ? 'Loading...' : 'Register'}
                    </button>
                    <div className="flex justify-between items-center mt-4">
                        <span>Already have an account?</span>
                        <Link to="/Adminlogin" className="text-indigo-600 hover:text-indigo-800 ml-2">Log in</Link>
                    </div>
                </form>
            </div>
            <div
                className="hidden md:block md:w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${'bgpic'})` }}
            ></div>
            {showPopup && (
                <Popup message={message} setShowPopup={setShowPopup} />
            )}
        </div>
    );
}

export default AdminRegisterPage;
