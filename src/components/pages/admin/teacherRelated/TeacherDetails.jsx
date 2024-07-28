import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTeacherDetails } from '@/redux/slices/teacher/teacherHandle';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.error(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <div className="p-4">
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-4">Teacher Details</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Teacher Name:</h2>
                        <p className="text-lg">{teacherDetails?.name}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold">Class Name:</h2>
                        <p className="text-lg">{teacherDetails?.teachSclass?.sclassName}</p>
                    </div>
                    {isSubjectNamePresent ? (
                        <>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Subject Name:</h2>
                                <p className="text-lg">{teacherDetails?.teachSubject?.subName}</p>
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold">Subject Sessions:</h2>
                                <p className="text-lg">{teacherDetails?.teachSubject?.sessions}</p>
                            </div>
                        </>
                    ) : (
                        <button
                            onClick={handleAddSubject}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Subject
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TeacherDetails;
