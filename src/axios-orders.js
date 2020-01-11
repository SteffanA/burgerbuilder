import axios from 'axios'

const instance = axios.create({
    // Firebase URL is defined by EXPORT REACT_APP_FIREBASE=api_url on system
    baseURL: process.env.REACT_APP_FIREBASE
})

export default instance;