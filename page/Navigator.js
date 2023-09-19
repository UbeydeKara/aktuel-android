import {useEffect} from "react";
import {BackHandler, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {StatusBar} from "expo-status-bar";
import {Alert, PageTransition} from "../component";

import {getMarkets} from "../redux/actions/MarketAction";
import {getCatalogs} from "../redux/actions/CatalogAction";
import {switchPage} from "../redux/actions/NavigationAction";
import {pages} from "./index";
import {BottomBar} from "../section";
import {soundPlayer} from "../utils/AudioTool";

export default function Navigator() {
    const {pageKey, history} = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();

    const {styles} = useSelector(state => state.settingsReducer);

    async function stopSound() {
        if (soundPlayer._loaded)
            await soundPlayer.unloadAsync();
    }

    useEffect(() => {
        stopSound();
    }, [pageKey]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (history.length === 0 || history.slice(-1)[0] === "home")
                BackHandler.exitApp();
            else
                dispatch(switchPage("back"));
            return true;
        });

        dispatch(getCatalogs())
        dispatch(getMarkets());
    }, []);

    return (
        <View style={styles.container}>
            {pages.map(item => (
                <PageTransition key={item.key} isActive={pageKey === item.key}>
                    {item.component}
                </PageTransition>
            ))}
            <Alert/>
            <BottomBar/>
            <StatusBar style="auto"/>
        </View>
    )
}
