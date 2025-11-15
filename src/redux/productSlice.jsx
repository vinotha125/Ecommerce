import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  searchTerm: "",
  filteredData: []
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
      state.filteredData = action.payload; // ✅ Show all initially
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.filteredData = state.products.filter(product =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
    addProduct(state, action) {  // ✅ Add this reducer
      state.products.push(action.payload);
      state.filteredData.push(action.payload); // optional: update filteredData too
    },
  },
});

export const { setProducts, setSearchTerm, addProduct } = productSlice.actions; // ✅ export new action
export default productSlice.reducer;
