import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "../reducers/adminReducer.js";

export default combineReducers({
  admin: adminReducer,
});
