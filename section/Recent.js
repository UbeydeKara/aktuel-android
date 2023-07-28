import {useState} from "react";
import {FlatList, Image, RefreshControl, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";

import {getCatalogsRecentlyAdded} from "../redux/actions/CatalogAction";
import {switchPage} from "../redux/actions/NavigationAction";

import {formatMultipleDate} from "../utils/dateFormatter";
import {HStack, SweetText, VStack} from "../component";
import Skeleton from "../component/Skeleton";

const Item = ({item, handleSwitchPage, styles, lang}) => (
    <TouchableOpacity onPress={e => handleSwitchPage("catalog", item)}
                      style={[styles.card, styles.shadowProp]}>
        <Image
            style={{width: '100%', height: '100%', borderRadius: 10}}
            source={{uri: item?.images[0]}}/>
        <HStack style={styles.card_footer} centerX space={5}>
            <MaterialIcons name="update" size={18} color="#fff"/>
            <SweetText color="white" size={14}>{formatMultipleDate(item?.startAt, item?.deadline, lang)}</SweetText>
        </HStack>
    </TouchableOpacity>
);

export default function Recent({...params}) {
    const {styles, text, lang} = useSelector(state => state.settingsReducer);
    const {recentlyAdded} = useSelector(state => state.catalogReducer);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    const handleSwitchPage = (key, item) => {
        dispatch(switchPage(key, item));
    }

    const renderItem = ({item}) => {
        return item.catalogID < 0 ?
            <Skeleton styleProp={styles.card}/> :
            <Item item={item} handleSwitchPage={handleSwitchPage} styles={styles} lang={lang}/>
    }

    const refreshData = () => {
        setRefresh(true);
        dispatch(getCatalogsRecentlyAdded()).finally(
            () => {
                setRefresh(false);
            }
        )
    }

    return (
        <VStack space={10}>
            <HStack space={15}>
                <FontAwesome5 name="calendar-week" size={20} color={styles.sweet_text.color}/>
                <SweetText size={24}>{text.recentlyAdded}</SweetText>
            </HStack>
            <FlatList
                contentContainerStyle={{
                    minHeight: 230 * recentlyAdded.length
                }}
                data={recentlyAdded}
                renderItem={renderItem}
                keyExtractor={item => item.catalogID}
                numColumns={2}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshData}
                    />
                }
            />
        </VStack>
    );
}
