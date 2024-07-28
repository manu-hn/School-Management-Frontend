import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '@/components/attendance/attendanceCalculator';
import { getUserDetails } from '@/redux/slices/user/userHandle';


const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const [openStates, setOpenStates] = useState({});
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        console.log(subCode)
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    console.log(subjectData)
    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const renderTableSection = () => {
        return (
            <div className="p-4">
                <h2 className="text-3xl font-bold text-center mb-4">Attendance</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">Subject</th>
                            <th className="px-4 py-2 border-b">Present</th>
                            <th className="px-4 py-2 border-b">Total Sessions</th>
                            <th className="px-4 py-2 border-b">Attendance Percentage</th>
                            <th className="px-4 py-2 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => {
                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                            return (
                                <React.Fragment key={index}>
                                    <tr>
                                        <td className="px-4 py-2 border-b">{subName}</td>
                                        <td className="px-4 py-2 border-b">{present}</td>
                                        <td className="px-4 py-2 border-b">{sessions}</td>
                                        <td className="px-4 py-2 border-b">{subjectAttendancePercentage}%</td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <button
                                                onClick={() => handleOpen(subId)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                {openStates[subId] ? '▲' : '▼'} Details
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className="p-0">
                                            <div className={`collapse ${openStates[subId] ? 'block' : 'hidden'}`}>
                                                <div className="p-4">
                                                    <h3 className="text-xl font-semibold mb-2">Attendance Details</h3>
                                                    <table className="min-w-full bg-white border border-gray-200">
                                                        <thead>
                                                            <tr className="bg-gray-100">
                                                                <th className="px-4 py-2 border-b">Date</th>
                                                                <th className="px-4 py-2 border-b text-right">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allData.map((data, index) => {
                                                                const date = new Date(data.date);
                                                                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="px-4 py-2 border-b">{dateString}</td>
                                                                        <td className="px-4 py-2 border-b text-right">{data.status}</td>
                                                                    </tr>
                                                                );
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4">
                    Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                </div>
            </div>
        );
    };

    const renderChartSection = () => {
        return (
            <div className="p-4">
                <h2>BarChar Should be rendered</h2>
                {/* <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" /> */}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            {loading ? (
                <div className="flex items-center justify-center h-full">Loading...</div>
            ) : (
                <div className="flex-grow">
                    {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
                                <div className="flex justify-around p-2">
                                    <button
                                        onClick={() => handleSectionChange('table')}
                                        className={`flex-1 py-2 text-center ${selectedSection === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                                    >
                                        <span className={`inline-block mr-2 ${selectedSection === 'table' ? 'text-blue-600' : 'text-gray-600'}`}>📊</span>
                                        Table
                                    </button>
                                    <button
                                        onClick={() => handleSectionChange('chart')}
                                        className={`flex-1 py-2 text-center ${selectedSection === 'chart' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                                    >
                                        <span className={`inline-block mr-2 ${selectedSection === 'chart' ? 'text-blue-600' : 'text-gray-600'}`}>📈</span>
                                        Chart
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-4">
                            <h3 className="text-xl font-semibold">Currently You Have No Attendance Details</h3>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewStdAttendance;
