import {combineReducers} from "redux";
import marketReducer from "./MarketReducer";
import catalogReducer from "./CatalogReducer";
import navigationReducer from "./NavigationReducer";
import alertReducer from "./AlertReducer";
import settingsReducer from "./SettingsReducer";

export default combineReducers({
    marketReducer,
    catalogReducer,
    navigationReducer,
    alertReducer,
    settingsReducer
});