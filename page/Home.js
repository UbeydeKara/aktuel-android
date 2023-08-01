import Carousel from "../section/Carousel";
import VStack from "../component/VStack";
import Recent from "../section/Recent";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import HStack from "../component/HStack";
import {todayMessage} from "../utils/days";
import SweetText from "../component/SweetText";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getMessages} from "../constant/lang";
import {AdBanner} from "../section/AdBanner";

export default function Home() {
    const {lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);

    return(
        <VStack space={10}>
            {/* Top Banner */}
            <HStack space={15}>
                <MaterialCommunityIcons name="party-popper" size={40} color="orange" />
                <VStack>
                    <SweetText size={32} family="PublicSans_300Light">{messages.happy}</SweetText>
                    <SweetText size={32}>{todayMessage(lang)}</SweetText>
                </VStack>
            </HStack>

            {/* Carousel */}
            <Carousel/>

            {/* Ads */}
            <AdBanner/>

            {/* Recent */}
            <Recent/>
        </VStack>
    )
}
