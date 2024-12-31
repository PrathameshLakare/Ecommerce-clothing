import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchClothings = createAsyncThunk(
  "products/clothing",
  async () => {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  }
);
const clothingSlice = createSlice({
  name: "clothing",
  initialState: {
    clothing: [],
    status: "idle",
    error: null,
    sortByPrice: "none",
  },
  reducers: {
    setSortByPrice: (state, action) => {
      state.sortByPrice = action.payload;
    },
    clearCart: (state) => {
      state.clothing = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClothings.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchClothings.fulfilled, (state, action) => {
      state.status = "success";
      state.clothing = action.payload;
    });
    builder.addCase(fetchClothings.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { setSortByPrice } = clothingSlice.actions;

export default clothingSlice.reducer;
