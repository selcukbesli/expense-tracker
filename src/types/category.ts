import { ThunkDispatch } from "redux-thunk";

export interface Category {
  id: number;
  name: string;
  type: "expense" | "income";
  color: string;
}

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}

export interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
  id?: number | null;
}

interface GET_START {
  type: "GET_CATEGORIES_START";
}

interface GET_SUCCESS {
  type: "GET_CATEGORIES_SUCCESS";
  payload: Category[];
}

interface GET_ERROR {
  type: "GET_CATEGORIES_ERROR";
  payload: string;
}
interface ADD_START {
  type: "ADD_CATEGORY_START";
}

interface ADD_SUCCESS {
  type: "ADD_CATEGORY_SUCCESS";
  payload: Category;
}

interface ADD_ERROR {
  type: "ADD_CATEGORY_ERROR";
  payload: string;
}
interface UPDATE_START {
  type: "UPDATE_CATEGORY_START";
}

interface UPDATE_SUCCESS {
  type: "UPDATE_CATEGORY_SUCCESS";
  payload: Category;
}

interface UPDATE_ERROR {
  type: "UPDATE_CATEGORY_ERROR";
  payload: string;
}
export type CategoryAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR;

export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
