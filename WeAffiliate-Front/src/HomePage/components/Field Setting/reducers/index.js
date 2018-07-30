import { combineReducers } from "redux";

import form from "./form";

import dragndrop from "./dragndrop";


const rootReducer = combineReducers({
  
  form,
  dragndrop
});

export default rootReducer;
