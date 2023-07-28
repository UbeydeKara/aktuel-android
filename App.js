import {useFonts} from 'expo-font';
import {Provider} from 'react-redux';
import {store, persistor} from "./redux/store";
import {PublicSans_300Light, PublicSans_500Medium} from "@expo-google-fonts/public-sans";
import {Navigator} from "./section";
import {PersistGate} from "redux-persist/integration/react";

export default function App() {
    const [fontsLoaded] = useFonts({
        PublicSans_300Light,
        PublicSans_500Medium
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Navigator/>
            </PersistGate>
        </Provider>
    );
}
