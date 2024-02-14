const userTypeReducer = (state = null,action) => {
            switch (action.type) {
                case "SET_USER_TYPE":
                    return action.domain
                    case "GET_USER_TYPE":
                        return state    
                default:
                    return state
            }
}

export default userTypeReducer