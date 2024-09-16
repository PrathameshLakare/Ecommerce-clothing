import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWishlistData = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/wishlist"
    );
    return response.data;
  }
);

export const postWishlistData = createAsyncThunk(
  "wishlist/postWishlist",
  async (wishlistData) => {
    await axios.post(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/wishlist",
      wishlistData
    );

    const response = await axios.get(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/wishlist",
      wishlistData
    );
    return response.data;
  }
);

export const deleteWishlistItem = createAsyncThunk(
  "wishlist/deleteWishlist",
  async (id) => {
    const response = await axios.delete(
      `https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/wishlist/${id}`
    );
    return id;
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
        (item) => item.productId !== action.payload
      );
      state.wishlistValue = state.wishlist.length;
    });
  },
});

export default wishlistSlice.reducer;
