import React, { useContext, useEffect, useState } from "react";
import styles from "./WishList.module.css";
import { cartContext } from "../../Context/cartContext";
import Cart from "../Cart/Cart";
import Loader from "../Shared/Loader/Loader";
import { Link } from "react-router-dom";

export default function WishList() {
  const { wishDetails, removeWish } = useContext(cartContext);

  if (!wishDetails) {
    return <Loader />;
  }

  async function deleteWish(id) {
    let data = await removeWish(id);
  }

  useEffect(() => {
    console.log(wishDetails);
  }, [wishDetails]);

  return (
    <>
      <div className="pt-[20px] w-[90%] mx-auto ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-1">
            Total Product number:{" "}
            <span className="text-main">{wishDetails?.count}</span>
          </h2>
        </div>
        {wishDetails ? (
          wishDetails?.data?.length === 0 ? (
            <h1 className="text-4xl text-center p-14"> Empty Cart</h1>
          ) : (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishDetails.data.map((wish) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-4">
                        <img
                          src={wish.imageCover}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={wish.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {wish.title}
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {wish.price} EGP
                      </td>
                      <td className="px-6 py-4">
                        <span
                          onClick={() => {
                            deleteWish(wish._id);
                          }}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <Loader />
        )}
        <Link
          to={"/checkout"}
          className="inline-block bg-main text-white hover:text-main hover:bg-transparent bg-opacity-80 focus:ring-2 focus:outline-none border-2 border-main focus:ring-main font-medium rounded-lg text-sm  px-5 ml-auto p-2.5 text-center dark:hover:text-main dark:bg-main dark:hover:bg-transparent dark:focus:ring-main my-5"
        >
          Check Out
        </Link>
      </div>
    </>
  );
}
