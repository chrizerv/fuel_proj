import axios from "axios";



export const axiosInstance = axios.create({
 baseURL: 'http://192.168.1.8:5000'
});

axiosInstance.interceptors.response.use(response => {
 return response;
}, error => {
 throw error;
});