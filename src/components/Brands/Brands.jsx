import React, { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import axios from "axios";

export default function Brands(props) {
  const [brands, setBrands] = useState([]);

  async function getBrands() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/Brands`
      );

      setBrands(data.data);
    } catch (err) {}
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <div>
        <div className="mainLayout w-[90%] mx-auto  mb-10  ">
          {brands.map((brand) => (
            <div className="w-full lg:w-1/3 sm:w-1/2 p-7  ">
              <div className="rounded-lg border border-gray-200 hover:shadow-main shadow-lg hover:duration-1000 dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="w-full pb-8 h-[350px]"
                  src={brand.image}
                  alt={brand.name}
                />

                <div className=" text-green-700 pb-2 dark:text-main">
                  <h5 className="text-xl text-center font-semibold ">
                    {brand.name}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
