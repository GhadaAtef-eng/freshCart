import React, { useContext, useEffect, useState } from "react";

import styles from "./NavBar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
import { counterContext } from "../../Context/counterContext";
import { tokenContext } from "../../Context/tokenContext";
import { cartContext } from "../../Context/cartContext";
 

export default function NavBar() {
  // let {count} = useContext(counterContext);
  // console.log(count);
  let { token, setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  let { numOfCartItems, wishCount } = useContext(cartContext);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", darkMode);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("darkMode");
    }
  }, [darkMode]);

  function logOut() {
    // 1- remove localstorage
    localStorage.removeItem("userToken");
    // 2- set token = null
    setToken(null);
    // 3- navigate to login
    navigate("/login");
  }

  return (
    <>
      <div className="pb-28">
        <nav className="bg-background  border-gray-200 dark:bg-gray-900 fixed end-0 start-0 z-[9999]">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex items-center gap-3">
              <a className="flex items-center dark:bg-white dark:p-1 dark:rounded-md  space-x-3 rtl:space-x-reverse">
                <img src={logo} alt="logo freshcart" className="w-[200px]" />
              </a>

              <div
                className="hidden w-full md:block md:w-auto top-10 left-0 absolute md:relative md:top-0"
                id="navbar-default"
              >
                {token ? (
                  <ul className="font-medium bg-white w-full flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-1 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-background dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                      <NavLink
                        to={"home"}
                        className="block py-2 px-3 rounded-md md:hover:bg-main dark:text-white "
                        aria-current="page"
                      >
                        Home
                      </NavLink>
                    </li>
                  
                    <li>
                      <NavLink
                        to={"products"}
                        className="block py-2 px-3 text-gray-900 rounded-md md:border-0  md:hover:bg-main dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"wish"}
                        className="block py-2 px-3 text-gray-900 rounded-md md:border-0  md:hover:bg-main dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Wish List {wishCount}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"categories"}
                        className="block py-2 px-3 text-gray-900 rounded-md md:border-0 md:hover:bg-main  dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"brands"}
                        className="block py-2 px-3 text-gray-900 rounded-md md:border-0  md:hover:bg-main dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      >
                        Brands
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="sm:z-40 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <button className="p-4"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              {darkMode ? (
                <i class="dark:text-main fa-solid fa-sun"></i>
              ) : (
                <i class="dark:text-main fa-solid fa-moon"></i>
              )}
            </button>
            <div className="flex  items-center gap-3">
              {token ? (
                <>
                  <ul className="flex gap-4">
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-tiktok"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa-brands fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </>
              ) : (
                ""
              )}

              <ul className="flex items-center gap-4">
                {token ? (
                   <div className="flex justify-between">
                     <li>
                    <NavLink
                      to={"cart"}
                      className="block py-2 px-3 text-lg text-main hover:text-white rounded-md md:border-0 md:hover:bg-main  dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      <i class="fa-solid fa-cart-plus"></i> {numOfCartItems}
                    </NavLink>
                  </li>
                  <li className="block py-2 px-3 text-gray-900 rounded-md md:border-0 md:hover:bg-main  dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    <span onClick={logOut}>SignOut</span>
                  </li>
                   </div>
                ) : (
                  <>
                    <li>
                      <NavLink
                        className="block py-2 px-3 text-gray-900 rounded-md md:border-0 md:hover:bg-main  dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        to={"register"}
                      >
                        Register
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="block py-2 px-3 text-gray-900 rounded-md md:border-0 md:hover:bg-main  dark:text-white md:dark:hover:text-main dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                        to={"login"}
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
