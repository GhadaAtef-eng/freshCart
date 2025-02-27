import React, { useEffect, useState } from "react";

import styles from "./StaticSlider.module.css";
import Slider from "react-slick";
import slide1 from "../../../../assets/images/slider-image-1.jpeg";
import slide2 from "../../../../assets/images/slider-image-2.jpeg";
import slide3 from "../../../../assets/images/slider-image-3.jpeg";
import banner1 from "../../../../assets/images/grocery-banner.png";
import banner2 from "../../../../assets/images/grocery-banner-2.jpeg";
export default function StaticSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="pt-10 mainLayout sm:pb-96 sm:h-[300px] w-[90%] mx-auto">
          <div className="w-9/12 ">
            <Slider {...settings}>
              <img className="sm:h-[300px] h-[100px]" src={slide3} />
              <img className="sm:h-[300px] h-[100px]" src={slide2} />
              <img className="sm:h-[300px] h-[100px]" src={slide1} />
            </Slider>
          </div>
          <div className="w-3/12 ">
            <img className="sm:h-1/2" src={banner1} alt="" />
            <img className="sm:h-1/2" src={banner2} alt="" />
          </div>
     
        </div>
    </>
  );
}
