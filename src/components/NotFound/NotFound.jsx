import React, { useEffect, useState } from "react";
import notFoundImage from "../../assets/images/404.png";

import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className="container">
      <img src={notFoundImage} className=" contain-content w-full" alt="NotFound" />
    </div>
  );
}
