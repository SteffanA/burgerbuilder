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
                dispatch(authSuccess(response.data.idToken, response.data.localId))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}