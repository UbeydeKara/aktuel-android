import {useFonts} from 'expo-font';
import Navigator from "./section/Navigator";
import {Provider} from 'react-redux';
import store from "./redux/store";
import {PublicSans_300Light, PublicSans_500Medium} from "@expo-google-fonts/public-sans";

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
            <Navigator/>
        </Provider>
    );
}
