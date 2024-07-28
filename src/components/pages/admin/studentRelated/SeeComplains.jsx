import TableTemplate from '@/components/helper/TableTemplate';
import { getAllComplains } from '@/redux/slices/complain/complainHandle';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const SeeComplains = () => {
    const dispatch = useDispatch();
    const { complainsList, loading, error, response } = useSelector((state) => state.complain);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllComplains(currentUser._id, "Complain"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const complainColumns = [
        { id: 'user', label: 'User', minWidth: 170 },
        { id: 'complaint', label: 'Complaint', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
        const date = new Date(complain.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            user: complain.user.name,
            complaint: complain.complaint,
            date: dateString,
            id: complain._id,
        };
    });

    const ComplainButtonHaver = ({ row }) => {
        console.log(row)
        return (
            <>
                <input type="checkbox" aria-label="Checkbox demo" />
            </>
        );
    };
    ComplainButtonHaver.propTypes = {
        row: PropTypes.shape({
            user: PropTypes.string.isRequired,
            complaint: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }).isRequired,
    };

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-4">
                    <div className="spinner border-t-2 border-b-2 border-gray-900 w-6 h-6 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    {response ? (
                        <div className="flex justify-end mt-4">
                            No Complains Right Now
                        </div>
                    ) : (
                        <div className="w-full overflow-hidden">
                            {Array.isArray(complainsList) && complainsList.length > 0 && (
                                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default SeeComplains;
