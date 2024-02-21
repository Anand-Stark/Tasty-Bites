import React from 'react'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { buttonClick,staggerFadeInOut } from '../animations'
import { HiCurrencyRupee } from "../assets/icons";
import { getAllReservations, updateReservationStatus } from '../api';
import { setReservation } from '../context/actions/reservationActions';


const ReservationListData = ({index,data,admin}) => {

  const dispatch = useDispatch()

  const handleClick = (reservationId,sts) => { 

     console.log("Inside the HandleCLick");

       updateReservationStatus(reservationId,sts)
       .then((res) =>{ 
          getAllReservations().then((data)=>{
               dispatch(setReservation(data))
          })
       })
  }
   
  return (
    <motion.div
      {...staggerFadeInOut(index)}
      className="w-full flex flex-col items-start justify-start px-3 py-2 border relative border-gray-300 bg-lightOverlay drop-shadow-md rounded-md gap-2"
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl text-headingColor font-semibold">Reservation Request</h1>
          
          <p
            className={`text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md ${
              (data.sts === "waiting" && "text-orange-500 bg-orange-100") ||
              (data.sts === "rejected" && "text-red-500 bg-red-100") ||
              (data.sts === "confirmed" && "text-emerald-500 bg-emerald-100")
            }`}
          >
           Request Status : {data?.sts}
          </p>

          {admin && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg font-semibold text-headingColor">Mark As</p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.reservationId, "waiting")}
                className={`text-orange-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Waiting
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.reservationId, "rejected")}
                className={`text-red-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Rejected
              </motion.p>

              <motion.p
                {...buttonClick}
                onClick={() => handleClick(data.reservationId, "confirmed")}
                className={`text-emerald-500 text-base font-semibold capitalize border border-gray-300 px-2 py-[2px] rounded-md cursor-pointer`}
              >
                Confirmed
              </motion.p>
            </div>
          )}
        </div>

        <div class="bg-gray-200 p-4 rounded-md">
    {/* <!-- Name and Date section --> */}
    <div class="flex justify-between mb-4">
        <div class="font-bold">Name: {data.name}</div>
        <div>Date: {data.date}</div>
    </div>
    {/* <!-- Start Time and End Time section --> */}
    <div class="flex justify-between mb-4">
        <div>Start Time: {data.startTimeHours}:{data.startTimeMinute}{" "}{data.startTimePeriod}</div>
        <div>End Time: {data.endTimeHours}:{data.endTimeMinutes}{" "}{data.endTimePeriod}</div>
    </div>
    {/* <!-- Description section --> */}
    <div class="mt-4">The customer expresses following desire regarding his time, date and hour of visit and expects this from us : {data.description}</div>
</div>
    
    </motion.div>
  ) 
}

export default ReservationListData