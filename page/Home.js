import Carousel from "../section/Carousel";
import VStack from "../component/VStack";
import Recent from "../section/Recent";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import HStack from "../component/HStack";
import {todayMessage} from "../utils/days";
import SweetText from "../component/SweetText";
import {useSelector} from "react-redux";
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import {View} from "react-native";

export default function Home() {
    const {text, styles, lang} = useSelector(state => state.settingsReducer);

    return(
        <VStack style={[styles.px2, styles.py4]} space={10}>

            {/*Top Banner*/}
            <HStack space={15}>
                <MaterialCommunityIcons name="party-popper" size={40} color="orange" />
                <VStack>
                    <SweetText size={32} family="PublicSans_300Light">{text.happy}</SweetText>
                    <SweetText size={32}>{todayMessage(lang)}</SweetText>
                </VStack>
            </HStack>

            <HStack centerX mt={1}>
                <BannerAd
                    unitId={TestIds.BANNER}
                    size={BannerAdSize.LARGE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </HStack>

            {/*Carousel*/}
            <Carousel/>

            {/*Recent*/}
            <Recent/>
        </VStack>
    )
}
