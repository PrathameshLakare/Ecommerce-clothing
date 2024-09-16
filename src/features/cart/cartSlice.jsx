import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/cart"
    );
    return response.data;
  }
);

export const postCartData = createAsyncThunk(
  "cart/postCartItems",
  async (cartData) => {
    await axios.post(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/cart",
      cartData
    );

    const response = await axios.get(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/cart"
    );
    return response.data;
  }
);

export const updateCartData = createAsyncThunk(
  "cart/updateCartDetails",
  async ({ id, updatedData }) => {
    await axios.put(
      `https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/updateCart/${id}`,
      updatedData
    );

    const response = await axios.get(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/cart"
    );
    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const response = await axios.delete(
      `https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/cart/${id}`
    );
    return id;
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
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
      state.cartValue = state.cart.length;
    });
    builder.addCase(updateCartData.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.status = "success";
    });
  },
});

export const { setTotalCartPrice } = cartSlice.actions;

export default cartSlice.reducer;
