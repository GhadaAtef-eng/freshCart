import styles from "./CheckOut.module.css";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PacmanLoader } from "react-spinners";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import { Link } from "react-router-dom";

export default function CheckOut() {
  useEffect(() => {}, []);
  let [isCallingApi, setIsCallingApi] = useState(false);
  let [apiError, setApiError] = useState(null);
  let [isOnline, setIsOnline] = useState(false);

  let { cashOnDelivery, onlinePayment } = useContext(cartContext);
  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object().shape({
    details: Yup.string().required("required"),
    phone: Yup.string()
      .matches(new RegExp("^01[0125][0-9]{8}$"), "Invalid Phone number")
      .required("required"),
    city: Yup.string().required("required"),
  });

  const shippingForm = useFormik({
    initialValues,
    validationSchema,

    onSubmit: callPayment,
  });

  async function callPayment(values) {
    console.log(isOnline);

    try {
      setIsCallingApi(true);
      if (isOnline) {
        let x = await onlinePayment(values);
        console.log(x);
        window.location.href = x.session.url;
        setIsCallingApi(false);
      } else {
        let x = await cashOnDelivery(values);
        console.log(x);
        setIsCallingApi(false);
      }
      // console.log(values);
    } catch (error) {}
  }

  return (
    <>
      <form
        onSubmit={shippingForm.handleSubmit}
        className="w-1/2 mx-auto py-28"
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

        <h1 className="py-6 text-3xl text-textMain">Payment Info: </h1>
        {/* details */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-1 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 dark:placeholder-gray-400 focus:border-main peer"
            placeholder="  "
            value={shippingForm.values.details}
            onChange={shippingForm.handleChange}
            required
            onBlur={shippingForm.handleBlur}
          />
          <label
            htmlFor="details"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-5 peer-focus:-translate-y-8"
          >
            Name
          </label>

          {/* // errors */}
          {shippingForm.errors.details && shippingForm.touched.details ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{shippingForm.errors.details}</span>
            </div>
          ) : null}
        </div>

        {/*phone*/}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-1 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 dark:placeholder-gray-400 focus:border-main peer"
            placeholder="  "
            value={shippingForm.values.phone}
            onChange={shippingForm.handleChange}
            required
            onBlur={shippingForm.handleBlur}
          />
          <label
            htmlFor="phone"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-5 peer-focus:-translate-y-8"
          >
            phone
          </label>

          {/* errors */}
          {shippingForm.errors.phone && shippingForm.touched.phone ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{shippingForm.errors.phone}</span>
            </div>
          ) : null}
        </div>

        {/* city */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            className="block p-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-1 rounded-lg appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 dark:placeholder-gray-400 focus:border-main peer"
            placeholder="  "
            value={shippingForm.values.city}
            onChange={shippingForm.handleChange}
            required
            onBlur={shippingForm.handleBlur}
          />
          <label
            htmlFor="city"
            className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-5 peer-focus:-translate-y-8"
          >
            city
          </label>

          {/* // errors */}
          {shippingForm.errors.city && shippingForm.touched.city ? (
            <div
              className="p-2 mb-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span classname="font-medium">{shippingForm.errors.city}</span>
            </div>
          ) : null}
        </div>

        {/* online Payment  */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="checkbox"
            value={"online"}
            onChange={() => setIsOnline(true)}
          />
          <label htmlFor="" className="mx-3">
            Online Payment{" "}
          </label>
        </div>

        {isCallingApi ? (
          <div classname="w-auto flex justify-end items-end">
            <div classname=" bg-slate-500 rounded-md p-2">
              <PacmanLoader size="15px" color="#0aad0a" />
            </div>
          </div>
        ) : (
          <div classname="w-auto flex justify-end items-end">
            <button
              disabled={isCallingApi}
              type="submit"
              className="block bg-main text-white hover:text hover:bg-transparent bg-opacity-80 focus:ring-2 focus:outline-none border-2 border-main focus:ring-main font-medium rounded-lg text-sm  px-5 ml-auto p-2.5 text-center dark:bg-main dark:hover:bg-transparent dark:focus:ring-main"
            >
              Pay Now
            </button>
            <Link className="text-main" to={"/allOrders"}>
              See your orders ?
            </Link>
          </div>
        )}
      </form>
    </>
  );
}
