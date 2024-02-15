export const setUserType = (type)=>{ 
     return  {
         type:"SET_USER_TYPE",
         domain : type
     }
}

export const setUserTypeNull = ()=>{ 
     return{
        type:"SET_USER_TYPE_NULL",
        domain : null
     }
}

export const getUserType = (type) => {
     return {
         type:"GET_USER_TYPE"
     }
}