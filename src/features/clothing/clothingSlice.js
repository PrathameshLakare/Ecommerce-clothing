import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClothings = createAsyncThunk(
  "products/clothing",
  async () => {
    const response = await axios.get(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/products"
    );
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
