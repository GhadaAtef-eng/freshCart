import React, { useEffect, useState } from "react";

import styles from "./Loader.module.css";
import { RingLoader } from "react-spinners";



export default function Loader() {
  const [count, setCount] = useState(0);

  return (
    <>
  <div className="flex justify-center">
  <RingLoader />
  </div>
    </>
  );
}
