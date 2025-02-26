import React, { useEffect, useState } from "react";

import styles from "./AllOrders.module.css";
import Home from "../Home/Home";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import { tokenContext } from "../../Context/tokenContext";
import { jwtDecode } from "jwt-decode";
import { Modal } from "flowbite";

export default function AllOrders() {
  const [count, setCount] = useState(0);
  let { getUserOrders } = useContext(cartContext);
  let { token } = useContext(tokenContext);
  let [orders, setOrders] = useState([]);
  let [selectedItems, setselectedItems] = useState([]);
  // set the modal menu element
  const $targetEl = document.getElementById("modalEl");

  console.log($targetEl);

  // options with default values
  const options = {
    placement: "bottom-right",
    backdrop: "dynamic",
    backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
    closable: true,
    onHide: () => {
      console.log("modal is hidden");
    },
    onShow: () => {
      console.log("modal is shown");
    },
    onToggle: () => {
      console.log("modal has been toggled");
    },
  };

  // instance options object
  const instanceOptions = {
    id: "modalEl",
    override: true,
  };

  const modal = new Modal($targetEl, options, instanceOptions);
  function openModal(items) {
    console.log(items);
    setselectedItems(items);
    modal.show();
  }
  function hideModal() {
    modal.hide();
  }

  function getId() {
    let decoded = jwtDecode(token);
    console.log(decoded, "gggggggggggggggg");
    getOrders(decoded.id);
  }
  async function getOrders(id) {
    let data = await getUserOrders(id);
    console.log(data);
    setOrders(data);
  }

  useEffect(() => {
    token && getId();
  }, [token]);

  return (
    <>
      <div className="w-[90%] mx-auto my-10 shadow-md">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-main uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Is Paid
                </th>
                <th scope="col" className="px-6 py-3">
                  payment Method Type
                </th>
                <th scope="col" className="px-6 py-3">
                  total Order Price
                </th>
                <th scope="col" className="px-6 py-3">
                  View Details
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.id}
                  </th>
                  <td className="px-6 py-4">
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </td>
                  <td className="px-6 py-4">{order.paymentMethodType}</td>
                  <td className="px-6 py-4"> EGP {order.totalOrderPrice}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openModal(order.cartItems)}
                      class="block text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-main dark:hover:bg-green-700 dark:focus:ring-green-800"
                      type="button"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}

              <div>
                {/* Main modal */}
                <div
                  id="modalEl"
                  data-modal-backdrop="static"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div className="relative p-4  max-w-2xl max-h-full">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                      {/* Modal header */}
                      <div className="flex items-center justify-between p-2  border-b rounded-t dark:border-gray-600 border-gray-500 mt-28">
                        <h3 className="text-xl font-semibold text-ma dark:text-white">
                          Cart Items
                        </h3>
                        <button
                          type="button"
                          onClick={hideModal}
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="static-modal"
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* Modal body */}
                      <div className="p-4 md:p-5 space-y-4">
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
                                  Qty
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Price
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedItems.map((product) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="p-4">
                                    <img
                                      src={product.product.imageCover}
                                      className="w-16 md:w-32 max-w-full max-h-full"
                                      alt={product.product.title}
                                    />
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.product.title}
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center">
                                      <div>
                                        <span>{product.count}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.price} EGP
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
