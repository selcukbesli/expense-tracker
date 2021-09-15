import { combineReducers } from "redux";
import { UserState } from "../types/user";
import { CategoryState } from "../types/category";
import userReducer from "../store/reducers/userReducer";
import categoryReducer from "../store/reducers/categoryReducer";

export interface AppState {
  user: UserState;
  categories: CategoryState;
  //   records: any;
}

const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories: categoryReducer,
  //   records: () => {},
});

export default rootReducer;
