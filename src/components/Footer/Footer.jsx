import React, { useEffect, useState } from "react";

import styles from "./Footer.module.css";

export default function Footer() {
  const [count, setCount] = useState(0);

  return (
    <>
      <footer className="bg-background w-full p-6 dark:bg-gray-900 dark:text-white dark:border-gray-800 border-t-2">
        <div className="container">
          <h2 className="text-textMain text-3xl dark:text-gray-300">Get the FreshCart App</h2>
          <p className="text-[#828A90] py-4">
            {" "}
            We will send you a link, open it on your phone to download the app
          </p>
          <div className="flex mb-5">
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block grow p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
              placeholder="Email .."
              required
            />
            <button className="bg-main text-white px-6 rounded-md ms-2 ">
              Share App Link
            </button>
          </div>

          <div className="partner flex justify-between py-6 border-y-2 text-textMain dark:text-gray-300">
            <div className="payment">
              <p>Payment Partners</p>
            </div>
            <div className="app">
              <p> Git deliveries with FreshCart</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
