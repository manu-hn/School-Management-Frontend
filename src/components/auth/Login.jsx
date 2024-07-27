import AdminLogin from "@/components/auth/admin/AdminLogin"
import StudentLogin from "@/components/auth/student/StudentLogin"
import TeacherLogin from "@/components/auth/teacher/TeacherLogin"


const Login = () => {
    return (
        <section className="grid md:grid-flow-row md:grid-cols-3 gap-4 md:gap-8 w-full">
            <StudentLogin />
            <TeacherLogin />
            <AdminLogin />
        </section>
    )
}

export default Login