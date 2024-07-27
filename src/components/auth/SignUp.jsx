import AdminRegistration from "@/components/auth/admin/AdminRegistration"
import StudentRegistration from "@/components/auth/student/StudentSignUp"
import TeacherRegistration from "@/components/auth/teacher/SignUpTeacher"


const SignUp = () => {
    return (
        <section className="grid md:grid-flow-row md:grid-cols-3 gap-4 md:gap-8 w-full">
            <AdminRegistration />
            <StudentRegistration />
            <TeacherRegistration />
        </section>
    )
}

export default SignUp