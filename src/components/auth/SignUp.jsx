import AdminRegistration from "@/components/auth/admin/AdminRegistration"
// import StudentRegistration from "@/components/auth/student/StudentSignUp"
// import TeacherRegistration from "@/components/auth/teacher/SignUpTeacher"


const SignUp = () => {
    return (
        <section className="grid md:grid-flow-row md:grid-cols-1  w-full">
            <AdminRegistration />
            
        </section>
    )
}

export default SignUp