import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: []
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    }
  }
});

export const { addOrder } = orderSlice.actions; // ✅ needed export
export default orderSlice.reducer;
