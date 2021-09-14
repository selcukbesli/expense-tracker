import * as UserTypes from "../../types/user";
import api from "../../utils/api";

export const login =
  (creds: UserTypes.LoginForm) => async (dispatch: UserTypes.UserDispatch) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const response = await api.post<UserTypes.User>("/users/login", creds);

      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem("jwt", response.data.token);
    } catch (err: any) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response.data.errorMessage,
      });
    }
  };
