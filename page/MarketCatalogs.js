import {useCallback, useMemo, useState} from "react";
import {FlatList, Image, RefreshControl, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {MaterialIcons} from "@expo/vector-icons";

import {SvgCssUri} from "react-native-svg";
import {switchPage} from "../redux/actions/NavigationAction";

import {formatMultipleDate} from "../utils/dateFormatter";
import {HStack, IconButton, SweetText, VStack, Skeleton} from "../component";
import {getStyles} from "../constant/style";
import {getCatalogs} from "../redux/actions/CatalogAction";
import {NoResult} from "../section";

export default function MarketCatalogs() {
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    // reducers
    const {selectedMarket, markets} = useSelector(state => state.marketReducer);
    const {catalogs} = useSelector(state => state.catalogReducer);
    const {theme, lang} = useSelector(state => state.settingsReducer);

    // styles
    const styles = useMemo(() => getStyles(theme), [theme]);

    const market = markets.find(x => x.marketID === selectedMarket);
    const catalogsByMarket = catalogs?.filter(x => x.market?.marketID === selectedMarket);

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    const refreshData = () => {
        setRefresh(true);
        dispatch(getCatalogs()).then(
            () => {
                setRefresh(false);
            }
        );
    }

    const Item = useCallback(({item}) => (
        <TouchableOpacity onPress={() => handlePageSwitch("catalog", item)}
                          style={styles.recentCard}>
            <Image
                style={{width: '100%', height: '100%', borderRadius: 10}}
                source={{uri: item?.images[0]}} resizeMode="stretch"/>
            <HStack style={styles.card_footer} centerX space={5}>
                <MaterialIcons name="update" size={18} color="#fff"/>
                <SweetText color="white" size={14}>{formatMultipleDate(item?.startAt, item?.deadline, lang)}</SweetText>
            </HStack>
        </TouchableOpacity>
    ), [catalogsByMarket]);

    const renderItem = useCallback(({item}) => {
        return item.catalogID < 0 ? <Skeleton styleProp={styles.recentCard}/> : <Item item={item}/>
    }, [catalogsByMarket]);

    return (
        <VStack fullHeight pt={6} px={3}>
            <HStack space={5} mb={2}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("back")}/>
                <SvgCssUri
                    width="20%"
                    height="80%"
                    uri={market?.img_path}
                />
            </HStack>
            <FlatList
                data={catalogsByMarket}
                renderItem={renderItem}
                keyExtractor={item => item.catalogID}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 165}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={refreshData}
                    />
                }
                ListEmptyComponent={<NoResult/>}
            />
        </VStack>
    );
}
