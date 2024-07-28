import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '@/redux/slices/user/userHandle';
import { underControl } from '@/redux/slices/user/userSlice';
import Popup from '@/components/helper/Popup';


const AddNotice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, response, error } = useSelector(state => state.user);
    const { currentUser } = useSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const adminID = currentUser._id;

    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const fields = { title, details, date, adminID };
    const address = "Notice";

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate('/Admin/notices');
            dispatch(underControl());
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <form
                    className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
                    onSubmit={submitHandler}
                >
                    <h1 className="text-2xl font-bold mb-4">Add Notice</h1>

                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        type="text"
                        placeholder="Enter notice title..."
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />

                    <label className="block mb-2 font-semibold">Details</label>
                    <input
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        type="text"
                        placeholder="Enter notice details..."
                        value={details}
                        onChange={(event) => setDetails(event.target.value)}
                        required
                    />

                    <label className="block mb-2 font-semibold">Date</label>
                    <input
                        className="block w-full mb-4 p-2 border border-gray-300 rounded"
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />

                    <button
                        className={`w-full p-2 rounded text-white ${loader ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        type="submit"
                        disabled={loader}
                    >
                        {loader ? (
                            <div className="flex items-center justify-center">
                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                            </div>
                        ) : (
                            'Add'
                        )}
                    </button>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddNotice;
