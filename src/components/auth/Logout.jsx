
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '@/redux/slices/user/userSlice';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className='flex justify-center w-full' >
            <div>

                <p>{currentUser?.name || currentUser?.studentName} Are you sure you want to log out?</p>
                <button className='mx-4 px-6 py-2 rounded-md bg-red-600' onClick={handleLogout}>Log Out</button>
                <button className='mx-4 px-6 py-2 rounded-md bg-green-600' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default Logout;


