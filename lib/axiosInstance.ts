import axios from "axios";

// export const BASE_URL = "https://technoshop-backend-vmit.onrender.com/api/v1";
export const BASE_URL = "http://localhost:3000/api/v1";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
