import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export const fetchCategories = createAsyncThunk("categories", async () => {
  const response = await axios.get(`${API_URL}/api/categories`);
  return response.data;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
    selectedCategories: [],
  },
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategories = action.payload;
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });
  },
});

export const { setSelectedCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
