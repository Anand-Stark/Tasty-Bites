const profileReducer = (state=null,action) => {
      switch(action.type){
        case "SET_USER_PROFILE": 
            return action.profile
            case "GET_USER_PROFILE":
                return state
                default: 
                return state
      }
}

export default profileReducer