import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import Students from "/images/Students.png"
import Fees from "/images/Fees.png"
import TotalClasses from "/images/TotalClasses.png"
import Teacher from "/images/Teacher.png"
import { getAllStudents } from '@/redux/slices/student/studentHandle';
import { getAllSclasses } from '@/redux/slices/sclass/sclassHandle';
import { getAllTeachers } from '@/redux/slices/teacher/teacherHandle';
import SeeNotice from '@/components/helper/SeeNotice';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfClasses = sclassesList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;

    return (
        <div className="max-w-7xl mx-auto my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                    <img src={Students} alt="Students" className="w-16 h-16 mb-4" />
                    <p className="text-xl font-semibold mb-2">Total Students</p>
                    <CountUp start={0} end={numberOfStudents} duration={2.5} className="text-3xl text-green-600" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                    <img src={TotalClasses} alt="Classes" className="w-16 h-16 mb-4" />
                    <p className="text-xl font-semibold mb-2">Total Classes</p>
                    <CountUp start={0} end={numberOfClasses} duration={5} className="text-3xl text-green-600" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                    <img src={Teacher} alt="Teachers" className="w-16 h-16 mb-4" />
                    <p className="text-xl font-semibold mb-2">Total Teachers</p>
                    <CountUp start={0} end={numberOfTeachers} duration={2.5} className="text-3xl text-green-600" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center">
                    <img src={Fees} alt="Fees" className="w-16 h-16 mb-4" />
                    <p className="text-xl font-semibold mb-2">Fees Collection</p>
                    <CountUp start={0} end={23000} duration={2.5} prefix="$" className="text-3xl text-green-600" />
                </div>
                <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white p-4 rounded-lg shadow-md">
                    <SeeNotice />
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;
