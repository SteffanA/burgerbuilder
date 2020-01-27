import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const logout = () => {
    // Remove local storage related to auth
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()) {
                // Token still valid.
                // Note we could get the userId via a firebase call instead of local storage
                // with a post request to https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=
                // which will return an object w/ users.localid
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
            }
            else {
                dispatch(logout())
            }
        }
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        // Auth our user
        // Similar to the DB, setup API_KEY as an enviromental variable via
        // export REACT_APP_APIKEY='[api key]'
        // NOTE: Apaprently react requires env variables to be REACT_APP_x,
        // it sanitizes others so they won't appear. Good to know info!
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        }
        const apiKey = url + process.env.REACT_APP_APIKEY
        // apiKey = apiKey.concat(process.env.REACT_APP_APIKEY)
        // console.log(apiKey)
        // console.log("api key is ", process.env.REACT_APP_APIKEY)
        axios.post(apiKey, authData)
            .then(response => {
                console.log(response)
                const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000))
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                // Also dispatch the authTimeout to see if should be logged out
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}