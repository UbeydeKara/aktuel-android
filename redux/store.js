import {configureStore} from "@reduxjs/toolkit";
import {alertReducer, catalogReducer, marketReducer, navigationReducer, settingsReducer} from "./reducers";

export const store = configureStore({
    reducer: {
        marketReducer: marketReducer,
        catalogReducer: catalogReducer,
        navigationReducer: navigationReducer,
        alertReducer: alertReducer,
        settingsReducer: settingsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false
        }),
});
