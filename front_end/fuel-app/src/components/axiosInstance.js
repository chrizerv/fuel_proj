import axios from "axios";



export const axiosInstance = axios.create({
 baseURL: 'http://94.67.168.74:5000'
});

axiosInstance.interceptors.response.use(response => {
 return response;
}, error => {
 throw error;
});