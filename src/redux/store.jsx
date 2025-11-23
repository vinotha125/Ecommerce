import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";


const store = configureStore({
  reducer: {
    cart: cartSlice,
    product: productSlice,
    order: orderSlice, 
   
  }
});

export default store;
