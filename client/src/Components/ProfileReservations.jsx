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
      },[reservation])

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

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllReservations } from '../api';
// import { setReservation } from '../context/actions/reservationActions';
// import ReservationListData from './ReservationListData';

// const ProfileReservations = () => {
//   const [confirmedReservations, setConfirmedReservations] = useState([]);
//   const [rejectedWaitingReservations, setRejectedWaitingReservations] = useState([]);
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user);
//   const reservations = useSelector((state) => state.reservationList);

//   useEffect(() => {
//     if (!reservations) {
//       getAllReservations().then((res) => {
//         dispatch(setReservation(res));
//       });
//     }
//   }, [reservations, dispatch]);

//   useEffect(() => {
//     if (reservations) {
//       const confirmed = reservations.filter((reservation) => reservation.sts === 'confirmed');
//       const rejectedWaiting = reservations.filter((reservation) => reservation.sts === 'rejected' || reservation.sts === 'waiting');
//       setConfirmedReservations(confirmed);
//       setRejectedWaitingReservations(rejectedWaiting);
//     }
//   }, [reservations]);

//   return (
//     <div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
//       <div className="dropdown">
//         <select className="dropdown-select">
//           <option value="">Confirmed Reservations</option>
//           {confirmedReservations.map((item, i) => (
//             <option key={i} value={item.reservationId}>
//               <ReservationListData index={i} data={item} admin={false} />
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="dropdown">
//         <select className="dropdown-select">
//           <option value="">Rejected/Waiting Reservations</option>
//           {rejectedWaitingReservations.map((item, i) => (
//             <option key={i} value={item.reservationId}>
//               <ReservationListData index={i} data={item} admin={false} />
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default ProfileReservations;
