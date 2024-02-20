export const setReservation = (data) => {
    return {
       type:"SET_ALL_RESERVATION",
       data:data
    }
}

export const getReservation = () => {
       return {
          type:"GET_ALL_RESERVATION"
       }
}

