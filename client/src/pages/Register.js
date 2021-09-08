import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { register, login } from "../api/auth";

import { useHistory } from "react-router-dom";

const Register = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  let user = {
    username: "bbariss",
    password: "123126aB",
  };
  // const res = login(user).then((response) => {
  //   Cookies.set("jwt", response);
  // });

  return (
    <div>
      <h1>Register</h1>
    </div>
  );
};

export default Register;
