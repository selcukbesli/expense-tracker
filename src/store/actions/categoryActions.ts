import { Category, CategoryDispatch, CategoryForm } from "../../types/category";
import api from "../../utils/api";

export const getCategories = () => async (dispatch: CategoryDispatch) => {
  dispatch({ type: "GET_CATEGORIES_START" });

  try {
    const response = await api.get<Category[]>("/categories");

    dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
  } catch (error: any) {
    dispatch({
      type: "GET_CATEGORIES_ERROR",
      payload: error.response.data.errorMessage,
    });
  }
};

export const addCategory =
  (form: CategoryForm) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "ADD_CATEGORY_START" });

    try {
      const response = await api.post<Category>("categories", form);

      dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: response.data });
    } catch (error: any) {
      dispatch({
        type: "ADD_CATEGORY_ERROR",
        payload: error.response.data.errorMessage,
      });
    }
  };
