import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchWishlistData = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get(`${API_URL}/api/wishlist`);
    return response.data;
  }
);

export const postWishlistData = createAsyncThunk(
  "wishlist/postWishlist",
  async (wishlistData) => {
    await axios.post(`${API_URL}/api/wishlist`, wishlistData);

    const response = await axios.get(`${API_URL}/api/wishlist`, wishlistData);
    return response.data;
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (id) => {
    const response = await axios.delete(`${API_URL}/api/wishlist/${id}`);
    return response.data;
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    wishlistValue: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWishlistData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchWishlistData.fulfilled, (state, action) => {
      state.status = "success";
      state.wishlist = action.payload;
      state.wishlistValue = state.wishlist.length;
    });
    builder.addCase(fetchWishlistData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postWishlistData.fulfilled, (state, action) => {
      state.status = "sucess";
      state.wishlist = action.payload;
      state.wishlistValue = state.wishlist.length;
    });
    builder.addCase(postWishlistData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteWishlistItem.fulfilled, (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.productId !== action.payload.product.productId
      );
      console.log(action.payload.product._id);
      console.log(state.wishlist);
      state.wishlistValue = state.wishlist.length;
    });
  },
});

export default wishlistSlice.reducer;
