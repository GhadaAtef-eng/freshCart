import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import NotFound from "./components/NotFound/NotFound";
import { tokenContext } from "./Context/tokenContext";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import { AuthView } from "./components/AuthView/AuthView";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import CheckOut from "./components/CheckOut/CheckOut";
import AllOrders from "./components/AllOrders/AllOrders";
import WishList from "./components/WishList/WishList";
import ForgetPssword from "./components/ForgetPssword/ForgetPssword";
import NewPassword from "./components/NewPassword/NewPassword";
import VerifyCode from "./components/VerifyCode/VerifyCode";

function App() {
  let { setToken } = useContext(tokenContext);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  const routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoutes>
              <Home />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wish",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <AuthView>
              <Register />{" "}
            </AuthView>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthView>
              <Login />
            </AuthView>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders/>
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <AuthView>
              <Login />
            </AuthView>
          ),
        },
        {
          path: "forgetPassword",
          element: (
            <AuthView>
              <ForgetPssword />
            </AuthView>
          ),
        },
        {
          path: "newpassword",
          element: (
            <AuthView>
              <NewPassword />
            </AuthView>
          ),
        },
        {
          path: "verifycode",
          element: (
            <AuthView>
              <VerifyCode />
            </AuthView>
          ),
        },
        {
          path: "productDetails/:id/:categoryId",
          element: (
            <ProtectedRoutes>
              <ProductDetails />{" "}
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
