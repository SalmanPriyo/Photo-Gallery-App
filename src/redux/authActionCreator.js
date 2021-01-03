import * as actionTypes from './ActionTypes';
import axios from 'axios';


export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            userId: userId,
            token: token
        }
    }
}

export const authLoading = isLoading => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading
    }
}

export const authFailed = errMsg => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg
    }
}

export const auth = (email, password, mode) => dispatch => {
    dispatch(authLoading(true));
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    } else {
        authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
    }
    const API_KEY = "AIzaSyA1BCvT6eHyhfJtxOeKf0AEmAsOlM8Ja6c";
    axios.post(authUrl + API_KEY, authData)
        .then(response => {
            dispatch(authLoading(false));
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expireTime', expireTime);

            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            dispatch(authLoading(false));
            // console.log(err.response.data.error.message);
            dispatch(authFailed(err.response.data.error.message))
        })
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Log Out
        dispatch(logOut());
    } else {
        const expireTime = new Date(localStorage.getItem('expireTime'));
        if (expireTime <= new Date()) {
            // Log Out
            dispatch(logOut());
        } else {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(userId, token));
        }
    }
}