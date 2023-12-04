import {combineReducers} from "redux"
import userReducer from "./userReducers"
import alertReducer from "./alertReducer"
import productReducer from "./productReducers"
import allUserReducer from "./allUserReducer"

const myReducers = combineReducers({
    user:userReducer,
    alert:alertReducer,
    products: productReducer,
    allUsers: allUserReducer,
})

export default myReducers