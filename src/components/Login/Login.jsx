import React, { useEffect, useState } from "react";

import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { tokenContext } from "../../Context/tokenContext";
import ForgetPssword from "../ForgetPssword/ForgetPssword";

// ghada@mail.com
// Test123

export default function Login() {
  const [count, setCount] = useState(0);
  let { setToken } = useContext(tokenContext);

  let navigate = useNavigate();

  useEffect(() => {}, []);
  let [isCallingApi, setIsCallingApi] = useState(false);
  let [apiError, setApiError] = useState(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
    password: Yup.string()
      .matches(new RegExp("^[A-Z][a-z0-9]{6,8}$"), "Invalid Password , password must be starting with capital letter, numbers with Max.= 8")
      .required("required"),
  });

  const loginForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: callLogin,
  });

  async function callLogin(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      navigate("/home");

      localStorage.setItem("userToken", data.token);
      setToken(data.token);

      console.log(data);
      setIsCallingApi(false);
    } catch (error) {
      setApiError(error.response.data.message);
      setIsCallingApi(false);
    }
  }

  return (
    <>
      <form onSubmit={loginForm.handleSubmit} className="w-72 md:w-1/2 mx-auto my-20">
        <div>
          {apiError ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          ) : (
            ""
          )}
        </div>

        <h1 className="py-6 text-3xl text-textMain">SignIn Now : </h1>
        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-1 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 dark:placeholder-gray-400 focus:border-main peer"
            placeholder="  "
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            required
            onBlur={loginForm.handleBlur}
          />
          <label
            htmlFor="email"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-5 peer-focus:-translate-y-8"
          >
            Email ..
          </label>

          {/* // errors */}
          {loginForm.errors.email && loginForm.touched.email ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{loginForm.errors.email}</span>
            </div>
          ) : null}
        </div>

        {/* password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            required
            onBlur={loginForm.handleBlur}
          />
          <label
            htmlFor="password"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Password
          </label>

          {/* // errors */}
          {loginForm.errors.password && loginForm.touched.password ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{loginForm.errors.password}</span>
            </div>
          ) : null}
        </div>

        {isCallingApi ? (
          <div classname="w-auto flex justify-end items-end">
            <div classname=" bg-slate-500 rounded-md p-2">
              <PacmanLoader size="15px" color="#0aad0a" />
            </div>
          </div>
        ) : (
          <div className="flex justify-around">
            <button
              disabled={isCallingApi}
              type="submit"
              className="block bg-main text-white hover:text-main hover:bg-transparent bg-opacity-80 focus:ring-2 focus:outline-none border-2 border-main focus:ring-main font-medium rounded-lg text-sm  px-5 ml-auto p-2.5 text-center  dark:text-white  dark:hover:bg-transparent dark:focus:ring-main"
            >
              SignIn
            </button>

            <Link
              to={"/forgetPassword"}
              className="block bg-main text-white hover:text-main hover:bg-transparent bg-opacity-80 focus:ring-2 focus:outline-none border-2 border-main focus:ring-main font-medium rounded-lg text-sm  px-5 ml-auto p-2.5 text-center dark:text-white  dark:hover:bg-transparent dark:hover:bg-main dark:focus:ring-main"
            >
              Foget Password ?
            </Link>
          </div>
        )}
      </form>
    </>
  );
}
