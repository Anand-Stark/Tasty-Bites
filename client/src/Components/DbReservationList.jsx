// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllReservations } from '../api'
// import { setReservation } from '../context/actions/reservationActions'
// import ReservationListData from './ReservationListData'

// const DbReservationList = () => {

//   const reservations = useSelector((state) => state.reservationList)
//   const dispatch = useDispatch()

//   useEffect(()=>{
//     if(!reservations){
//        getAllReservations()
//        .then((res) => { 
//         dispatch(setReservation(res))
//        })
//     } 
//   },[reservations])

//   return (
//     <div className=" flex items-center justify-center flex-col pt-6 w-full gap-4">
//       {reservations ? (
//         <>
//           {reservations.map((item, i) => (
//             <ReservationListData   key={i} index={i} data={item} admin={true} />
//           ))}
//         </>
//       ) : (
//         <>
//           <h1 className="text-[72px] text-headingColor font-bold">No Data</h1>
//         </>
//       )}
//     </div>
//   )
// }

// export default DbReservationList

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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations } from '../api';
import { setReservation } from '../context/actions/reservationActions';
import ReservationListData from './ReservationListData';

const ProfileReservations = () => {
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [showRejectedWaiting, setShowRejectedWaiting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const reservations = useSelector((state) => state.reservationList);

  useEffect(() => {
    if (!reservations) {
      getAllReservations().then((res) => {
        dispatch(setReservation(res));
      });
    }
  }, [reservations, dispatch]);

  const confirmedReservations = reservations?.filter((reservation) => reservation.sts === 'confirmed') || [];
  const rejectedWaitingReservations = reservations?.filter((reservation) => reservation.sts === 'rejected' || reservation.sts === 'waiting') || [];

  const handleConfirmedClick = () => {
    setShowConfirmed(!showConfirmed);
    setShowRejectedWaiting(false);
  };

  const handleRejectedWaitingClick = () => {
    setShowRejectedWaiting(!showRejectedWaiting);
    setShowConfirmed(false);
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4 relative">
      <div className="relative w-full">
        <button
          className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-gray-500 hover:bg-gray-100 transition duration-300"
          onClick={handleConfirmedClick}
        >
          Confirmed Reservations
        </button>
        {showConfirmed && (
          <div className="absolute mt-2 w-full bg-white border border-gray-400 rounded-lg shadow-lg z-10">
            {confirmedReservations.map((item, i) => (
              <ReservationListData key={i} index={i} data={item} admin={false} />
            ))}
          </div>
        )}
      </div>
      <div className="relative w-full">
        <button
          className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 rounded-lg leading-tight focus:outline-none focus:border-gray-500 hover:bg-gray-100 transition duration-300"
          onClick={handleRejectedWaitingClick}
        >
          Rejected/Waiting Reservations
        </button>
        {showRejectedWaiting && (
          <div className="absolute mt-2 w-full bg-white border border-gray-400 rounded-lg shadow-lg z-10">
            {rejectedWaitingReservations.map((item, i) => (
              <ReservationListData key={i} index={i} data={item} admin={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileReservations;
