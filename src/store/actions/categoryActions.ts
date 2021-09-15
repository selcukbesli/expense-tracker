import { Category, CategoryDispatch } from "../../types/category";
import api from "../../utils/api";

export const getCategories = () => async (dispatch: CategoryDispatch) => {
  dispatch({ type: "GET_CATEGORIES_START" });

  try {
    const response = await api.get<Category[]>("/categories");
    console.log(response);

    dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
  } catch (error: any) {
    dispatch({
      type: "GET_CATEGORIES_ERROR",
      payload: error.response.data.errorMessage,
    });
  }
};
