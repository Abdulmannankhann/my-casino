import { combineReducers } from "redux";
import UserReducer from "./userRedux";

const rootReducer = combineReducers({
  user: UserReducer,
});

export default rootReducer;
