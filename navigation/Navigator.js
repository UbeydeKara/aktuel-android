import {useContext} from "react";
import Home from "../page/Home";
import Catalog from "../page/Catalog";
import {NavigatorContext} from "./NavigatorProvider";
import FadeComponent from "../component/FadeComponent";
import {View} from "react-native";
import Alert from "../component/Alert";

import Market from "../page/Market";
import {StatusBar} from "expo-status-bar";

export default function Navigator() {
    const {page} = useContext(NavigatorContext);

    // const HomeScreen = useCallback(() => {
    //     return <FadeComponent key={0} test={0} visible={page === 0}>
    //         <Home/>
    //     </FadeComponent>
    // }, [page]);
    //
    // const CatalogScreen = useCallback(() => {
    //     return <FadeComponent key={1} test={1} visible={page === 1}>
    //         <Catalog/>
    //     </FadeComponent>
    // }, [page]);
    //
    // const viewScreen = () => {
    //     if (page === 0)
    //         return HomeScreen();
    //     return CatalogScreen();
    // }

    return (
        <View style={{flex: 1}}>
            <FadeComponent key={0} visible={page === 0}>
                <Home/>
            </FadeComponent>
            <FadeComponent key={1} visible={page === 1}>
                <Catalog/>
            </FadeComponent>
            <FadeComponent key={2} visible={page === 2}>
                <Market/>
            </FadeComponent>
            <Alert variant="warning" message="İnternet bağlantınız yok"/>
            {/*StatusBar*/}
            <StatusBar style="auto"/>
        </View>
    )
}