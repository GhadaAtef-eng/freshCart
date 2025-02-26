import React, { useEffect, useState } from "react";

import styles from "../../Home/components/PopularCategory/PopularCategory.module.css";
import axios from "axios";

export default function CategoryOne() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );

      setCategories(data.data);
    } catch (err) {}
  }

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="mainLayout w-[90%] mx-auto  mb-10  ">
        {categories.map((category) => (
          <div className="w-full lg:w-1/3 sm:w-1/2 p-5  ">
         <div className="rounded-lg border border-gray-200 hover:shadow-main shadow-lg hover:duration-1000 dark:bg-gray-800 dark:border-gray-700">
          
         <img
                className="w-full pb-8 h-[350px]"
                src={category.image}
                alt={category.name}
              />

              <div className=" text-green-700 pb-2 dark:text-main">
                <h5 className="text-xl text-center font-semibold ">{category.name}</h5>
              </div>
         </div>
            </div>
         
        ))}
      </div>
    </>
  );
}

// <div className="mainLayout w-[90%] mx-auto">
// {categories.map((category) => (
//   <div className="md:w-1/4 p-5 m-11  mx-auto">
//     <div className="shadow-lg rounded-3xl">
//       <img
//         className="object-cover"
//         src={category.image}
//         alt={category.name}
//       />

//       <h4>{category.name}</h4>
//     </div>{" "}
//   </div>
// ))}
// </div>
