const defaultState = {
  loading: 0,
  toastData: null,
  user: null,
  country: "USA",
  yearFrom: 1960,
  yearTo: 2020,
  graphs: [],
};
const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];

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
    case "ADD_GRAPH":
      const result1 = insert(
        state.graphs,
        action.payload.index,
        action.payload.graph
      );

      return {
        ...state,
        graphs: result1,
      };
    case "REMOVE_GRAPH":
      state.graphs.remove(action.payload.index);
      return {
        ...state,
      };
    case "REORDER_GRAPH":
      const result = Array.from(state.graphs);
      const [removed] = result.splice(action.payload.moveFrom, 1);
      result.splice(action.payload.moveTo, 0, removed);
      console.log("result", result);
      return {
        ...state,
        graphs: result,
      };
    default:
      return state;
  }
};
export default globalReducer;
