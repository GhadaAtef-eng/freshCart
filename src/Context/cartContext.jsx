import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [cartId, setCartId] = useState("");
  const { token } = useContext(tokenContext);
  const [cartDetails, setCartDetails] = useState("");
  const [wishDetails, setWishDetails] = useState("");

  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const ORder_API_URL = "https://ecommerce.routemisr.com/api/v1/orders";
  const Wish_URL = `https://ecommerce.routemisr.com/api/v1/wishlist`;

  const headers = {
    token,
  };

  //cart
  useEffect(() => {
    token && getCart();
  }, [token]);

  //wish
  useEffect(() => {
    token && getWish();
  }, [token]);

  async function addToCart(productId) {
    const { data } = await axios.post(API_URL, { productId }, { headers });
    // console.log(data);

    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
    }

    setCartId(data.cartId);
    setCartDetails(data);
    getCart();
    return data;
  }

  //wish
  async function addToWishList(productId) {
    const { data } = await axios.post(Wish_URL, { productId }, { headers });
    setWishCount(data.count);
    getWish();
    return data;
  }

  async function getCart() {
    const { data } = await axios.get(API_URL, { headers });

    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
    }

    setCartId(data.cartId);
    setCartDetails(data);
    return data;
  }

  //wish
  async function getWish() {
    const { data } = await axios.get(Wish_URL, { headers });

    if (data.status == "success") {
      setWishCount(data.count);
    }

    setCartId(data.cartId);
    setWishDetails(data);

    return data;
  }

  async function removeWish(id) {
    const { data } = await axios.delete(`${Wish_URL}/${id}`, { headers });

    if (data.status == "success") {
      setWishCount(data.count);
      getWish();
    }

    setWishDetails(data);

    return data;
  }

  async function removeProduct(id) {
    const { data } = await axios.delete(`${API_URL}/${id}`, { headers });
    console.log(data);

    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
    }

    setCartDetails(data);

    console.log(data);
    return data;
  }

  async function updateCount(id, count) {
    const { data } = await axios.put(
      `${API_URL}/${id}`,
      { count },
      { headers }
    );
    console.log(data);

    if (data.status == "success") {
      setNumOfCartItems(data.numOfCartItems);
    }
    setCartDetails(data);

    return data;
  }

  // checkOut
  async function cashOnDelivery(shippingAddress) {
    const { data } = await axios.post(
      `${ORder_API_URL}/${cartId}`,
      { shippingAddress },
      { headers }
    );

    if (data.status == "success") {
      toast.success("You ordered Successfully", {
        theme: "light",
        type: "success",
        position: "top-right",
      });
      getCart();
    }
    return data;
  }

  // Online payment
  async function onlinePayment(shippingAddress) {
    const { data } = await axios.post(
      `${ORder_API_URL}/checkout-session/${cartId}?url=https://fresh-cart-sigma-six.vercel.app/allOrders`,
      { shippingAddress },
      { headers }
    );

    return data;
  }

  // get all orders
  async function getUserOrders(userId) {
    const { data } = await axios.get(`${ORder_API_URL}/user/${userId}`);
    return data;
  }

  return (
    <cartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        cartDetails,
        removeProduct,
        updateCount,
        cashOnDelivery,
        onlinePayment,
        getUserOrders,
        addToWishList,
        wishCount,
        setWishCount,
        getWish,
        wishDetails,
        removeWish,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
