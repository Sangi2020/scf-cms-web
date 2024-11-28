import axios from 'axios';

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://scf-cms-be-hz4e.onrender.com/api/v1/admin',
});

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080/api/v1/admin',
// });

// Add a request interceptor to include token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');

    // Only add the Authorization header if the token exists
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