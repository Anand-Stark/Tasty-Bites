export const setSearchItem = (item) => {
     return {
        type: "SET_SEARCH_ITEM",
        item : item
     }
}

export const getSearchItem = () => {
    return { 
         type: "GET_SEARCH_ITEM"
    }
}