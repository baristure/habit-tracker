import axios from "axios";
import Cookies from "js-cookie";

let cookie = Cookies.get("auth-jwt");
if (cookie) cookie = JSON.parse(cookie);

const habitApi = {
  addHabit: async (userId, content) => {
    if (cookie) {
      const response = await axios
        .post(
          "http://localhost:4000/api/habit/add",
          { userId, content },
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      return response;
    } else {
      return { data: { code: 401, message: "Please login again!" } };
    }
  },
  getHabit: async (habitID) => {
    if (cookie) {
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
    } else {
      return { data: { code: 401, message: "Please login again!" } };
    }
  },
  markHabit: async (habitId, dateObj) => {
    if (cookie) {
      const response = await axios
        .post(
          "http://localhost:4000/api/habit/mark/",
          { habitId, dateObj },
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      return response;
    } else {
      return { data: { code: 401, message: "Please login again!" } };
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
    } else {
      return { data: { code: 401, message: "Please login again!" } };
    }
  },
  deleteHabit: async (email, username, password) => {
    if (cookie) {
      const response = await axios
        .post(
          "http://localhost:4000/api/habit/register",
          {
            email,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        )
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      return response;
    } else {
      return { data: { code: 401, message: "Please login again!" } };
    }
  },
};

export default habitApi;
