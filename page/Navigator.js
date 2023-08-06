import {useEffect, useMemo} from "react";
import {BackHandler, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {StatusBar} from "expo-status-bar";
import {Alert, PageTransition} from "../component";

import {getMarkets} from "../redux/actions/MarketAction";
import {getCatalogs, getCatalogsRecentlyAdded} from "../redux/actions/CatalogAction";
import BottomBar from "../section/BottomBar";
import {switchPage} from "../redux/actions/NavigationAction";
import {getStyles} from "../constant/style";
import AdBanner from "../section/AdBanner";
import {pages} from "./index";

export default function Navigator() {
    const {pageKey, history} = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();

    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {

            if (history === "home")
                BackHandler.exitApp();

            dispatch(switchPage("back"));
            return true;
        });

        dispatch(getCatalogs())
        dispatch(getMarkets());
        dispatch(getCatalogsRecentlyAdded());

    }, []);

    return (
        <View style={styles.container}>
            {pages.map(item => (
                <PageTransition key={item.key} isActive={pageKey === item.key}>
                    {item.component}
                </PageTransition>
            ))}
            {pageKey !== "home" && pageKey !== "catalog" && <AdBanner overlay unitId="ca-app-pub-8805921975199454/2539698812"/>}
            <Alert/>
            <BottomBar/>
            <StatusBar style="auto"/>
        </View>
    )
}
