import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserState, LoginForm } from "../types/user";

import api from "../utils/api";

const initialState: UserState = {
  data: {} as User,
  loading: false,
  error: "",
};

export const asyncLogin = createAsyncThunk(
  "user/login",
  async (creds: LoginForm) => {
    const response = await api().post<User>("/users/login", creds);
    localStorage.setItem("jwt", response.data.token);

    return response.data;
  }
);
export const asyncIsLoggedIn = createAsyncThunk(
  "user/isLoggedIn",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api().post<User>("/users/is_logged_in");
      return response.data;
    } catch (err: any) {
      localStorage.removeItem("jwt");
      console.log({ err });
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("jwt");
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(asyncLogin.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.type;
    });
    // isLoggedIn
    builder.addCase(asyncIsLoggedIn.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(asyncIsLoggedIn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(asyncIsLoggedIn.rejected, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.data = {} as User;
    });
  },
});

// export const {} = categorySlice.actions
export default userSlice.reducer;
