import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick } from "../animations";
import { addNewItemToCart, getAllCartItems } from "../api";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { alertNull, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
import HoverRating from "./HoverRating";

const AddToCart = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    dispatch(alertSuccess("Item Added ❤️"));
    // console.log(data);
  
    addNewItemToCart(user?.user_id, data).then((res) => {
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
    });
  };
  

  return (
        <motion.div
          {...buttonClick}
          onClick={sendToCart}
          className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center relative cursor-pointer"
        >
          <IoBasket className="text-2xl text-primary" />
        </motion.div>  
  );
};

export default AddToCart;
