import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useSelector} from "react-redux";
import {useMemo} from "react";

import {todayMessage} from "../utils/days";
import {getMessages} from "../constant/lang";
import {HStack, SweetText, VStack} from "../component";
import {AdBanner, Carousel, Recent} from "../section";

export default function Home() {
    const {lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);

    return(
        <VStack fullHeight pt={6} px={3}>
            <HStack space={15}>
                <MaterialCommunityIcons name="party-popper" size={36} color="orange" />
                <VStack>
                    <SweetText size={28} family="PublicSans_300Light">{messages.happy}</SweetText>
                    <SweetText size={28}>{todayMessage(lang)}</SweetText>
                </VStack>
            </HStack>
            <Carousel/>
            <AdBanner unitId="ca-app-pub-8805921975199454/6510599960"/>
            <Recent/>
        </VStack>
    )
}
