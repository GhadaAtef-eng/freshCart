import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { PacmanLoader } from "react-spinners";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { tokenContext } from "../../Context/tokenContext";

// ghada@mail.com
// Test123

export default function ForgetPssword() {
  let { setToken } = useContext(tokenContext);

  let navigate = useNavigate();

  useEffect(() => {}, []);
  let [isCallingApi, setIsCallingApi] = useState(false);
  let [apiError, setApiError] = useState(null);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("invalid email").required("required"),
  });

  const forgetForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: callforget,

  });

  async function callforget(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      console.log(data,'ggggggggggggggg');

      navigate("/verifycode" , { state: { email: values.email } });

      setToken(data.token);
      setIsCallingApi(false);
    } catch (error) {
      setApiError(error.response.data.message);
      setIsCallingApi(false);
    }
  }

  return (
    <>
      <form onSubmit={forgetForm.handleSubmit} className="w-1/2 mx-auto my-20">
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

        <h1 className="py-6 text-3xl text-textMain dark:text-gray-200">
          Enter your email:{" "}
        </h1>
        {/* email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-1 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 dark:placeholder-gray-400 focus:border-main peer"
            placeholder="  "
            value={forgetForm.values.email}
            onChange={forgetForm.handleChange}
            required
            onBlur={forgetForm.handleBlur}
          />
          <label
            htmlFor="email"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-5 peer-focus:-translate-y-8"
          >
            Enter your Email address
          </label>

          {/* // errors */}
          {forgetForm.errors.email && forgetForm.touched.email ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{forgetForm.errors.email}</span>
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
              Verify
            </button>
          </div>
        )}
      </form>
    </>
  );


}
