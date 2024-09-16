import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk("address", async () => {
  const response = await axios.get(
    "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/user/address"
  );
  return response.data;
});

export const postAddress = createAsyncThunk(
  "address/postAddress",
  async (addressData) => {
    const response = await axios.post(
      "https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/user/address",
      addressData
    );
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updatedAddress }) => {
    const response = await axios.put(
      `https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/user/address/${id}`,
      updatedAddress
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id) => {
    const response = await axios.delete(
      `https://major-project-backend-e-comerce-h8l3xa8bw.vercel.app/api/user/address/${id}`
    );
    return id;
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
      state.address = action.payload;
    });
    builder.addCase(postAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.address = state.address.filter((add) => add._id !== action.payload);
    });

    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export default addressSlice.reducer;
