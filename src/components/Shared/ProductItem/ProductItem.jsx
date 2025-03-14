import React, { useEffect, useState } from "react";

import styles from "./ProductItem.module.css";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  let { imageCover, category, title, price, ratingsAverage, id } =
    props.product;

  return (
    <>
      <div className="lg:w-1/4 p-3 w-2/4 mb-3 hover:shadow-lg hover:shadow-main hover:duration-1000 ">
        <div className="product">
          <Link to={`/productDetails/${id}/${category._id}`}>
            <img src={imageCover} alt="" />
            <span className="text-main mt-2">{category.name}</span>
            <h2 className="mb-4 font-bold">
              {title.split(" ").splice(0, 2).join(" ")}
            </h2>
          </Link>
          <div className="flex justify-between">
            <p>{price} EGP</p>
            <p>
              <span className=" px-1">
                <button
                  onClick={() => {
                    props.wishItem(id);
                    className='text-red-800'
                  }}
                >
                  <i class="fa-solid fa-heart px-2"></i>
                </button>
                <i class="fa-solid fa-star rating-color "></i>
              </span>
              {ratingsAverage}
            </p>
          </div>
          <button
            onClick={() => {
              props.addProductToCart(id);
            }}
            className=" btn bg-main text-center rounded-lg text-white p-2 w-full my-2"
          >
            + Add to cart
          </button>
        </div>
      </div>
    </>
  );
}


// md:hover:translate-y-full md:opacity-0 md:hover:transition-all md:hover:opacity-100 sm:opacity-100