import { combineReducers } from "redux";

import resetReducer from "./reset.js";

const allReducers = combineReducers({
  resetReducer,
});

export default allReducers