export const setPremium = (val) => {
      return {
         type : "SET_PREMIUM_USER",
         val : val
      }
}

export const getPremium = () => {
      return {
        type: "GET_PREMIUM_USER"
      }
}