import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL
const subURL = import.meta.env.VITE_API_SUB_URL

const axiosInstance = axios.create({
  baseURL: baseURL + subURL, 
});


axiosInstance.interceptors.request.use(
  (config) => {

    let userData = JSON.parse(localStorage.getItem('user'));
    

    if (!userData) {
      userData = JSON.parse(sessionStorage.getItem('user'));
    }

    if (userData && userData.token) {
      config.headers['Authorization'] = `Bearer ${userData.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
