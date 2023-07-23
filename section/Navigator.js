import {useEffect} from "react";
import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {StatusBar} from "expo-status-bar";
import {Alert, PageTransition} from "../component";
import {Catalog, Home, MarketCatalogs, Markets, Settings} from "../page";

import {getMarkets} from "../redux/actions/MarketAction";
import {getCatalogsRecentlyAdded} from "../redux/actions/CatalogAction";
import BottomBar from "./BottomBar";

export default function Navigator() {
    const {pageKey} = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMarkets());
        dispatch(getCatalogsRecentlyAdded());
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: "#F8F6FA"}}>
            <PageTransition isActive={pageKey === "home"}>
                <Home/>
            </PageTransition>
            <PageTransition isActive={pageKey === "catalog"}>
                <Catalog/>
            </PageTransition>
            <PageTransition isActive={pageKey === "market_catalogs"}>
                <MarketCatalogs/>
            </PageTransition>
            <PageTransition isActive={pageKey === "markets"}>
                <Markets/>
            </PageTransition>
            <PageTransition isActive={pageKey === "settings"}>
                <Settings/>
            </PageTransition>
            <Alert/>
            {/*StatusBar*/}
            <BottomBar/>
            <StatusBar style="auto"/>
        </View>
    )
}