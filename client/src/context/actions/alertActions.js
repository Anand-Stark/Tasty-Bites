export const alertSuccess = (msg) => {
     return { 
         type:"SET_SUCCESS",
         alert:{type:"success",message:msg}
     }
}
export const alertWarning = (msg) => {
    return { 
        type:"SET_WARNING",
        alert:{type:"warning",message:msg}
    }
}
export const alertDanger = (msg) => {
    return { 
        type:"SET_DANGER",
        alert:{type:"danger",message:msg}
    }
}
export const alertInfo = (msg) => {
    return { 
        type:"SET_INFO",
        alert:{type:"info",message:msg}
    }
}

export const alertNull = (msg) => {
    return {
         type:"SET_NULL",
         alert:null
    }
}