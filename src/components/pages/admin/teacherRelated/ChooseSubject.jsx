import { getTeacherFreeClassSubjects } from '@/redux/slices/sclass/sclassHandle';
import { updateTeachSubject } from '@/redux/slices/teacher/teacherHandle';
import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
console.log(subjectsList)
    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            const classID = params.id;
            dispatch(getTeacherFreeClassSubjects(classID));
        } else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, dispatch, params, navigate]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    } else if (response) {
        return (
            <div className="text-center py-4">
                <h1 className="text-xl font-semibold mb-4">Sorry, all subjects have teachers assigned already</h1>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => navigate("/Admin/addsubject/" + classID)}
                    >
                        Add Subjects
                    </button>
                </div>
            </div>
        );
    } else if (error) {
        console.log(error);
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject))
            .then(() => {
                setLoader(false);
                navigate("/Admin/teachers");
            });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Choose a subject</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 border-b">
                            <th className="py-2 px-4 border-r">#</th>
                            <th className="py-2 px-4 border-r text-center">Subject Name</th>
                            <th className="py-2 px-4 border-r text-center">Subject Code</th>
                            <th className="py-2 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                            <tr key={subject._id} className="border-b">
                                <td className="py-2 px-4 border-r">{index + 1}</td>
                                <td className="py-2 px-4 border-r text-center">{subject.subName}</td>
                                <td className="py-2 px-4 border-r text-center">{subject.subCode}</td>
                                <td className="py-2 px-4 text-center">
                                    {situation === "Norm" ? (
                                        <button
                                            onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                        >
                                            Choose
                                        </button>
                                    ) : (
                                        <button
                                            disabled={loader}
                                            onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                        >
                                            {loader ? (
                                                <div className="loader"></div> // You can use a custom loader component or spinner here
                                            ) : (
                                                'Choose Sub'
                                            )}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ChooseSubject.propTypes = {
    situation: PropTypes.string.isRequired,
   
}
export default ChooseSubject;
