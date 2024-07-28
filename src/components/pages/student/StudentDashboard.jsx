import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';


import AccountMenu from '@/components/AccountMenu';
import StudentSideBar from './StudentSidebar';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStudentAttendance';
import StudentComplain from './StudentComplain';
import Logout from '@/components/auth/Logout';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => setOpen(!open);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: open ? '250px' : '0', transition: '0.3s', overflow: 'hidden' }}>
                <div style={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={toggleDrawer} style={{ fontSize: '24px', background: 'none', border: 'none' }}>
                        {open ? '◄' : '☰'}
                    </button>
                </div>
                <nav style={{ display: open ? 'block' : 'none', padding: '16px' }}>
                    <StudentSideBar />
                </nav>
            </div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <header style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: '#3f51b5', color: 'white' }}>
                    <button onClick={toggleDrawer} style={{ fontSize: '24px', color: 'white', background: 'none', border: 'none', marginRight: '16px' }}>
                        {open ? '◄' : '☰'}
                    </button>
                    <h1 style={{ flexGrow: 1, margin: 0 }}>Student Dashboard</h1>
                    <AccountMenu />
                </header>
                <main style={{ backgroundColor: '#f4f6f8', flexGrow: 1, padding: '16px' }}>
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />
                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplain />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default StudentDashboard;
