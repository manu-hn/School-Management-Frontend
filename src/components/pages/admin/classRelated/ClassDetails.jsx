import { getClassDetails, getClassStudents, getSubjectList } from "@/redux/slices/sclass/sclassHandle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MdDelete, MdPostAdd } from "react-icons/md";
import TableTemplate from "@/components/helper/TableTemplate";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Popup from "@/components/helper/Popup";
import PropTypes from 'prop-types';
import SpeedDialTemplate from "@/components/helper/SpeedDialTemplate";

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse, } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        console.log(classID)
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(handleChange)

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        console.log(deleteID);
        console.log(address);
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getClassStudents(classID));
        //         dispatch(resetSubjects());
        //         dispatch(getSubjectList(classID, "ClassSubjects"));
        //     });
    }

    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ];

    const subjectRows = subjectsList && subjectsList.length > 0 && subjectsList.map((subject) => {
        return {
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        };
    });

    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                <button onClick={() => deleteHandler(row.id, "Subject")} className="text-red-500 hover:text-red-700">
                    <MdDelete />
                </button>
                <button
                    onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    View
                </button>
            </>
        );
    };
    SubjectsButtonHaver.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    };
    const subjectActions = [
        {
            icon: <MdPostAdd color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/addsubject/" + classID)
        },
        {
            icon: <MdDelete color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(classID, "SubjectsClass")
        }
    ];
   

    const ClassSubjectsSection = () => {
        return (
            <>
                {response ?
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => navigate("/Admin/addsubject/" + classID)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add Subjects
                        </button>
                    </div>
                    :
                    <>
                        <h2 className="text-2xl font-bold mb-4">Subjects List:</h2>
                        <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        <SpeedDialTemplate actions={subjectActions} />
                    </>
                }
            </>
        );
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    });

    const StudentsButtonHaver = ({ row }) => {
        return (
            <>
                <button onClick={() => deleteHandler(row.id, "Student")} className="text-red-500 hover:text-red-700">
                    {/* <PersonRemoveIcon /> */}
                </button>
                <button
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    View
                </button>
                <button
                    onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                    Attendance
                </button>
            </>
        );
    };
    StudentsButtonHaver.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    };

    const studentActions = [
        {
            icon: <IoMdPersonAdd color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/class/addstudents/" + classID)
        },
        {
            icon: <IoPersonRemoveSharp color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(classID, "StudentsClass")
        },
    ];

    console.log(studentActions)
    const ClassStudentsSection = () => {
        return (
            <>
                {getresponse ? (
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add Students
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Students List:</h2>
                        <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
                        {/* <SpeedDialTemplate actions={studentActions} /> */}
                    </>
                )}
            </>
        );
    };

    const ClassTeachersSection = () => {
        return (
            <>
                <h2 className="text-2xl font-bold mb-4">Teachers</h2>
            </>
        );
    };

    const ClassDetailsSection = () => {
        const numberOfSubjects = subjectsList.length;
        const numberOfStudents = sclassStudents.length;

        return (
            <>
                <h1 className="text-4xl font-bold text-center mb-4">Class Details</h1>
                <h2 className="text-2xl font-bold mb-2">This is Class {sclassDetails && sclassDetails.sclassName}</h2>
                <h3 className="text-xl mb-2">Number of Subjects: {numberOfSubjects}</h3>
                <h3 className="text-xl mb-4">Number of Students: {numberOfStudents}</h3>
                {getresponse &&
                    <button
                        onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Students
                    </button>
                }
                {response &&
                    <button
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Subjects
                    </button>
                }
            </>
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="w-full">
                        <div className="flex border-b border-gray-300">
                            <button
                                onClick={() => setValue('1')}
                                className={`w-1/4 py-2 text-center ${value === '1' ? 'bg-gray-200' : 'bg-white'} border-b-2 border-transparent hover:border-gray-300`}
                            >
                                Details
                            </button>
                            <button
                                onClick={() => setValue('2')}
                                className={`w-1/4 py-2 text-center ${value === '2' ? 'bg-gray-200' : 'bg-white'} border-b-2 border-transparent hover:border-gray-300`}
                            >
                                Subjects
                            </button>
                            <button
                                onClick={() => setValue('3')}
                                className={`w-1/4 py-2 text-center ${value === '3' ? 'bg-gray-200' : 'bg-white'} border-b-2 border-transparent hover:border-gray-300`}
                            >
                                Students
                            </button>
                            <button
                                onClick={() => setValue('4')}
                                className={`w-1/4 py-2 text-center ${value === '4' ? 'bg-gray-200' : 'bg-white'} border-b-2 border-transparent hover:border-gray-300`}
                            >
                                Teachers
                            </button>
                        </div>
                        <div className="mt-12 mb-16">
                            {value === '1' && <ClassDetailsSection />}
                            {value === '2' && <ClassSubjectsSection />}
                            {value === '3' && <ClassStudentsSection />}
                            {value === '4' && <ClassTeachersSection />}
                        </div>
                    </div>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
