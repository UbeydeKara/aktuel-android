import {useCallback, useMemo, useState} from "react";
import {FlatList, Image, RefreshControl, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";

import {getCatalogsRecentlyAdded} from "../redux/actions/CatalogAction";
import {switchPage} from "../redux/actions/NavigationAction";

import {formatMultipleDate} from "../utils/dateFormatter";
import {HStack, SweetText} from "../component";
import Skeleton from "../component/Skeleton";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";

const getItemLayout = (data, index) => (
    {length: 300, offset: 300 * index, index}
)

export default function Recent() {
    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const {recentlyAdded} = useSelector(state => state.catalogReducer);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    const handleSwitchPage = (key, item) => {
        dispatch(switchPage(key, item));
    };

    const refreshData = () => {
        setRefresh(true);
        dispatch(getCatalogsRecentlyAdded()).finally(
            () => {
                setRefresh(false);
            }
        )
    };

    const Item = useCallback(({item}) => (
        <TouchableOpacity onPress={() => handleSwitchPage("catalog", item)}
                          style={styles.recentCard}>
            <Image style={styles.imageContainer} source={{uri: item?.images[0]}}/>
            <HStack style={styles.card_footer} centerX space={5}>
                <MaterialIcons name="update" size={18} color="#fff"/>
                <SweetText color="white" size={14}>{formatMultipleDate(item?.startAt, item?.deadline, lang)}</SweetText>
            </HStack>
        </TouchableOpacity>
    ), [recentlyAdded]);

    const renderItem = useCallback(({item}) => {
        return item.catalogID < 0 ? <Skeleton styleProp={styles.recentCard}/> : <Item item={item}/>
    }, [recentlyAdded]);

    return (
        <View style={{flex: 1, flexGrow: 1}}>
            <HStack space={15} my={3}>
                <FontAwesome5 name="calendar-week" size={20} color={styles.sweet_text.color}/>
                <SweetText size={24}>{messages.recentlyAdded}</SweetText>
            </HStack>
            <FlatList
                contentContainerStyle={{paddingBottom: 80}}
                data={recentlyAdded}
                renderItem={renderItem}
                keyExtractor={item => item.catalogID}
                numColumns={2}
                getItemLayout={getItemLayout}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshData}
                    />
                }
            />
        </View>
    );
}
