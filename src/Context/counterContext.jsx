import { createContext } from "react";
import { useState } from "react";

export let counterContext = createContext();

export default function CouterContextProvider(props) {
  let [count, setCount] = useState(10);

  return (
    <counterContext.Provider value={{ count, setCount }}>
      {props.children}
    </counterContext.Provider>
  );
}
