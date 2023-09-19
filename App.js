import {useEffect} from "react";
import {Provider} from 'react-redux';
import {store} from "./redux/store";

import {useFonts} from 'expo-font';
import {PublicSans_300Light, PublicSans_500Medium, PublicSans_700Bold} from "@expo-google-fonts/public-sans";

import {registerForPushNotificationsAsync} from "./utils/NotificationRegister";

import Navigator from "./page/Navigator";

export default function App() {

    const [fontsLoaded] = useFonts({
        PublicSans_300Light,
        PublicSans_500Medium,
        PublicSans_700Bold
    });

    const getNotifyToken = async() => {
        return await registerForPushNotificationsAsync();
    }

    useEffect(() => {
        getNotifyToken();
    }, []);

    return (
        <Provider store={store}>
            {fontsLoaded && <Navigator/>}
        </Provider>
    );
}
