import { CategoryState, CategoryAction } from "../../types/category";

const defaultState: CategoryState = {
  data: [],
  loading: false,
  error: "",
};

const categoryReducer = (
  state = defaultState,
  action: CategoryAction
): CategoryState => {
  switch (action.type) {
    case "GET_CATEGORIES_START":
    case "ADD_CATEGORY_START":
    case "UPDATE_CATEGORY_START":
    case "DELETE_CATEGORY_START":
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

    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        data: [...state.data, action.payload],
        loading: false,
        error: "",
      };

    case "UPDATE_CATEGORY_SUCCESS":
      return {
        ...state,
        data: state.data.map((category) =>
          category.id === action.payload.id ? action.payload : category
        ),
        loading: false,
        error: "",
      };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        data: state.data.filter((ctg) => ctg.id !== action.payload),
        loading: false,
        error: "",
      };

    case "GET_CATEGORIES_ERROR":
    case "ADD_CATEGORY_ERROR":
    case "UPDATE_CATEGORY_ERROR":
    case "DELETE_CATEGORY_ERROR":
      return {
        ...state,
        loading: false,
        error: action.type,
      };

    default:
      return state;
  }
};

export default categoryReducer;
