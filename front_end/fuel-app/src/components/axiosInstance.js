import axios from "axios";



export const axiosInstance = axios.create({
 baseURL: 'https://2ba9956748c9.ngrok.io'
});

axiosInstance.interceptors.response.use(response => {
 return response;
}, error => {
 throw error;
});