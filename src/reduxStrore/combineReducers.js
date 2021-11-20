import { combineReducers } from "redux";

import globalReducer from "./globalReducer";

const data = {
  global: globalReducer,
};

const reducers = combineReducers(data);

export default reducers;
