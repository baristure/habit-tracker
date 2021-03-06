/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import {
  authSelector,
  clearState,
  loginUser,
} from "../../store/slices/authSlice";
import Navbar from "../components/Navbar";
const Login = ({ testSubmit }) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  // if (!auth) {
  //   dispatch(clearState());
  // }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(authSelector);

  const onSubmit = (data) => {
    if (testSubmit) {
      testSubmit();
    } else {
      dispatch(loginUser(data));
    }
  };

  useEffect(() => {
    if (!auth) dispatch(clearState());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }
    if (isSuccess) {
      toast.success("You Have Successfully Logged in. Redirecting to homepage");
      setTimeout(() => {
        return <Redirect push to="/" />;
      }, 2000);
    }
  }, [isError, isSuccess]);

  if (auth) {
    return <Redirect to="/" />;
  } else {
    return (
      <>
        <Navbar />
        <Toaster />
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center  sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h1 className=" text-center text-3xl font-extrabold text-gray-900">
              Login into your account
            </h1>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form
                data-testid="login-form"
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      {...register("username", {
                        required: true,
                        minLength: 4,
                        maxLength: 20,
                      })}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.username?.type === "required" &&
                      "Username can not be blank"}
                    {errors.username?.type === "minLength" &&
                      "Username should longer than 4 characters"}
                    {errors.username?.type === "maxLength" &&
                      "Username is no more than 20 characters"}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      {...register("password", { required: true })}
                      autoComplete="current-password"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.password?.type === "required" &&
                      "Password can not be blank"}
                  </div>
                </div>

                <div>
                  <button
                    data-testid="form-submit-button"
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isFetching ? (
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or <Link to="register"> Register</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Login;
