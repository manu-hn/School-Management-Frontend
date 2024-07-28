import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '@/components/attendance/attendanceCalculator';
import { getUserDetails } from '@/redux/slices/user/userHandle';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) {
        console.log(response);
    } else if (error) {
        console.log(error);
    }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
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
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ padding: '20px' }}>
                    <div>
                        <strong>Name:</strong> {userDetails.name}
                    </div>
                    <div>
                        <strong>Roll Number:</strong> {userDetails.rollNum}
                    </div>
                    <div>
                        <strong>Class:</strong> {sclassName}
                    </div>
                    <div>
                        <strong>School:</strong> {studentSchool}
                    </div>
                    <br />

                    <h3>Attendance:</h3>
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                        <>
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                if (subName === teachSubject) {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                    return (
                                        <table key={index} style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f4f4f4' }}>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Subject</th>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Present</th>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Total Sessions</th>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Attendance Percentage</th>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{subName}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{present}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{sessions}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{subjectAttendancePercentage}%</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>
                                                        <button
                                                            style={{
                                                                backgroundColor: '#3f51b5',
                                                                color: '#fff',
                                                                border: 'none',
                                                                padding: '8px 16px',
                                                                cursor: 'pointer'
                                                            }}
                                                            onClick={() => handleOpen(subId)}
                                                        >
                                                            {openStates[subId] ? 'Hide Details' : 'Show Details'}
                                                        </button>
                                                    </td>
                                                </tr>
                                                {openStates[subId] && (
                                                    <tr>
                                                        <td colSpan={5} style={{ padding: '8px', border: '1px solid #ddd' }}>
                                                            <div style={{ margin: '16px 0' }}>
                                                                <strong>Attendance Details</strong>
                                                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                    <thead>
                                                                        <tr style={{ backgroundColor: '#f4f4f4' }}>
                                                                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                                                                            <th style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <tr key={index}>
                                                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{dateString}</td>
                                                                                    <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'right' }}>{data.status}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                            <div>
                                <strong>Overall Attendance Percentage:</strong> {overallAttendancePercentage.toFixed(2)}%
                            </div>

                            <div>
                                <strong>Attendance Chart:</strong>
                                {/* Replace this with a simple chart or just text representation */}
                                <div>
                                    {chartData.map((data, index) => (
                                        <div key={index} style={{ margin: '8px 0' }}>
                                            <strong>{data.name}:</strong> {data.value}%
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <br />
                    <button
                        style={{
                            backgroundColor: '#3f51b5',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            marginBottom: '16px'
                        }}
                        onClick={() =>
                            navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)
                        }
                    >
                        Add Attendance
                    </button>
                    <br /><br />
                    <h3>Subject Marks:</h3>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 && (
                        <>
                            {subjectMarks.map((result, index) => {
                                if (result.subName.subName === teachSubject) {
                                    return (
                                        <table key={index} style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f4f4f4' }}>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Subject</th>
                                                    <th style={{ padding: '8px', border: '1px solid #ddd' }}>Marks</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{result.subName.subName}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{result.marksObtained}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    );
                                } else if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return null;
                            })}
                        </>
                    )}
                    <button
                        style={{
                            backgroundColor: '#6a1b9a',
                            color: '#fff',
                            border: 'none',
                            padding: '8px 16px',
                            cursor: 'pointer'
                        }}
                        onClick={() =>
                            navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)
                        }
                    >
                        Add Marks
                    </button>
                    <br /><br />
                </div>
            )}
        </>
    );
}

export default TeacherViewStudent;
