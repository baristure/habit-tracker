import axios from "axios";
import { apiBaseUrl } from "./apiconfig";
const authApi = {
  login: async (username, password) => {
    const response = await axios
      .post(`${apiBaseUrl}auth/login`, { username, password })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  },
  register: async (email, username, password) => {
    const response = await axios
      .post(`${apiBaseUrl}auth/register`, {
        email,
        username,
        password,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  },
};

export default authApi;
