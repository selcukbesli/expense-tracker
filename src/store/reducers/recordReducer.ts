import { RecordAction, RecordState } from "../../types/record";

const initialState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

const recordReducer = (
  state = initialState,
  action: RecordAction
): RecordState => {
  switch (action.type) {
    case "GET_RECORDS_START":
    case "ADD_RECORD_START":
    case "UPDATE_RECORD_START":
    case "DELETE_RECORD_START":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "GET_RECORDS_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: "",
      };

    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        data: [action.payload, ...state.data],
        loading: false,
        error: "",
      };

    case "UPDATE_RECORD_SUCCESS":
      return {
        ...state,
        data: state.data.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
        loading: false,
        error: "",
      };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        data: state.data.filter((ctg) => ctg.id !== action.payload),
        loading: false,
        error: "",
      };

    case "GET_RECORDS_ERROR":
    case "ADD_RECORD_ERROR":
    case "UPDATE_RECORD_ERROR":
    case "DELETE_RECORD_ERROR":
      return {
        ...state,
        loading: false,
        error: action.type,
      };

    default:
      return state;
  }
};

export default recordReducer;
