import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAddress = createAsyncThunk("address", async () => {
  const response = await axios.get(`${API_URL}/api/user/address`);
  return response.data;
});

export const postAddress = createAsyncThunk(
  "address/postAddress",
  async (addressData) => {
    const response = await axios.post(
      `${API_URL}/api/user/address`,
      addressData
    );
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updatedAddress }) => {
    const response = await axios.post(
      `${API_URL}/api/user/address/${id}`,
      updatedAddress
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id) => {
    const response = await axios.delete(`${API_URL}/api/user/address/${id}`);

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.address = action.payload;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(postAddress.fulfilled, (state, action) => {
      state.status = "success";
      state.address.push(action.payload.product);
    });
    builder.addCase(postAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(updateAddress.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.status = "success";
      const updatedAddress = action.payload;
      state.address = state.address.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr
      );
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      const id = action.payload.address._id;
      state.address = state.address.filter((add) => add._id !== id);
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default addressSlice.reducer;
