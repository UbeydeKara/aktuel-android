import {useDispatch, useSelector} from "react-redux";

import {todayMessage} from "../utils/days";
import {HStack, Icon, IconButton, SweetText, VStack} from "../component";
import {Carousel, CatalogList} from "../section";
import Card from "../component/Card";
import {Linking, TouchableOpacity} from "react-native";
import {switchPage} from "../redux/actions/NavigationAction";

export default function Home() {
    const {messages, lang, colors} = useSelector(state => state.settingsReducer);
    const {recentlyAdded} = useSelector(state => state.catalogReducer);
    const dispatch = useDispatch();

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    return (
        <VStack fullHeight pt={8} px={3}>

            {/* Top Section */}
            <HStack space="auto" pb={2}>
                <HStack space={15}>
                    <Card bgColor={colors.primary}>
                        <Icon variant="MaterialCommunityIcons" name="party-popper" size={36} color="secondary"/>
                    </Card>
                    <VStack>
                        <SweetText size={28} thin>{messages.happy}</SweetText>
                        <SweetText size={28} bold>{todayMessage(lang)}</SweetText>
                    </VStack>
                </HStack>
                <TouchableOpacity onPress={() => Linking.openURL('market://details?id=com.hatitech.aktuel')}>
                    <VStack centerX>
                        <Icon variant="Feather" name="star" size={24}/>
                        <SweetText size={11}>{messages.rateTheApp}</SweetText>
                    </VStack>
                </TouchableOpacity>
            </HStack>
            {/* Top Section */}

            <Carousel/>

            {/* CatalogList */}
                <HStack space="auto" mt={2}>
                    <HStack space={10}>
                        <Card radius={15} bgColor={colors.secondary}>
                            <Icon variant="FontAwesome5" name="calendar-week" size={20}/>
                        </Card>
                        <SweetText size={24}>{messages.recentlyAdded}</SweetText>
                    </HStack>
                    <IconButton name="arrow-forward" size={28} onPress={() => handlePageSwitch("last_added")}/>
                </HStack>
                <CatalogList data={recentlyAdded} progressViewOffset={0}/>
            {/* CatalogList */}
        </VStack>)
}
