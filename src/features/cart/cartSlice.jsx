import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get(`${API_URL}/api/cart`);
    return response.data;
  }
);

export const postCartData = createAsyncThunk(
  "cart/postCartItems",
  async (cartData) => {
    await axios.post(`${API_URL}/api/cart`, cartData);

    const response = await axios.get(`${API_URL}/api/cart`);
    return response.data;
  }
);

export const updateCartData = createAsyncThunk(
  "cart/updateCartDetails",
  async ({ id, updatedData }) => {
    await axios.put(`${API_URL}/api/updateCart/${id}`, updatedData);

    const response = await axios.get(`${API_URL}/api/cart`);
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const response = await axios.delete(`${API_URL}/api/cart/${id}`);
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartValue: 0,
    status: "idle",
    error: null,
    totalCartPrice: 0,
  },
  reducers: {
    setTotalCartPrice: (state, action) => {
      state.totalCartPrice = action.payload;
    },
    clearCart: (state, action) => {
      state.cart = [];
      state.cartValue = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartData.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartValue = state.cart.length;
      state.status = "success";
    });
    builder.addCase(fetchCartData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(postCartData.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.cartValue = state.cart.length;
      state.status = "success";
    });
    builder.addCase(postCartData.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteCartItem.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload.product.productId
      );
      state.cartValue = state.cart.length;
    });
    builder.addCase(updateCartData.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "success";
    });
  },
});

export const { setTotalCartPrice, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
