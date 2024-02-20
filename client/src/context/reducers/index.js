import {combineReducers} from "redux"
import userReducer from "./userReducers"
import alertReducer from "./alertReducer"
import productReducer from "./productReducers"
import allUserReducer from "./allUserReducer"
import cartReducer from "./cartReducer"
import displayCartReducer from "./displayCartReducer"
import ordersReducer from "./ordersReducer"
import isSearch from "./isSearch"
import userTypeReducer from "./userTypeReducer"
import reservationReducer from "./reservationReducer"

const myReducers = combineReducers({
    user:userReducer,
    alert:alertReducer,
    products: productReducer,
    allUsers: allUserReducer,
    cart: cartReducer,
    isCart: displayCartReducer,
    orders: ordersReducer,
    searchItem : isSearch ,
    userType : userTypeReducer,
    reservationList : reservationReducer
})

export default myReducers