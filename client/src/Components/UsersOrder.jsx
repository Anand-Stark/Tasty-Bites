import React from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/ordersActions";
import OrderData from "./OrderData";


const UsersOrder = () => {
    // getting the user and the order states :
    const user = useSelector((state) => state.user);
    const order = useSelector((state) => state.orders);
    
    const dispatch = useDispatch()

    const [userOrders, setuserOrders] = useState(null)

    useEffect(() => {
        if (!order) {
            getAllOrder().then((data) =>{ 
                dispatch(setOrders(data))
                setuserOrders(data.filter(item => item.userId === user?.user_id ))
            })
        }else{
            setuserOrders(order.filter(data => data.userId === user?.user_id ))
        }
    }, [order]);

  return (
      <div className="w-full flex flex-col items-start justify-center mt-12 px-6 md:px-24 2xl:px-96 gap-5 pb-24">
      {userOrders?.length > 0  ? (
        <>
          {userOrders.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={false} />
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

export default UsersOrder;
