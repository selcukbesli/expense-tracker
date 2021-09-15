import { ThunkDispatch } from "redux-thunk";

export interface Category {
  id: number;
  name: string;
  type: string;
  color: string;
}

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
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
export type CategoryAction = GET_START | GET_SUCCESS | GET_ERROR;

export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
