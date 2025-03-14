import React, { useEffect, useState } from "react";

import styles from "./RelatedProduct.module.css";
import axios from "axios";
import ProductItem from "../../../Shared/ProductItem/ProductItem";

export default function RelatedProduct(props) {
  const [relatedProduct, setRelatedProduct] = useState([]);

  let { categoryId } = props;

  function getProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {

        let res = data.data.filter(
          (product) => product.category._id == categoryId
        );
        setRelatedProduct(res);
      })
      .catch((err) => {
        console.log(err);
        
      });
  }
  useEffect(() => {
    getProducts();
    
  });

  return (
    <>
      <div className="w-[90%] mx-auto ">
      <h3 className="text-3xl text-main font-bold mt-8">Related Products: </h3>

      </div>
      <div className="w-[90%] m-auto  mainLayout mb-10">
        {relatedProduct.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
