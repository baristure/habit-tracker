import axios from "axios";
import Cookies from "js-cookie";

let cookie = Cookies.get("auth-jwt");
if (cookie) cookie = JSON.parse(cookie);

const habitApi = {
  addHabit: async (email, content, dates) => {
    const response = await axios
      .post("http://localhost:4000/api/habit/add", { email, content, dates })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    return response;
  },
  getHabit: async (habitID) => {
    if (cookie) {
      console.log("girdi");
      const response = await axios
        .get("http://localhost:4000/api/habit/get/" + habitID, {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      return response;
    }
  },
  getAllHabits: async (userId) => {
    if (cookie) {
      const response = await axios
        .get(`http://localhost:4000/api/habit/get/all/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.token}`,
          },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      return response;
    }
  },
  deleteHabit: async (email, username, password) => {
    const response = await axios
      .post("http://localhost:4000/api/habit/register", {
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

export default habitApi;
