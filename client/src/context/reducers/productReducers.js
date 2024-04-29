const productReducer  = (state= null, action) => {
     switch(action.type){
         case  "SET_ALL_PRODUCTS":
             return action.products
             case  "GET_ALL_PRODUCTS" : 
             return state
             default : 
              return state
     }  
}

export default productReducer