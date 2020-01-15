import axios from 'axios'

const instance = axios.create({
    // Firebase URL is defined by EXPORT REACT_APP_FIREBASE=api_url on system
    // Use this syntax: export REACT_APP_FIREBASE='url'
    // Then run the npm start command from the same terminal where export was defined
    baseURL: process.env.REACT_APP_FIREBASE
})

// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log(config)
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });

export default instance;