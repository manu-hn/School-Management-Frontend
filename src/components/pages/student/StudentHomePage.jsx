import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '@/components/attendance/attendanceCalculator';
import styled from 'styled-components';
import { getUserDetails } from '@/redux/slices/user/userHandle';
import { getSubjectList } from '@/redux/slices/sclass/sclassHandle';
import Subject from "/images/Subjects.jpg";
import Assignments from "/images/Assignment.webp";
import CustomPieChart from '@/components/helper/CustomPieChart';
import SeeNotice from '@/components/helper/SeeNotice';
import CountUp from 'react-countup';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;
   
    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];


    return (
        <section className='w-full'>
            <div className='w-full'>
                <div className='flex w-full justify-evenly items-center'>
                    <div>
                        <img src={Subject} alt="Subjects" height={72} width={72} />
                        <h2>Total Subjects</h2>
                        <Data start={0} end={numberOfSubjects} duration={2.5} />
                    </div>
                    <div>
                        <img src={Assignments} alt="Assignments" height={72} width={72} />
                        <h2>Total Assignments</h2>
                        <Data start={0} end={10} duration={4} />
                    </div>
                    <div>
                        {
                            response ?
                                <p>No Attendance Found</p>
                                :
                                <>
                                    {loading
                                        ? <p>Loading...</p>
                                        :
                                        <>
                                            {
                                                subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                    <CustomPieChart data={chartData} />

                                                )
                                                    :
                                                    <p>No Attendance Found</p>
                                            }
                                        </>
                                    }
                                </>
                        }
                    </div>
                </div>

                <SeeNotice />

            </div>
        </section>
    );
}

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;
export default StudentHomePage;
