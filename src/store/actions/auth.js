import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const auth = (email, password) => {
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
        const apiKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_APIKEY
        // apiKey = apiKey.concat(process.env.REACT_APP_APIKEY)
        // console.log(apiKey)
        // console.log("api key is ", process.env.REACT_APP_APIKEY)
        axios.post(apiKey, authData)
            .then(response => {
                console.log(response)
                dispatch(authSuccess(response.data))
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err))
            })
    }
}