export const setUserType = (type)=>{ 
     return  {
         type:"SET_USER_TYPE",
         domain : type
     }
}

export const getUserType = (type) => {
     return {
         type:"GET_USER_TYPE"
     }
}