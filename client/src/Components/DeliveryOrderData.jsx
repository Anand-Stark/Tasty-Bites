import { motion } from "framer-motion";
import React from "react";
import { HiCurrencyRupee } from "../assets/icons";
import { buttonClick, staggerFadeInOut } from "../animations";
import { getAllOrder, updateOrderSts, verifyOtp, sendOtp } from "../api";
import { setOrders } from "../context/actions/ordersActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const DeliveryOrderData = ({ index, data, admin }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [randomOtp, setRandomOtp] = useState("")
 

  const handleClick = async (orderId, sts, customerEmailId) => {
    if (sts === "Delivered") {
      try {

        const response = await sendOtp(customerEmailId);  
        setRandomOtp(response.genOtp);

        if (response.success) {
          setShowModal(true);
        } else {
          toast.error("Failed to send OTP");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while sending OTP");
      }
    } else {
      updateOrderSts(orderId, sts)
        .then((response) => {
          toast.success(`${orderId} is ${sts}`);
          getAllOrder().then((data) => {
            dispatch(setOrders(data));
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update order status");
        });
    }
  };

  const handleVerifyOTP = async (orderId,sts) => {
    try {
      const response = await verifyOtp(otp,randomOtp);
      if (response) {
        setShowModal(false);
        toast.success("OTP Verified");
        updateOrderSts(orderId, sts)
        .then((response) => {
          toast.success(`${orderId} is ${sts}`);
          getAllOrder().then((data) => {
            dispatch(setOrders(data));
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to update order status");
        });
      }
      else{ 
        toast.error("Wrong OTP Entered");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while verifying OTP");
    }
  };


  return (
    
    <>
    {showModal ? (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative z-50 bg-white rounded-lg max-w-sm p-6">
            <span className="absolute top-0 right-0 cursor-pointer mr-4 mt-4 text-gray-600 hover:text-gray-800" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <div className="text-center">
              <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleVerifyOTP(data.orderId,"Delivered")}
                className={`w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600`}
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    ):(data.sts !== "Delivered" && (
        <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-4"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Orders</h1>

        <div className=" flex items-center gap-4">
          <p className="flex items-center gap-1 text-textColor">
            Total : <HiCurrencyRupee className="text-lg text-red-500" />{" "}
            <span className="text-headingColor font-bold">{data?.total}</span>
          </p>

          <p className="px-2 py-[2px] text-sm text-headingColor font-semibold capitalize  rounded-md bg-emerald-400 drop-shadow-md">
            {data?.status}
          </p>

          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
              (data.sts === "On Way" && "text-orange-500 bg-orange-100") ||
              (data.sts === "Parcel Recieved" && "text-red-500 bg-red-100") ||
              (data.sts === "Delivered" && "text-emerald-500 bg-emerald-100")
            }`}
          >
            {data?.sts}
          </p>

          {admin && (
            <div className="flex items-center justify-start gap-5">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() =>
                  handleClick(
                    data.orderId,
                    "Parcel Recieved",
                    data.customer.email
                  )
                }
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Parcel Recived
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() =>
                  handleClick(data.orderId, "On Way", data.customer.email)
                }
                className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                On Way
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() =>
                  handleClick(data.orderId, "Delivered", data.customer.email)
                }
                className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Delivered
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-start flex-wrap w-full">
        <div className="flex items-center justify-center gap-4">
          {data?.items &&
            data.items.map((item, j) => (
              <motion.div
                {...staggerFadeInOut(j)}
                key={j}
                className="flex items-center justify-center gap-1"
              >
                <img
                  src={item.prod_image}
                  className="w-10 h-10 object-contain"
                  alt=""
                />

                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-headingColor">
                    {item.prod_name}
                  </p>
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-textColor">
                      {" "}
                      Qty : {item.quantity}
                    </p>
                    <p className="flex items-center gap-1 text-textColor">
                      <HiCurrencyRupee className="text-base text-red-500" />
                      {parseFloat(item.prod_price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <div className="flex items-start justify-start flex-col gap-2 px-6 ml-auto w-full md:w-460">
          <h1 className="text-lg text-headingColor font-semibold">
            Name : {data.shipping_details.name}
          </h1>

          <p className="text-base text-headingColor -mt-2">
            Email : {data.customer.email} <br />
            phone No : {data.customer.phone}
          </p>

          <p className="text-base text-textColor -mt-2">
            Address : {data.shipping_details.address.line1},
            {data.shipping_details.address.line2}{" "}
            {data.shipping_details.address.country},
            {data.shipping_details.address.state} -
            {data.shipping_details.address.postal_code}
          </p>
        </div>
      </div>
      
     

    </motion.div>)
      )}
      
    </>
  );
};

export default DeliveryOrderData;
