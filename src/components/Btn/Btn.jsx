import React, { Children, useEffect, useState } from "react";

// import styles from "./Btn.module.css";

export default function Btn(props) {
  // const [count, setCount] = useState(0);
console.log(props);

  return (
   <>
   <div>btn</div>
   <div className="bg-red-500">
    {props.Children}
   </div>
   </>
  );
}


