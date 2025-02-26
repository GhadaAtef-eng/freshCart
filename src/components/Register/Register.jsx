import React, { useEffect, useState } from "react";

import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export default function Register() {
  useEffect(() => {}, []);
  let [isCallingApi, setIsCallingApi] = useState(false);
  let [apiError, setApiError] = useState(null);

  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Min legnth is 3")
      .max(15, "Max legnth is 15")
      .required("required"),
    email: Yup.string().email("invalid email:mail@mail.com ").required("required"),
    password: Yup.string()
      .matches(new RegExp("^[A-Z][a-z0-9]{6,8}$"), "Invalid, password must be starting with capital letter, numbers & with Max.= 8")
      .required("required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "repassword must match the password")
      .required("required"),
    phone: Yup.string()
      .matches(new RegExp("^01[0125][0-9]{8}$"), "Invalid Phone number")
      .required("required"),
  });

  const initialValues = {
    name: "Ghada",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const registerForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: callRegister,
  });

  async function callRegister(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      navigate("/login");

      console.log(data);
      setIsCallingApi(false);
    } catch (error) {
      setApiError(error.response.data.message);
      setIsCallingApi(false);
    }
  }

  return (
    <>
      <form
        onSubmit={registerForm.handleSubmit}
        className="w-1/2 mx-auto my-20"
      >
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

        <h1 className="py-6 text-3xl text-textMain">Register Now : </h1>
        <div className="relative w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            required
          />
          <label
            htmlFor="name"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Name
          </label>

          {/* // errors */}
          {registerForm.errors.name && registerForm.touched.name ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{registerForm.errors.name}</span>
            </div>
          ) : null}
        </div>
        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-1 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 dark:placeholder-gray-400 focus:border-main peer"
            placeholder="  "
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            required
            onBlur={registerForm.handleBlur}
          />
          <label
            htmlFor="email"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-5 peer-focus:-translate-y-8"
          >
            Email ..
          </label>

          {/* // errors */}
          {registerForm.errors.email && registerForm.touched.email ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{registerForm.errors.email}</span>
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
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            required
            onBlur={registerForm.handleBlur}
          />
          <label
            htmlFor="password"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Password
          </label>

          {/* // errors */}
          {registerForm.errors.password && registerForm.touched.password ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">
                {registerForm.errors.password}
              </span>
            </div>
          ) : null}
        </div>

        {/* repassword */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            value={registerForm.values.rePassword}
            onChange={registerForm.handleChange}
            required
            onBlur={registerForm.handleBlur}
          />
          <label
            htmlFor="Password"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Re-Password
          </label>

          {/* // errors */}
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">
                {registerForm.errors.rePassword}
              </span>
            </div>
          ) : null}
        </div>

        {/* phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
            placeholder=" "
            value={registerForm.values.phone}
            onChange={registerForm.handleChange}
            required
            onBlur={registerForm.handleBlur}
          />
          <label
            htmlFor="phone"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Phone number
          </label>

          {/* // errors */}
          {registerForm.errors.phone && registerForm.touched.phone ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{registerForm.errors.phone}</span>
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
          <button
            disabled={isCallingApi}
            type="submit"
            className="block bg-main text-white hover:text-main hover:bg-transparent bg-opacity-80 focus:ring-2 focus:outline-none border-2 border-main focus:ring-main font-medium rounded-lg text-sm  px-5 ml-auto p-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
          >
            Register
          </button>
        )}
      </form>
    </>
  );
}
