import axios from "axios";
// Base configuration for axios
const axiosInstance = axios.create({
  baseURL:
    `${process.env.REACT_APP_API_BASE_URL}/api` || "http://localhost:5173/api",
  withCredentials: true, // Important for cookie authentication
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any global request handling here
    console.log("Request Sent To:", config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response Received From:", response.config.url);
    return response;
  },
  (error) => {
    // Handle authentication errors
    console.error("Error Occurred at URL:", error.config?.url);
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Unauthorized - redirect to login
        console.error("Authentication error: Please login again");
        // If you're using React Router, you could use a history object here to redirect
      } else if (status === 403) {
        // Forbidden - user doesn't have necessary permissions
        console.error(
          "Authorization error: You do not have permission to perform this action"
        );
      } else if (status === 500) {
        // Server error
        console.error("Server error: Please try again later");
      }
    } else {
      // Network error or request canceled
      console.error("Network error: Please check your connection");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
