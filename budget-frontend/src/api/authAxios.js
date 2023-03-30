import axios from "axios";
import authHeader from "../services/authHeader";


const authAxios = axios.create({});
authAxios.interceptors.request.use((config) => {
  config.headers.common["Authorization"] = authHeader();
  return config;
});
 
authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
        const response = await axios.get(process.env.REACT_APP_BACKEND_URL + '/refresh', { withCredentials: true})
        if (!response.data.accessToken)  {
          localStorage.clear();
          axios.get(process.env.REACT_APP_BACKEND_URL + '/logout', { withCredentials: true});
          window.location.reload();
        } else {
        localStorage.setItem("token", response.data.accessToken);
        error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
        return axios(error.config);}
    } else {
      return Promise.reject(error);
    }
  }
);
export default authAxios;