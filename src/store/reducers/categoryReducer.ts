import { CategoryState, CategoryAction } from "../../types/category";

const defaultState: CategoryState = {
  data: [],
  loading: false,
  error: "",
};

const categoryReducer = (
  state: CategoryState = defaultState,
  action: CategoryAction
) => {
  switch (action.type) {
    case "GET_CATEGORIES_START":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        data: [...action.payload],
        loading: false,
        error: "",
      };

    case "GET_CATEGORIES_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
