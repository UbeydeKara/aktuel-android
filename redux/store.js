import {persistReducer, persistStore} from "redux-persist";
import {configureStore} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {alertReducer, catalogReducer, marketReducer, navigationReducer, settingsReducer} from "./reducers";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};

export const store = configureStore({
    reducer: {
        marketReducer: marketReducer,
        catalogReducer: catalogReducer,
        navigationReducer: navigationReducer,
        alertReducer: alertReducer,
        settingsReducer: persistReducer(persistConfig, settingsReducer)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
});

export const persistor = persistStore(store);
