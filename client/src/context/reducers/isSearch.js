const isSearch = (state = false,action) => {
    switch (action.type) {
      case "SET_SEARCH_ITEM":
        return action.item;

      case "GET_SEARCH_ITEM":
       return state;

       default : 
       return state
      
    }
};

export default isSearch