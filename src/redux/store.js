import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import cartReducer from "./features/cartSlice";
import updateUserReducer from "./features/updateUserSlice";
import orderReducer from "./features/orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    updateUser: updateUserReducer,
    order: orderReducer,
  },
});

export default store;
