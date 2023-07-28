import {combineReducers} from "redux";
import marketReducer from "./MarketReducer";
import catalogReducer from "./CatalogReducer";
import navigationReducer from "./NavigationReducer";
import alertReducer from "./AlertReducer";
import settingsReducer from "./SettingsReducer";
import {persistReducer} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export default combineReducers({
    marketReducer,
    catalogReducer,
    navigationReducer,
    alertReducer,
    settingsReducer: persistReducer(persistConfig, settingsReducer)
});