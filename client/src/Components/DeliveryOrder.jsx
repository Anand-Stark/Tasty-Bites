import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersActions";
import { OrderData } from "../Components";
import DeliveryOrderData from "./DeliveryOrderData";

const DeliveryOrder = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, []);

  return (
    <div className=" flex items-center justify-center flex-col  w-[70%] gap-4 px-10 py-10">
      {orders ? (
        <>
          {orders.map((item, i) => (
            <DeliveryOrderData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
        </>
      )}
    </div>
  );
};

export default DeliveryOrder;
