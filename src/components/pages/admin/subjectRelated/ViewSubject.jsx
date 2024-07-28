import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClassStudents, getSubjectDetails } from '@/redux/slices/sclass/sclassHandle';
import PropTypes from 'prop-types';
import TableTemplate from '@/components/helper/TableTemplate';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.error(error);
  }

  const [value, setValue] = useState('1');

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <button
        onClick={() => navigate("/Admin/students/student/" + row.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
      >
        View
      </button>
      <button
        onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Take Attendance
      </button>
    </>
  );
  StudentsAttendanceButtonHaver.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rollNum: PropTypes.string.isRequired,
       
    }).isRequired,
};

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <button
        onClick={() => navigate("/Admin/students/student/" + row.id)}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
      >
        View
      </button>
      <button
        onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Provide Marks
      </button>
    </>
  );
  StudentsMarksButtonHaver.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rollNum: PropTypes.string.isRequired,
       
    }).isRequired,
};

  const SubjectStudentsSection = () => (
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

          {selectedSection === 'attendance' && (
            <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
          )}
          {selectedSection === 'marks' && (
            <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
          )}

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300">
            <div className="flex justify-around py-2">
              <button
                onClick={() => handleSectionChange('attendance')}
                className={`flex-1 py-2 text-center ${selectedSection === 'attendance' ? 'bg-gray-200' : ''}`}
              >
                Attendance
              </button>
              <button
                onClick={() => handleSectionChange('marks')}
                className={`flex-1 py-2 text-center ${selectedSection === 'marks' ? 'bg-gray-200' : ''}`}
              >
                Marks
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <h1 className="text-3xl font-bold text-center mb-4">Subject Details</h1>
        <p className="text-xl mb-2">Subject Name: {subjectDetails && subjectDetails.subName}</p>
        <p className="text-xl mb-2">Subject Code: {subjectDetails && subjectDetails.subCode}</p>
        <p className="text-xl mb-2">Subject Sessions: {subjectDetails && subjectDetails.sessions}</p>
        <p className="text-xl mb-2">Number of Students: {numberOfStudents}</p>
        <p className="text-xl mb-2">Class Name: {subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName.sclassName}</p>
        {subjectDetails && subjectDetails.teacher ? (
          <p className="text-xl mb-2">Teacher Name: {subjectDetails.teacher.name}</p>
        ) : (
          <button
            onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Subject Teacher
          </button>
        )}
      </>
    );
  };

  return (
    <>
      {subloading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full">
          <div className="bg-gray-100 p-4 border-b border-gray-300">
            <div className="flex space-x-4">
              <button
                onClick={() => handleChange('1')}
                className={`px-4 py-2 ${value === '1' ? 'bg-gray-200' : ''}`}
              >
                Details
              </button>
              <button
                onClick={() => handleChange('2')}
                className={`px-4 py-2 ${value === '2' ? 'bg-gray-200' : ''}`}
              >
                Students
              </button>
            </div>
          </div>
          <div className="p-4">
            {value === '1' && <SubjectDetailsSection />}
            {value === '2' && <SubjectStudentsSection />}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSubject;
