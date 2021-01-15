import axios from "axios";



export const axiosInstance = axios.create({
 baseURL: 'http://localhost:5000',
 timeout: 1000,
});

axiosInstance.interceptors.response.use(response => {
 return response;
}, error => {
 if (error.response.status === 401) {
  //place your reentry code
  return "Unauthenticated"
 }
 return "WRONG";
});