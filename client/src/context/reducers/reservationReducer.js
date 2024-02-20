const reservationReducer = (state=null,action) => {
     switch(action.type){
        case "SET_ALL_RESERVATION": 
           return action.data
           case "GET_ALL_RESERVATION":
            return state
            default : 
            return state
     }
}

export default reservationReducer