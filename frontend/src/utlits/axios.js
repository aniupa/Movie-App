import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_INSTANCE_BASE_URL,
  withCredentials: true
});

export default instance;
