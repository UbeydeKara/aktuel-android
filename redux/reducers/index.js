import {combineReducers} from "redux";
import marketReducer from "./MarketReducer";
import catalogReducer from "./CatalogReducer";
import navigationReducer from "./NavigationReducer";

export default combineReducers({
    marketReducer,
    catalogReducer,
    navigationReducer
});