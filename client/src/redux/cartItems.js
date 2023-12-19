import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const newState = { ...state };
    
      if (productIndex >= 0) {
        newState.cartItems[productIndex].cartTotalQuantity += action.payload.quantity;
      } else {
        const temp = { ...action.payload.item, cartTotalQuantity: action.payload.quantity };
        newState.cartItems.push(temp);
      } 
    },
    DECREASE_CART: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[productIndex].Quantity > 1) {
        state.cartItems[productIndex].Quantity -= 1;
        state.cartItems.push(state.cartItems)
      } else if (state.cartItems[productIndex].Quantity === 1) {
        state.cartItems.splice(productIndex, 1);
      }
    },
    DELETE_CART: (state, action) => {
      const productIndex = state.cartItems.filter(
        (item) => !(item.id === action.payload.id)
      );
      state.cartItems = productIndex;
      state.cartItems.push(productIndex);
    },
    CALCULATE_TOTAL: (state, action) => {
      const array = [];
      state.cartItems.map((item) => {
        const { Quantity, price } = item;
        const cartAmount = price * Quantity;
        return array.push(cartAmount);
      });
      const reducer = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.cartTotalAmount = reducer;
    },
    CLEAR_CART:(state,action)=>{
      state.cartItems = []
    }
  },
});

export const { ADD_TO_CART, DECREASE_CART, DELETE_CART, CALCULATE_TOTAL, CLEAR_CART } =
  cartSlice.actions;
export default cartSlice.reducer;
