import {useFonts} from 'expo-font';
import Navigator from "./navigation/Navigator";
import {NavigatorProvider} from "./navigation/NavigatorProvider";

export default function App() {

    const [fontsLoaded] = useFonts({
        'Belanosima': require('./assets/fonts/Belanosima-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigatorProvider>
            <Navigator/>
        </NavigatorProvider>);
}
