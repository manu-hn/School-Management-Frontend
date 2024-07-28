/* eslint-disable no-unused-vars */
import { getSubjectList } from '@/redux/slices/sclass/sclassHandle';
import { getUserDetails } from '@/redux/slices/user/userHandle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList = [], sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (currentUser && currentUser._id) {
            dispatch(getUserDetails(currentUser._id, "Student"));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0 && currentUser && currentUser.sclassName) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser]);

    const handleSectionChange = (newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <>
                <h2 className="text-3xl font-bold text-center mb-4">Subject Marks</h2>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border-b">Subject</th>
                            <th className="px-4 py-2 border-b">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <tr key={index} className="even:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{result.subName.subName}</td>
                                    <td className="px-4 py-2 border-b">{result.marksObtained}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    };

    const renderChartSection = () => {
        return <h1>Should be the BarChart</h1>
        // <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />;
    };

    const renderClassDetailsSection = () => {
        return (
            <div className="p-4">
                <h2 className="text-3xl font-bold text-center mb-4">Class Details</h2>
                <h3 className="text-2xl mb-2">You are currently in Class {sclassDetails && sclassDetails.sclassName}</h3>
                <h4 className="text-xl mb-2">And these are the subjects:</h4>
                {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                    subjectsList.map((subject, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-lg">{subject.subName} ({subject.subCode})</p>
                        </div>
                    ))
                ) : (
                    <p>No subjects found.</p>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            {loading ? (
                <div className="flex items-center justify-center h-full">Loading...</div>
            ) : (
                <div className="flex-grow">
                    {subjectMarks.length > 0 ? (
                        <>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
                                <div className="flex justify-around p-2 border-t">
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
                        renderClassDetailsSection()
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentSubjects;
