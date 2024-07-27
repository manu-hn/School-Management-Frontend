import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/components/pages/home";
import Login from "@/components/auth/Login";
import SignUp from "@/components/auth/SignUp";


const Body = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />

                {/* <Route path="/admin-login" element={<TeacherLogin />} /> */}

                <Route path='*' element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default Body