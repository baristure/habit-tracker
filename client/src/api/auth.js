import axios from "axios";

const authApi = {
  login: async (username, password) => {
    const response = await axios
      .post("http://localhost:4000/api/auth/login", { username, password })
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  },
  register: async (user) => {
    const response = await axios
      .post("http://localhost:4000/api/auth/register", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    return response;
  },
};

export default authApi;
