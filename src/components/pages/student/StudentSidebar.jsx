
import { Link, useLocation } from 'react-router-dom';

import { CiHome } from "react-icons/ci";
import { MdOutlineClass, MdOutlineAnnouncement, MdAssignment } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoMdExit } from "react-icons/io";

const StudentSideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col mb-4">
                <Link to="/" className={`flex items-center p-2 mb-1 rounded ${isActive("/") || isActive("/Student/dashboard") ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                    <CiHome className={`mr-2 ${isActive("/") || isActive("/Student/dashboard") ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span>Home</span>
                </Link>
                <Link to="/Student/subjects" className={`flex items-center p-2 mb-1 rounded ${isActive("/Student/subjects") ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                    <MdAssignment className={`mr-2 ${isActive("/Student/subjects") ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span>Subjects</span>
                </Link>
                <Link to="/Student/attendance" className={`flex items-center p-2 mb-1 rounded ${isActive("/Student/attendance") ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                    <MdOutlineClass className={`mr-2 ${isActive("/Student/attendance") ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span>Attendance</span>
                </Link>
                <Link to="/Student/complain" className={`flex items-center p-2 mb-1 rounded ${isActive("/Student/complain") ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                    <MdOutlineAnnouncement className={`mr-2 ${isActive("/Student/complain") ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span>Complain</span>
                </Link>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col mt-4">
                <div className="px-2 py-1 text-gray-600 font-medium">User</div>
                <Link to="/Student/profile" className={`flex items-center p-2 mb-1 rounded ${isActive("/Student/profile") ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                    <RiAccountCircleFill className={`mr-2 ${isActive("/Student/profile") ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span>Profile</span>
                </Link>
                <Link to="/logout" className={`flex items-center p-2 mb-1 rounded ${isActive("/logout") ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}>
                    <IoMdExit className={`mr-2 ${isActive("/logout") ? 'text-blue-600' : 'text-gray-600'}`} />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
}

export default StudentSideBar;
