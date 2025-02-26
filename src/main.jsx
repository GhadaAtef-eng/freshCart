import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import CouterContextProvider from "./Context/counterContext.jsx";
import TokenContextProvider from "./Context/tokenContext.jsx";
// react slick slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./Context/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <CouterContextProvider>
          <App />
        </CouterContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
