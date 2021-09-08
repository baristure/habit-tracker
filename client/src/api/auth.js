import axios from "axios";

const authApi = {
  login: async (username, password) => {
    const response = await axios
      .post("http://localhost:4000/api/auth/login", { username, password })
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
      .post("http://localhost:4000/api/auth/register", {
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
