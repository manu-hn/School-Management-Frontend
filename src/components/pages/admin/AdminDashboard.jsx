import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminSideBar from './AdminSideBar';
import AccountMenu from '@/components/AccountMenu';
import AdminHomePage from './AdminHomePage';
import AdminProfile from './AdminProfile';
import SeeComplains from './studentRelated/SeeComplains';
import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';
import ShowSubjects from './subjectRelated/ShowSubjects';
import ViewSubject from './subjectRelated/ViewSubject';
import ChooseClass from './teacherRelated/ChooseClass';
import SubjectForm from './subjectRelated/SubjectForm';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import AddClass from './classRelated/AddClass';
import ShowClasses from './classRelated/ShowClass';
import ClassDetails from './classRelated/ClassDetails';
import AddStudent from './studentRelated/AddStudent';
import ShowStudents from './studentRelated/ShowStudents';
import ViewStudent from './studentRelated/ViewStudents';
import ShowTeachers from './teacherRelated/ShowTeacher';
import TeacherDetails from './teacherRelated/TeacherDetails';
import ChooseSubject from './teacherRelated/ChooseSubject';
import AddTeacher from './teacherRelated/AddTeacher';
import Logout from '@/components/auth/Logout';


const AdminDashboard = () => {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div className="flex h-screen">
            <div className={`flex-shrink-0 bg-gray-200 text-white ${open ? "w-64" : "w-16"}`}>
                <div className="flex items-center justify-between p-4 ">
                    <button
                        className="text-white focus:outline-none "
                        onClick={toggleDrawer}
                    >
                        {open ? '⬅️' : '➡️'}
                    </button>
                </div>
                <div className=" py-4 border-gray-600 ">
                    <AdminSideBar isOpen={open} />
                </div>
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between bg-gray-900 text-white p-4">
                    <div className="flex items-center space-x-4">
                        <button
                            className="text-white focus:outline-none"
                            onClick={toggleDrawer}
                        >
                            
                        </button>
                        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    </div>
                    <AccountMenu />
                </header>
                <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
