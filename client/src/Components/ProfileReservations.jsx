import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReservations } from '../api'
import { setReservation } from '../context/actions/reservationActions'
import ReservationListData from './ReservationListData'

const ProfileReservations = () => {

    const reservations = useSelector((state) => state.reservationList)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    const reservation = reservations?.filter((reservation) => 
         reservation.userId === user?.uid
    )

    useEffect(()=>{
        if(!reservations){
           getAllReservations()
           .then((res) => { 
            dispatch(setReservation(res))
           })
        }
      },[user])

     return (
        <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
        {reservation ? (
          <>
            {reservation.map((item, i) => (
              <ReservationListData   key={i} index={i} data={item} admin={false} />
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

export default ProfileReservations