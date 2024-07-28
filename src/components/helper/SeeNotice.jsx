import { getAllNotices } from '@/redux/slices/notice/noticeHandle';
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableViewTemplate from './TableViewTemplate';



const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        } else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.error(error);
    }

            const noticeColumns = [
                { id: 'title', label: 'Title', minWidth: 170 },
                { id: 'details', label: 'Details', minWidth: 100 },
                { id: 'date', label: 'Date', minWidth: 170 },
            ];

            const noticeRows = noticesList.map((notice) => {
                const date = new Date(notice.date);
                const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                return {
                    title: notice.title,
                    details: notice.details,        
                    date: dateString,
                    id: notice._id,
                };
            });

    return (
        <div className="mt-12 mr-5">
            {loading ? (
                <div className="text-lg">Loading...</div>
            ) : response ? (
                <div className="text-lg">No Notices to Show Right Now</div>
            ) : (
                <>
                    <h3 className="text-2xl font-bold mb-10">Notices</h3>
                    <div className="w-full overflow-hidden bg-white shadow-md rounded-lg">
                        {Array.isArray(noticesList) && noticesList.length > 0 && (
                            <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SeeNotice;
