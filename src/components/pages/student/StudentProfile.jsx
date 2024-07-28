
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-36 h-36 flex items-center justify-center bg-gray-200 rounded-full">
            <span className="text-4xl font-bold">
              {String(currentUser.name).charAt(0)}
            </span>
          </div>
        </div>
        <div className="text-center mb-2">
          <h2 className="text-2xl font-semibold">{currentUser.name}</h2>
        </div>
        <div className="text-center mb-2">
          <p className="text-lg">Student Roll No: {currentUser.rollNum}</p>
        </div>
        <div className="text-center mb-2">
          <p className="text-lg">Class: {sclassName.sclassName}</p>
        </div>
        <div className="text-center">
          <p className="text-lg">School: {studentSchool.schoolName}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Date of Birth:</p>
            <p>January 1, 2000</p>
          </div>
          <div>
            <p className="font-medium">Gender:</p>
            <p>Male</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>john.doe@example.com</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>(123) 456-7890</p>
          </div>
          <div>
            <p className="font-medium">Address:</p>
            <p>123 Main Street, City, Country</p>
          </div>
          <div>
            <p className="font-medium">Emergency Contact:</p>
            <p>(987) 654-3210</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
