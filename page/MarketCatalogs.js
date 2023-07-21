import {useState} from "react";
import {FlatList, Image, RefreshControl, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {MaterialIcons} from "@expo/vector-icons";

import {SvgCssUri} from "react-native-svg";

import {getCatalogsByMarket} from "../redux/actions/CatalogAction";
import {switchPage} from "../redux/actions/NavigationAction";

import {styles} from "../constant/style";
import {dateFormatter} from "../utils/dateFormatter";
import NoResult from "../section/NoResult";
import {HStack, IconButton, SweetText, VStack} from "../component";

const Item = ({item, handlePageSwitch}) => (
    <TouchableOpacity onPress={e => handlePageSwitch("catalog", item)}
                      style={[styles.card, styles.shadowProp]}>
        <Image
            style={{width: '100%', height: '100%', borderRadius: 10}}
            source={{uri: item?.img_path}} resizeMode="stretch"/>
        <HStack style={styles.card_footer} centerX={true} space={5}>
            <MaterialIcons name="update" size={22} color="#fff"/>
            <SweetText color="white" size={16}>{dateFormatter(item?.deadline)}</SweetText>
        </HStack>
    </TouchableOpacity>
);

export default function MarketCatalogs({...params}) {
    const [refresh, setRefresh] = useState(false);

    const {selectedMarket} = useSelector(state => state.marketReducer);
    const {catalogsByMarket} = useSelector(state => state.catalogReducer);
    const dispatch = useDispatch();

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage("catalog", item));
    }

    const renderItem = ({item}) => {
        return (
            <Item item={item} handlePageSwitch={handlePageSwitch}/>
        );
    }

    const refreshData = () => {
        setRefresh(true);
        dispatch(getCatalogsByMarket(selectedMarket)).then(
            () => {
                setRefresh(false);
            }
        );
    }

    return (
        <VStack style={[styles.px2, styles.py4]} space={15}>
            <HStack space={15}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("home")}/>
                <SvgCssUri
                    width="20%"
                    height="80%"
                    uri={selectedMarket?.img_path}
                />
            </HStack>
            <FlatList
                {...params}
                data={catalogsByMarket}
                renderItem={renderItem}
                keyExtractor={item => item.catalogID}
                numColumns={2}
                contentContainerStyle={{minHeight: catalogsByMarket.length > 0 ? 1400 : 0}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshData}
                    />
                }
            />
            <NoResult resultSize={catalogsByMarket.length}/>
        </VStack>
    );
}