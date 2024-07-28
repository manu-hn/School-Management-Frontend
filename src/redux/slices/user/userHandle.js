/* eslint-disable no-unused-vars */
// userHandle.js

import axios from 'axios';
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getRequest,
    getFailed,
    getError,
    stuffAdded,
} from './userSlice';



export const loginUser = (fields, role) => async (dispatch) => {
    console.log(fields)
    
    dispatch(authRequest());
    try {
        const result = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${role}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(result)

        if (result.data.data.role) {
            dispatch(authSuccess(result.data.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(authError({ message: errorMessage }));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        console.log("Hello")
    
        const result = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
console.log(result)
       
        if (result.data.data.schoolName) {
            dispatch(authSuccess(result.data.data));
        } else if (result.data.data.school) {
            dispatch(stuffAdded());
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(authError(errorMessage));
    }
};

// Other actions...

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.data) {
            dispatch(doneSuccess(result.data.data));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(getError({ message: errorMessage }));
    }
};
// Add other actions...

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.data.schoolName) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(getError(errorMessage));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());


    try {
        const result = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(result.data)
        if (result.data.error) {
            dispatch(authFailed(result.data.message));
        } else {
            console.log(result.data)
            dispatch(stuffAdded(result.data.data));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch(authError(errorMessage));
    }
};
