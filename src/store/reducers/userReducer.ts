import { User, UserAction, UserState } from "../../types/user";

const defaultState: UserState = {
  data: {} as User,
  loading: false,
  error: "",
};

const userReducer = (
  state: UserState = defaultState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case "LOGIN_START":
    case "IS_LOGGED_IN_START":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "LOGIN_SUCCESS":
    case "IS_LOGGED_IN_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };

    case "LOGIN_ERROR":
    case "IS_LOGGED_IN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        data: {} as User,
      };

    default:
      return state;
  }
};

export default userReducer;
