import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryForm,
  CategoryState,
  UpdateArgs,
} from "../types/category";
import api from "../utils/api";

const initialState: CategoryState = {
  data: [],
  loading: false,
  error: "",
};

export const asyncGetCategories = createAsyncThunk(
  "categories/get",
  async (_, thunkAPI) => {
    const response = await api().get<Category[]>("/categories");
    //thunkAPI: object containing all of the Redux parameters  can be used here

    return response.data.sort((a, b) => b.id - a.id);
  }
);

export const asyncAddCategory = createAsyncThunk(
  "category/add",
  async (form: CategoryForm) => {
    const response = await api().post<Category>("categories", form);
    return response.data;
  }
);

export const asyncUpdateCategory = createAsyncThunk(
  "category/update",
  async ({ form, categoryId }: UpdateArgs) => {
    const response = await api().put<Category>(
      `/categories/${categoryId}`,
      form
    );
    return response.data;
  }
);
export const asyncDeleteCategory = createAsyncThunk(
  "category/delete",
  async (categoryId: number) => {
    await api().delete(`/categories/${categoryId}`);
    return categoryId;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET CATEGORIES
    builder.addCase(asyncGetCategories.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncGetCategories.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncGetCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // ADD CATEGORY
    builder.addCase(asyncAddCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncAddCategory.fulfilled, (state, action) => {
      state.data.splice(0, 0, action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncAddCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // UPDATE CATEGORY
    builder.addCase(asyncUpdateCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncUpdateCategory.fulfilled, (state, action) => {
      state.data = state.data.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
      state.loading = false;
      state.error = "";
      // action.meta can be accesible here !!
    });
    builder.addCase(asyncUpdateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // DELETE CATEGORY
    builder.addCase(asyncDeleteCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncDeleteCategory.fulfilled, (state, action) => {
      state.data = state.data.filter((ctg) => ctg.id !== action.payload);
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncDeleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
  },
});

// export const {} = categorySlice.actions
export default categorySlice.reducer;
