import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Popup from "@/components/helper/Popup";
import { addStuff } from "@/redux/slices/user/userHandle";
import { underControl } from "@/redux/slices/user/userSlice";
import ClassRoom  from '/images/classroom.png'

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, tempDetails } = useSelector(state => state.user);
    
    const adminID = currentUser._id;
    const address = "Sclass";
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    console.log(tempDetails)
    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg border border-gray-300">
                    <div className="flex justify-center mb-6">
                        <img src={ClassRoom} alt="classroom" className="w-3/4" />
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Create a class"
                                value={sclassName}
                                onChange={(event) => setSclassName(event.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                disabled={loader}
                                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {loader ? "Loading..." : "Create"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full py-3 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Go Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default AddClass;
