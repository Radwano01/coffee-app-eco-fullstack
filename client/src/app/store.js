import {combineReducers, configureStore} from "@reduxjs/toolkit"
import cartItems from "../redux/cartItems"
import Address from "../redux/Address"

const rootReducer = combineReducers({
    cart:cartItems,
    address:Address
})

const store = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultNormalizer)=>
    getDefaultNormalizer({
        serializableCheck:false
    })
})

export default store