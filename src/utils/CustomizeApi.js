import axios from "axios";
import { store } from "../Store/store";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/',
    withCredentials: true,
    // headers: {
    //     "Content-Type": 'application/json',
    // }
});


instance.interceptors.request.use(function (config) {
    const token = store.getState().user?.user?.token
    const tokenAdmin = store.getState().admin?.admin?.token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    } else if (tokenAdmin) {
        config.headers['Authorization'] = `Bearer ${tokenAdmin}`
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
});

export default instance;