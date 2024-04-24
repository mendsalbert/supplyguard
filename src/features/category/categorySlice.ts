// src/features/category/categorySlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchCategories as fetchCategoriesAPI } from "./categoryAPI";

interface Category {
  id: string;
  name: string;
  description?: string;
  _rev?: any;
  _id?: any;
}

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCategoriesAPI();
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch categories");
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch categories";
        state.status = "failed";
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categorySlice.reducer;
