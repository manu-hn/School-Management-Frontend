import { addStuff } from '@/redux/slices/user/userHandle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error");
        }
    }, [status, error]);

    return (
        <>
            <div style={{
                flex: '1 1 auto',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    maxWidth: '550px',
                    padding: '100px 20px',
                    width: '100%'
                }}>
                    <h2>Complain</h2>
                    <form onSubmit={submitHandler}>
                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="date" style={{ display: 'block', marginBottom: '8px' }}>Select Date</label>
                            <input
                                id="date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="complaint" style={{ display: 'block', marginBottom: '8px' }}>Write your complaint</label>
                            <textarea
                                id="complaint"
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loader}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: '#3f51b5',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {loader ? <span style={{ fontSize: '24px' }}>Loading...</span> : "Add"}
                        </button>
                    </form>
                </div>
            </div>
            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    backgroundColor: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    zIndex: 1000
                }}>
                    <p>{message}</p>
                    <button
                        onClick={() => setShowPopup(false)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#3f51b5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            )}
        </>
    );
};

export default StudentComplain;
