import {useFonts} from 'expo-font';
import {Provider} from 'react-redux';
import {persistor, store} from "./redux/store";
import {PublicSans_300Light, PublicSans_500Medium} from "@expo-google-fonts/public-sans";
import {PersistGate} from "redux-persist/integration/react";
import Navigator from "./page/Navigator";

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
