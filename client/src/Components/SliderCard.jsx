import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick } from "../animations";
import { addNewItemToCart, getAllCartItems } from "../api";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { alertNull, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import HoverRating from "./HoverRating";

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

 

  // const sendToCart = () => {
  //   dispatch(alertSuccess("Added to the cart"));
  //   console.log(user);
  //   addNewItemToCart(user.user_id, data).then((res) => {
  //     // console.log(res);
  //     getAllCartItems(user.user_id).then((items) => {
  //       // console.log(items);
  //       dispatch(setCartItems(items));   
  //     });
  //     setInterval(() => {
  //       dispatch(alertNull());
  //     }, 3000);
  //   });
  // };

  const sendToCart = () => {
    dispatch(alertSuccess("Item Added ❤️"));
    // console.log(data);
  
    addNewItemToCart(user?.user_id, data).then((res) => {
      // Assuming addNewItemToCart and getAllCartItems are asynchronous functions that return promises
  
      // After successfully adding the item, update the cart items in the Redux store
      getAllCartItems(user.user_id)
        .then((items) => {
          console.log(items);
          // Assuming setCartItems is an action creator that dispatches the "SET_CART_ITEMS" action
          dispatch(setCartItems(items));
          dispatch(alertNull())
        })
        .catch((error) => {
          // Handle any errors that occur while fetching cart items
          console.error("Error fetching cart items:", error);
        })
        // .finally(() => {
        //   // Clear the success alert after a delay (3000 milliseconds in this case)
        //   setTimeout(() => {
        //     dispatch(alertNull());
        //   }, 1000);
        // });
    });
  };
  

  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex-wrap items-center justify-between relative px-4 py-2  md:w-340 md:min-w-350 gap-3 ">
      <img src={data.prod_image} className="w-40 h-40 object-contain" alt="" />
      <div className="relative">
      <div className="flex flex-row justify-evenly">

        <p className="text-xl text-headingColor font-semibold">
         {data.prod_name}
        </p>
        <p className="text-lg font-semibold text-red-500 flex items-center justify-center gap-1">
          <HiCurrencyRupee className="text-red-500" />{" "}
          {parseFloat(data.prod_price).toFixed(2)}
        </p>
      </div>

        <HoverRating />

        <motion.div
          {...buttonClick}
          onClick={sendToCart}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center relative  -top-1 right-2 cursor-pointer"
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>
      </div>
    </div>
  );
};

export default SliderCard;
