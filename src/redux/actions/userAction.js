import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS
} from '../constants/userConstant';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("https://careersyncbe-1.onrender.com/api/signin", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Logged in Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("https://careersyncbe-1.onrender.com/api/signup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Registered Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get("https://careersyncbe-1.onrender.com/api/logout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Logged out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
// export const userProfileAction = () => async (dispatch) => {
//     dispatch({ type: USER_LOAD_REQUEST });
//     try {
//         const { data } = await axios.get("https://careersyncbe-1.onrender.com/api/me");
//         dispatch({
//             type: USER_LOAD_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         dispatch({
//             type: USER_LOAD_FAIL,
//             payload: error.response.data.error
//         });
//     }
// }

export const userProfileAction = () => async (dispatch, getState) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        const response = await fetch("https://careersyncbe-1.onrender.com/api/me", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.message || "Something went wrong"
        });
    }
}


//all user action
// export const allUserAction = () => async (dispatch) => {
//     dispatch({ type: ALL_USER_LOAD_REQUEST });
//     try {
//         const { data } = await axios.get("https://careersyncbe-1.onrender.com/api/allusers");
//         dispatch({
//             type: ALL_USER_LOAD_SUCCESS,
//             payload: data
//         });

//     } catch (error) {
//         dispatch({
//             type: ALL_USER_LOAD_FAIL,
//             payload: error.response.data.error
//         });
//     }
// }


export const allUserAction = () => async (dispatch, getState) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        const response = await fetch("https://careersyncbe-1.onrender.com/api/allusers", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        console.error("Error fetching all users:", error);
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.message || "Something went wrong"
        });
    }
}


//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("https://careersyncbe-1.onrender.com/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Applied Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
