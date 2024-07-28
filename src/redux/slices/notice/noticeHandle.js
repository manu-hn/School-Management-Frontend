
import axios from 'axios';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError
} from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${address}List/${id}`);
        console.log(result.data)
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data.data));
        }
    } catch (error) {
        const errorData = {
            message: error.message,
            code: error.code,
            response: error.response?.data || null, // optional, based on what you need
        };
        dispatch(getError(errorData));
    }
}
