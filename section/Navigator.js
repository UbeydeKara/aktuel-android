import {useEffect} from "react";
import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {StatusBar} from "expo-status-bar";
import {FadeComponent} from "../component";
import {Catalog, Home, MarketCatalogs, Markets, Settings} from "../page";
import {BottomBar} from "./index";

import {getMarkets} from "../redux/actions/MarketAction";
import {getCatalogsRecentlyAdded} from "../redux/actions/CatalogAction";

export default function Navigator() {
    const {pageKey} = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMarkets());
        dispatch(getCatalogsRecentlyAdded());
    }, []);

    return (
        <View style={{flex: 1, backgroundColor: "#F8F6FA"}}>
            <FadeComponent visible={pageKey === "home"}>
                <Home/>
            </FadeComponent>
            <FadeComponent visible={pageKey === "catalog"}>
                <Catalog/>
            </FadeComponent>
            <FadeComponent visible={pageKey === "market_catalogs"}>
                <MarketCatalogs/>
            </FadeComponent>
            <FadeComponent visible={pageKey === "markets"}>
                <Markets/>
            </FadeComponent>
            <FadeComponent visible={pageKey === "settings"}>
                <Settings/>
            </FadeComponent>
            {/*<Alert variant="warning" message="İnternet bağlantınız yok"/>*/}
            {/*StatusBar*/}
            <BottomBar/>
            <StatusBar style="auto"/>
        </View>
    )
}