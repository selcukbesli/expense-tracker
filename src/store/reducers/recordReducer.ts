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

    case "GET_RECORDS_ERROR":
    case "ADD_RECORD_ERROR":
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
