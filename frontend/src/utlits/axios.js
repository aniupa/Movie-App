import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_instance_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.response.use(function (response) {
   console.log('response -->',response);
   
    return response;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;
