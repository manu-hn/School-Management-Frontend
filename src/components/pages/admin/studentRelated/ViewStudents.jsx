/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '@/redux/slices/user/userHandle';
import { getSubjectList } from '@/redux/slices/sclass/sclassHandle';
import { removeStuff, updateStudentFields } from '@/redux/slices/student/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '@/components/attendance/attendanceCalculator';
import Popup from '@/components/helper/Popup';


const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const [value, setValue] = useState('1');
    const [selectedSection, setSelectedSection] = useState('table');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});
    
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);
    const studentID = params.id;
    const address = "Student";
    
    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || []);
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const handleTabChange = (event) => {
        setValue(event.target.value);
    };


    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };
    const fields = password === ""
    ? { name, rollNum }
    : { name, rollNum, password }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);

        // dispatch(deleteUser(studentID, address))
        //     .then(() => {
        //         navigate(-1);
        //     });
    };

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    const StudentAttendanceSection = () => {
        const renderTableSection = () => {
            return (
                <>
                    <h3>Attendance:</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sessions</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Percentage</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                return (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">{subName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{present}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{sessions}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{subjectAttendancePercentage}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleOpen(subId)}>
                                                    {openStates[subId] ? 'Hide Details' : 'Show Details'}
                                                </button>
                                                <button className="bg-red-500 text-white px-3 py-1 rounded mr-2" onClick={() => removeSubAttendance(subId)}>
                                                    Delete
                                                </button>
                                                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
                                                    Change
                                                </button>
                                            </td>
                                        </tr>
                                        {openStates[subId] && (
                                            <tr>
                                                <td colSpan={5}>
                                                    <div className="p-4">
                                                        <h4 className="text-lg font-semibold">Attendance Details</h4>
                                                        <table className="min-w-full divide-y divide-gray-200 mt-2">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                {allData.map((data, index) => {
                                                                    const date = new Date(data.date);
                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td className="px-6 py-4 whitespace-nowrap">{dateString}</td>
                                                                            <td className="px-6 py-4 whitespace-nowrap">{data.status}</td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                    <div>Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%</div>
                    <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>Add Attendance</button>
                </>
            );
        };

        const renderChartSection = () => {
            return (
                <>
                    <h3>Attendance Chart:</h3>
                    <div className="flex flex-col items-center">
                        {/* <CustomPieChart data={chartData} /> */}
                    </div>
                </>
            );
        };

        return (
            <>
                <div className="flex space-x-4 mb-4">
                    <button className={`px-4 py-2 rounded ${selectedSection === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleSectionChange('table')}>Table View</button>
                    <button className={`px-4 py-2 rounded ${selectedSection === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleSectionChange('chart')}>Chart View</button>
                </div>
                {selectedSection === 'table' ? renderTableSection() : renderChartSection()}
            </>
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student Details</h1>
            <form onSubmit={submitHandler}>
                {/* Add form fields for updating student information */}
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Update</button>
                <button type="button" onClick={deleteHandler} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
            </form>
            <StudentAttendanceSection                                                                                                                                                                                                                                                                                                                />
            <Popup show={showPopup} message={message} onClose={() => setShowPopup(false)} />
        </div>
    );
};

export default ViewStudent;
