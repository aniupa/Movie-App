import axios from 'axios'
export const instance = axios.create({
  baseURL: import.meta.env.VITE_instance_BASE_URL,
  
  // baseURL: 'http://localhost:3000/api',
  headers: {'X-Custom-Header': 'foobar'}
});

export default instance
