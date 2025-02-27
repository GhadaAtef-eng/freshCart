import React, { useEffect, useState } from "react";

import styles from "./PopularCategory.module.css";
import axios from "axios";
import Slider from "react-slick";
import { space } from "postcss/lib/list";

export default function PopularCategory() {
  const [categories, setCategories] = useState([]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    space: 1
  };

  async function getCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
    
      setCategories(data.data);
      
    } catch (err) {
    
    }
  }

  useEffect(() => {
    getCategories();
    
  }, []);
  return (
    <>
      <div className="py-20 w-[90%] mx-auto ">
        <h2 className="mb-5 text-2xl text-main font-bold">
          Shop Popular Category{" "}
        </h2>
        <div className=" mb-8">
          <Slider  {...settings}>
            {categories.map((category) => (
              <div>
                <img
                  className={styles.categoryImg}
                  src={category.image}
                  alt={category.name}
                />
                <h4>{category.name}</h4>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}
