
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const teachSclass = currentUser.teachSclass
    const teachSubject = currentUser.teachSubject
    const teachSchool = currentUser.school

    return (
        <>
            <div>
                <div>
                    <p>Name: {currentUser.name}</p>
                    <p>Email: {currentUser.email}</p>
                    <p>Class: {teachSclass.sclassName}</p>
                    <p>Subject: {teachSubject.subName}</p>
                    <p>School: {teachSchool.schoolName}</p>
                </div>
            </div>
        </>
    )
}

export default TeacherProfile
