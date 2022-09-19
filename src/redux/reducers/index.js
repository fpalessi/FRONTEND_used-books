// We combining every reducer on this file

import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import alertReducer from "./alertReducer";

// combineReducers() will get us an unique reducer

export default combineReducers({
  books: booksReducer,
  alert: alertReducer,
});
