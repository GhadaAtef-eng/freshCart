import React, { useEffect, useState } from "react";

import styles from "./RecentProducts.module.css";
import axios from "axios";
import { data } from "react-router-dom";
import ProductItem from "../../../Shared/ProductItem/ProductItem";
import Loader from "../../../Shared/Loader/Loader";
import { useContext } from "react";
import { cartContext } from "../../../../Context/cartContext";
import { toast } from "react-toastify";
import { theme } from "flowbite-react";

export default function RecentProducts() {
  const [count, setCount] = useState(0);
  let [products, setProducts] = useState([]);
  let { addToCart, addToWishList } = useContext(cartContext);

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        // console.log(data);

        setProducts(data.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getProducts();
  });

  async function addProductToCart(id) {
    let data = await addToCart(id);

    if (data.status == "success") {
      toast.success("Product added to cart Successfully", {
        theme: "dark",
        type: "success",
        position: "bottom-right",
      });
    }
  }

  async function wishItem(id) {
    let data = await addToWishList(id);
    console.log(data, "wishitem");

    if (data.status == "success") {
      toast.success("Product added to  Wish list Successfully", {
        theme: "colored",
        type: "success",
        position: "top-right",
      });
    
    }
  }

  return (
    <>
      {products.length !== 0 && (
        <div className="w-[90%] m-auto mainLayout mb-10">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              addProductToCart={addProductToCart}
              wishItem={wishItem}
            />
          ))}
        </div>
      )}

      {products.length == 0 && <Loader />}
    </>
  );
}
