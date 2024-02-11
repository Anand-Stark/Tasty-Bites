import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClick, slideIn, staggerFadeInOut } from "../animations";
import { baseUrl, getAllCartItems, increaseItemQuantity } from "../api";
import {
  BiChevronsRight,
  FcClearFilters,
  HiCurrencyRupee,
} from "../assets/icons";
import { alertNull, alertSuccess } from "../context/actions/alertActions";
import { clearCartItems, setCartItems } from "../context/actions/cartAction";
import { setCartOff } from "../context/actions/displayCartAction";
import { emptycart } from "../assets";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [total, setTotal] = useState(0);
  

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((data) => {
        tot = tot + data.prod_price * data.quantity;
        setTotal(tot);
      });
    }
  }, [cart]);

  const handleCheckOut = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(`${baseUrl}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveAll = () => {
    dispatch(clearCartItems());
    // You can include additional logic here to clear the cart on the server if needed
    // For example: axios.delete(`${baseUrl}/api/products/clear-cart/${user?.user_id}`);
  };

  return (
    <motion.div
      {...slideIn}
      className="fixed z-50 top-0 right-0  md:w-200 bg-lightOverlay backdrop-blur-md shadow-md h-screen"
    >
      <div className="w-full flex items-center justify-between py-4  px-6">
        <motion.i
          {...buttonClick}
          className="cursor-pointer"
          onMouseEnter={() => dispatch(setCartOff())}
        >
          <BiChevronsRight className="text-[50px] text-textColor" />
        </motion.i>
        <p className="text-xl text-black font-semibold">Your Cart</p>
        <motion.i {...buttonClick} className="cursor-pointer">
          <FcClearFilters
            className="text-[30px] text-textColor"
            onClick={handleRemoveAll}
          />
        </motion.i>
      </div>

      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-transparent h-full   gap-3 relative">
        {cart && cart?.length > 0 ? (
          <>
            <div className="flex flex-col py-2 w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart &&
                cart?.length > 0 &&
                cart?.map((item, i) => (
                  <CartItemCard key={i} index={i} data={item} />
                ))}
            </div>
            <div className="bg-transparent rounded-t-[60px] w-full  flex flex-col items-center justify-center px-4 py-4 gap-10">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold flex items-center justify-center gap-1">
                  <HiCurrencyRupee className="text-black" />
                  {total}
                </p>
              </div>

              <motion.button
                {...buttonClick}
                className="bg-orange-400 w-[70%] px-4 py-3 text-xl text-headingColor font-semibold hover:bg-orange-500 drop-shadow-md rounded-2xl"
                onClick={handleCheckOut}
              >
                Check Out
              </motion.button>
            </div>
          </>
        ) : (
          <>
            <motion.img
                  whileTap={{ scale: 0.6 }}
                  src={emptycart}
                  className="w-[80%] ml-12 relative mt-10"
                  alt="Empty-Cart"
                  referrerPolicy="no-referrer"
                />
                <h1 className="relative text-black font-bold ml-[80px] mt-5 text-xl"> Add Items to your Cart</h1>
          </>
        )}
      </div>
    </motion.div>
  );
};

export const CartItemCard = ({ index, data }) => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [itemTotal, setItemTotal] = useState(0);
  const dispatch = useDispatch();

  const decrementCart = (productId) => {
    dispatch(alertSuccess("Decreased the cartitem"));

    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };

  const incrementCart = (productId) => {
    dispatch(alertSuccess("Increased the cartitem"));
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      console.log(data);
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
        dispatch(alertNull());
      });
    });
  };

  useEffect(() => {
    setItemTotal(data.prod_price * data.quantity);
  }, [itemTotal, cart]);

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className="w-full flex items-center justify-start bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 rounded-md drop-shadow-md px-4 gap-4"
    >
      <img
        src={data?.prod_image}
        className=" w-24 min-w-[94px] h-24 object-contain"
        alt=""
      />

      <div className="flex items-center justify-start gap-1 w-full">
        <p className="text-lg text-primary font-semibold">
          {data?.prod_name}
          <span className="text-sm block capitalize text-gray-400">
            {data?.prod_category}
          </span>
        </p>
        <p className="text-sm flex items-center justify-center gap-1 font-semibold text-red-400 ml-auto">
          <HiCurrencyRupee className="text-red-400" /> {itemTotal}
        </p>
      </div>

      <div className="ml-auto flex items-center justify-center gap-3">
        <motion.div
          {...buttonClick}
          onClick={() => decrementCart(data?.productId)}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
        >
          <p className="text-xl font-semibold text-primary">-</p>
        </motion.div>
        <p className="text-lg text-primary font-semibold">{data?.quantity}</p>
        <motion.div
          {...buttonClick}
          className="w-8 h-8 flex items-center justify-center rounded-md drop-shadow-md bg-zinc-900 cursor-pointer"
          onClick={() => incrementCart(data?.productId)}
        >
          <p className="text-xl font-semibold text-primary">+</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cart;
