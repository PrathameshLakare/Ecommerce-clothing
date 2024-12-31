import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const placedOrder = createAsyncThunk(
  "order/placedOrder",
  async (shippingAddress) => {
    const response = await axios.post(
      `${API_URL}/api/order/placed`,
      shippingAddress
    );
    return response.data;
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (orderId) => {
    const response = await axios.get(`${API_URL}/api/order/${orderId}`);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placedOrder.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(placedOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.order = action.payload.order;
      });
    builder.addCase(placedOrder.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.status = "loading";
    }),
      builder.addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.order = action.payload;
      });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
