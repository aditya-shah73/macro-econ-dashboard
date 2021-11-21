const defaultState = {
  loading: 0,
  toastData: null,
  user: null,
  country: "USA",
  yearFrom: 1960,
  yearTo: 2020,
};

const globalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "START_LOADER":
      return {
        ...state,
        loading: state.loading + 1,
      };
    case "STOP_LOADER":
      return {
        ...state,
        loading: state.loading - 1,
      };
    case "SET_TOAST_DATA":
      return {
        ...state,
        toastData: action.payload,
      };
    case "CLEAR_TOAST_DATA":
      return {
        ...state,
        toastData: null,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "YEARFROM":
      return {
        ...state,
        yearFrom: action.payload,
      };
    case "YEARTO":
      return {
        ...state,
        yearTo: action.payload,
      };
    default:
      return state;
  }
};
export default globalReducer;
