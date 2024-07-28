
import SeeNotice from '../../components/SeeNotice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getClassStudents, getSubjectDetails } from '@/redux/slices/sclass/sclassHandle';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions
    console.log(numberOfSessions, numberOfStudents)

    return (
        <>
            <section  style={{ mt: 4, mb: 4 }}>
                <div >
                    <div>
                        <div>
                            <img src={''} alt="Students" />
                            <h2>
                                Class Students
                            </h2>
                            {/* <Data start={0} end={numberOfStudents} duration={2.5} /> */}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={''} alt="Lessons" />
                            <h2>
                                Total Lessons
                            </h2>
                            {/* <Data start={0} end={numberOfSessions} duration={5} /> */}
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={'Tests'} alt="Tests" />
                            <h2>
                                Tests Taken
                            </h2>
                            {/* <Data start={0} end={24} duration={4} /> */}
                        </div>
                    </div>
                    <div >
                        <div>
                            <img src={'Time'} alt="Time" />
                            <h2>
                                Total Hours
                            </h2>
                            {/* <Data start={0} end={30} duration={4} suffix="hrs" /> */}
                        </div>
                    </div>
                    <div >
                        <div style={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <SeeNotice />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}




export default TeacherHomePage