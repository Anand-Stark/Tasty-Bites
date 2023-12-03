import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";

const DbHome = () => {
  // getting the product details :
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
         dispatch(setAllProducts(data))
         console.log(data)
      });
    }
  });

  return <div>DbHome</div>;
};

export default DbHome;
