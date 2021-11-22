import { combineReducers } from "redux";
import currencyReducer from "./currencyReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
});
