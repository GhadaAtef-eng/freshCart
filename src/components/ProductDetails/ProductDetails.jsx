import React, { useContext, useEffect, useState } from "react";

import styles from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./components/RelatedProduct/RelatedProduct";
import Slider from "react-slick";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../../Context/cartContext";
import { toast } from "react-toastify";

export default function ProductDetails() {
  let { id, categoryId } = useParams();

  let { addToCart , addToWishList, getWish } = useContext(cartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function addProductToCart(id) {
    let data = await addToCart(id);

    if (data.status == "success") {
      toast("Product added to cart Successfully", {
        theme: "dark",
        type: "success",
        position: "bottom-right",
      });
    }
  }

  const [details, setProductDetails] = useState(null);

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({ data }) => {
        setProductDetails(data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  
  async function wishItem(id) {
    let data = await addToWishList(id);

  if (data.status == "success") {
       toast.success("Product added to  Wish list Successfully", {
         theme: "colored",
         type: "success",
         position: "top-right",
       });
       getWish()
       
     }
  }

  return (
    <>
      {details && (
        <div className="mainLayout py-10 items-center w-[80%] mx-auto dark:border-gray-800 dark:border-2 dark:p-10">
          <div className="md:w-1/4 xs:w-[100px] w-[300px] md:pe-10 py-3 mx-auto ">
            <Slider {...settings}>
              {details?.images.map((src) => (
                <img src={src} alt="" />
              ))}
            </Slider>
          </div>
          <div className="md:w-3/4">
            <h1 className="text-main font-bold">{details.title}</h1>
            <p>{details?.description}</p>
            <span>{details?.category?.name}</span>
            <div className="flex justify-between">
              <p>{details?.price} EGP</p>
              <p>
                <span className="px-1 text-red-800">
                <button onClick={() =>{ wishItem(details.id)}} >
                    <i class="fa-solid fa-heart px-2"></i>
                  </button>
                  <i class="fa-solid fa-star rating-color "></i>
                </span>
                {details?.ratingsAverage}
              </p>
            </div>

            <button
              onClick={() => {
                addProductToCart(details.id);
              }}
              className="btn bg-main text-center rounded-lg text-white p-2 w-full my-3"
            >
              + Add to cart
            </button>
          </div>
        </div>
      )}
      {!details && <Loader />}
      {/* <RelatedProduct categoryId={categoryId} id={id} /> */}
    </>
  );
}
