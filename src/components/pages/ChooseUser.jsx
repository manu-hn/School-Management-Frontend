import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slices/user/userHandle';
import Popup from '../helper/Popup';
import PropTypes from 'prop-types';


const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
console.log(loader)
  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
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
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <div className="bg-gradient-to-b from-purple-800 to-blue-800 h-screen flex justify-center items-center p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
            onClick={() => navigateHandler("Admin")}
          >
            <div className="mb-4 text-4xl">
              <span role="img" aria-label="admin">👤</span>
            </div>
            <h2 className="text-xl mb-2">Admin</h2>
            <p>Login as an administrator to access the dashboard to manage app data.</p>
          </div>
          <div 
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
            onClick={() => navigateHandler("Student")}
          >
            <div className="mb-4 text-4xl">
              <span role="img" aria-label="student">🎓</span>
            </div>
            <h2 className="text-xl mb-2">Student</h2>
            <p>Login as a student to explore course materials and assignments.</p>
          </div>
          <div 
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
            onClick={() => navigateHandler("Teacher")}
          >
            <div className="mb-4 text-4xl">
              <span role="img" aria-label="teacher">👥</span>
            </div>
            <h2 className="text-xl mb-2">Teacher</h2>
            <p>Login as a teacher to create courses, assignments, and track student progress.</p>
          </div>
        </div>
      </div>
      {/* <Backdrop
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
        open={loader}
      > */}
        {/* <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <p className="mt-2 text-white">Please Wait</p>
        </div> */}
      {/* </Backdrop> */}
      {/* <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} /> */}
    </div>
  );
};

ChooseUser.propTypes = {
    visitor : PropTypes.string,
}

export default ChooseUser;
