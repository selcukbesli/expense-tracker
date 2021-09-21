import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { UserState } from "../types/user";
import { CategoryState } from "../types/category";
import userReducer from "../store/userSlice";
import categoryReducer from "../store/categorySlice";
import { RecordState } from "../types/record";
import recordReducer from "./recordSlice";

export interface AppState {
  user: UserState;
  categories: CategoryState;
  records: RecordState;
}
const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
    records: recordReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
