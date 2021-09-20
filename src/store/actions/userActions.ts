import * as UserTypes from "../../types/user";
import api from "../../utils/api";

export const login =
  (creds: UserTypes.LoginForm) => async (dispatch: UserTypes.UserDispatch) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await api().post<UserTypes.User>("/users/login", creds);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("jwt", response.data.token);
    } catch {
      dispatch({
        type: "LOGIN_ERROR",
        payload: "Login Failed ",
      });
    }
  };
export const isLoggedIn = () => async (dispatch: UserTypes.UserDispatch) => {
  dispatch({ type: "IS_LOGGED_IN_START" });

  try {
    const response = await api().post<UserTypes.User>("/users/is_logged_in");

    dispatch({ type: "IS_LOGGED_IN_SUCCESS", payload: response.data });

    // localStorage.setItem("jwt", response.data.token);
  } catch {
    dispatch({
      type: "IS_LOGGED_IN_ERROR",
      payload: "Token is missing or invalid",
    });
  }
};

export const logout = () => (dispatch: UserTypes.UserDispatch) => {
  localStorage.removeItem("jwt");
  return dispatch({ type: "LOGOUT" });
};
