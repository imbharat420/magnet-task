import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});



api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // store.dispatch({ type: "LOGOUT" });
    }
    return Promise.reject(err);
  }
);

export default api;