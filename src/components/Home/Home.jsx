import React, { useEffect, useState } from "react";

import styles from "./Home.module.css";
import RecentProducts from "./components/RecentProducts/RecentProducts";
import PopularCategory from "./components/PopularCategory/PopularCategory";
import StaticSlider from "./components/StaticSlider/StaticSlider";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div className="dark">
      
    <StaticSlider/>
       <PopularCategory/>
        <RecentProducts />
    </div>
    </>
  );
}
