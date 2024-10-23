import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  grandTotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (x) => x._id === action.payload._id
      );

      if (productIndex >= 0) {
        state.cartItems[productIndex].productQty += 1;
        toast.info(
          `${action.payload.name} quantity in the cart has been increased`
        );
      } else {
        state.cartItems.push({ ...action.payload, productQty: 1 });
        toast.success(`${action.payload.name} added to the cart`);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const newCartItems = state.cartItems.filter(
        (x) => x._id !== action.payload._id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increaseProductQty: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (x) => x._id === action.payload._id
      );
      state.cartItems[productIndex].productQty += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseProductQty: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (x) => x._id === action.payload._id
      );
      if (state.cartItems[productIndex].productQty >= 1)
        state.cartItems[productIndex].productQty -= 1;
      if (state.cartItems[productIndex].productQty === 0) {
        const newCartItems = state.cartItems.filter(
          (x) => x._id !== action.payload._id
        );
        state.cartItems = newCartItems;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getGrandTotal: (state) => {
      state.grandTotal = state.cartItems.reduce(
        (total, item) => total + item.productQty * item.price,
        0
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseProductQty,
  decreaseProductQty,
  getGrandTotal,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
