import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://scf-cms-be-hz4e.onrender.com/api/v1/admin',
});

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api/v1/admin',
// });

// Add a request interceptor to include token from either localStorage or sessionStorage
axiosInstance.interceptors.request.use(
  (config) => {
    // Try to get the token from localStorage first
    let token = localStorage.getItem('token');
    
    // If not found in localStorage, try sessionStorage
    if (!token) {
      token = sessionStorage.getItem('token');
    }

    // Add the Authorization header if the token exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;