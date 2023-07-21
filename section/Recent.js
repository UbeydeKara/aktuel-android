import {useState} from "react";
import {FlatList, Image, RefreshControl, Text, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";

import {getCatalogsRecentlyAdded} from "../redux/actions/CatalogAction";
import {switchPage} from "../redux/actions/NavigationAction";

import {styles} from "../constant/style";
import {dateFormatter} from "../utils/dateFormatter";
import {HStack, SweetText, VStack} from "../component";

const Item = ({item, handleSwitchPage}) => (
    <TouchableOpacity onPress={e => handleSwitchPage("catalog", item)}
                      style={[styles.card, styles.shadowProp]}>
        <Image
            style={{width: '100%', height: '100%', borderRadius: 10}}
            source={{uri: item?.img_path}}/>
        <HStack style={styles.card_footer} centerX space={5}>
            <MaterialIcons name="update" size={18} color="#fff"/>
            <SweetText color="white" size={14}>{dateFormatter(item?.deadline)}</SweetText>
        </HStack>
    </TouchableOpacity>
);

export default function Recent({...params}) {
    const {recentlyAdded} = useSelector(state => state.catalogReducer);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    const handleSwitchPage = (key, item) => {
        dispatch(switchPage(key, item));
    }

    const renderItem = ({item}) => {
        return (
            <Item item={item} handleSwitchPage={handleSwitchPage}/>
        );
    }

    const refreshData = () => {
        dispatch(getCatalogsRecentlyAdded());
    }

    return (
        <VStack space={10}>
            <HStack space={15}>
                <FontAwesome5 name="calendar-week" size={20} color="black"/>
                <Text style={styles.subtitle}>Son Eklenenler</Text>
            </HStack>
            <FlatList
                {...params}
                data={recentlyAdded}
                renderItem={renderItem}
                keyExtractor={item => item.catalogID}
                numColumns={2}
                contentContainerStyle={{minHeight: 1400}}
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