
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHome } from "react-icons/fa";
import { MdClass, MdSubject, MdOutlineExitToApp } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { CiSquareInfo } from "react-icons/ci";
import { RiErrorWarningFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const AdminSideBar = ({ isOpen }) => {
    const location = useLocation();

    const linkClasses = (path) =>
        `flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-lg 
         hover:bg-gray-200 ${location.pathname.startsWith(path) ? 'bg-gray-300' : ''}`;

    

    return (
        <div className="flex flex-col justify-between h-full ">
           <div className='flex flex-col'>
           <Link to="/" className={linkClasses("/")}>
                {isOpen ?
                    (<>
                        <FaHome className='text-2xl mx-2' />
                        <span>Home</span>
                    </>) :
                    < FaHome className='text-2xl' />}
            </Link>
            <Link to="/Admin/classes" className={linkClasses("/Admin/classes")}>
                {isOpen ?
                    (<>
                        <MdClass className='text-2xl mx-2' />
                        <span>Classes</span>
                    </>) :
                    < MdClass className='text-2xl' />}

            </Link>
            <Link to="/Admin/subjects" className={linkClasses("/Admin/subjects")}>
                {isOpen ?
                    (<>
                        <MdSubject className='text-2xl mx-2' />
                        <span>Subjects</span>
                    </>) :
                    <MdSubject className='text-2xl' />}
            </Link>
            <Link to="/Admin/teachers" className={linkClasses("/Admin/teachers")}>
                {isOpen ?
                    (<>
                        <FaChalkboardTeacher className='text-2xl mx-2' />
                        <span>Teacher</span>
                    </>) :
                    <FaChalkboardTeacher className='text-2xl' />}
            </Link>
            <Link to="/Admin/students" className={linkClasses("/Admin/students")}>
                {isOpen ?
                    (<>
                        <PiStudentFill className='text-2xl mx-2' />
                        <span>Student</span>
                    </>) :
                    <PiStudentFill className='text-2xl' />}
            </Link>
            <Link to="/Admin/notices" className={linkClasses("/Admin/notices")}>
                {isOpen ?
                    (<>
                        <CiSquareInfo className='text-2xl mx-2' />
                        <span>Notices</span>
                    </>) :
                    < CiSquareInfo className='text-2xl' />}
            </Link>
            <Link to="/Admin/complains" className={linkClasses("/Admin/complains")}>
                {isOpen ?
                    (<>
                        <RiErrorWarningFill className='text-2xl mx-2' />
                        <span>Complains</span>
                    </>) :
                    <RiErrorWarningFill className='text-2xl' />}
            </Link>
           </div>
            <hr className="my-4 border-gray-300" />
           <div>
           <div className="px-4 py-2 text-sm font-medium text-gray-500">
                {isOpen && <p>User</p>}
            </div>
            <Link to="/Admin/profile" className={linkClasses("/Admin/profile")}>
                {isOpen ?
                    (<>
                        <CgProfile className='text-2xl mx-2' />
                        <span>Profile</span>
                    </>) :
                    <CgProfile className='text-2xl' />}
            </Link>
            <Link to="/logout" className={linkClasses("/logout")}>
                {isOpen ?
                    (<>
                        <MdOutlineExitToApp className='text-2xl mx-2' />
                        <span>Profile</span>
                    </>) :
                    <MdOutlineExitToApp className='text-2xl' />}
            </Link>
           </div>
        </div>
    );
}

AdminSideBar.propTypes = {
    isOpen: PropTypes.bool
}
export default AdminSideBar;
