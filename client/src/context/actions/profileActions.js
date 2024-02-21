export const setUserProfile = (profile) => { 
     return {
        type:"SET_USER_PROFILE",
        profile:profile
     }
}

export const getUserProfile = () =>{ 
     return { 
         type:"GET_USER_PROFILE"
     }
}