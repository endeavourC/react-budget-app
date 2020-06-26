import { combineReducers } from "redux";

import budget from "./budget.reducer";
import common from "./common.reducer";
const RootReducer = combineReducers({
  budget,
  common
});

export default RootReducer;
