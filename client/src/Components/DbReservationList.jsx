import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReservations } from '../api'
import { setReservation } from '../context/actions/reservationActions'
import ReservationListData from './ReservationListData'

const DbReservationList = () => {

  const reservations = useSelector((state) => state.reservationList)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!reservations){
       getAllReservations()
       .then((res) => { 
        //  console.log(res);
        dispatch(setReservation(res))
       })
    }
  },[])

  return (
    <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
      {reservations ? (
        <>
          {reservations.map((item, i) => (
            <ReservationListData   key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
        </>
      )}
    </div>
  )
}

export default DbReservationList