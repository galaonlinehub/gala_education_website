// //APP SETTINGS

// import axios from 'axios';

// export const api = axios.create({
//   baseURL:'https://galaweb.galahub.org/api',
//   headers: {
//     'Content-Type': 'application/json',
    
//   },
// });


// import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'https://galaweb.galahub.org/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // List of public endpoints
// const publicEndpoints = ['/auth/login', '/auth/signup'];

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Check if the endpoint is public
//     const isPublic = publicEndpoints.some((endpoint) => config.url.includes(endpoint));

//     if (!isPublic) {
//       const token = localStorage.getItem('authToken'); // Replace with your token storage logic
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }

//     return config;
//   },
//   (error) => {
//     console.error('Request Interceptor Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Successful response
//     return response;
//   },
//   (error) => {
//     console.error('Response Interceptor Error:', error);

//     if (error.response?.status === 401) {
//       // Handle unauthorized access
//       console.warn('Unauthorized! Redirecting to login...');
//       window.location.href = '/login'; // Update with your logic
//     }

//     return Promise.reject(error);
//   }
// );

// // Helper methods for GET and POST
// export const apiGet = async (endpoint, headers = {}) => {
//   try {
//     const response = await api.get(endpoint, { headers });
//     return response.data;
//   } catch (error) {
//     console.error(`GET ${endpoint} Error:`, error);
//     throw error;
//   }
// };

// export const apiPost = async (endpoint, data, headers = {}) => {
//   try {
//     const response = await api.post(endpoint, data, { headers });
//     return response.data;
//   } catch (error) {
//     console.error(`POST ${endpoint} Error:`, error);
//     throw error;
//   }
// };
