const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    address: [],
}

const Address = createSlice({
    name:"addressdetail",
    initialState,
    reducers:{
        SHIPPING_ADDRESS:(state, action)=>{
            state.address.push(action.payload)
        },
        CLEAR_SHIPPING_ADDRESS:(state, action)=>{
            state.address = []
        }
    }
})

export const { SHIPPING_ADDRESS, CLEAR_SHIPPING_ADDRESS } = Address.actions
export default Address.reducer;