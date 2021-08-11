import { combineReducers } from "redux";
import userReducer from "../store/reducers/userReducer";
import { UserState } from "../types/user";

interface AppState {
  user: UserState;
  categories: any;
  records: any;
}
const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories: () => {},
  records: () => {},
});

export default rootReducer;
