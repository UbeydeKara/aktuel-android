import {useCallback, useState} from "react";
import {FlatList, RefreshControl, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {HStack, IconButton, Skeleton, SweetText} from "../component";

import {SvgCssUri} from "react-native-svg";
import {getMarkets, selectMarket} from "../redux/actions/MarketAction";
import {switchPage} from "../redux/actions/NavigationAction";
import {pixelRatio} from "../utils/pixelRatio";

export default function Markets() {
    const {markets} = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);

    const {styles, messages} = useSelector(state => state.settingsReducer);

    const Item = useCallback(({item, handleSelect, styles}) => (
        <TouchableOpacity onPress={() => handleSelect(item)}
                          style={[styles.marketCard, {backgroundColor: item.tint}]}>
            <SvgCssUri
                width="100%"
                height="100%"
                uri={item?.img_path}
            />
        </TouchableOpacity>
    ), [markets]);

    const renderItem = useCallback(({item}) => {
        return item?.marketID < 0 ?
            <Skeleton styleProp={styles.marketCard}/> :
            <Item item={item} handleSelect={handleSelect} styles={styles}/>
    }, [markets]);

    const handleSelect = (item) => {
        dispatch(selectMarket(item.marketID));
        dispatch(switchPage("market_catalogs", item));
    }

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    const refreshData = () => {
        setRefresh(true);
        dispatch(getMarkets()).finally(
            () => {
                setRefresh(false);
            }
        );
    }

    return (
        <>
            <HStack space={15} style={{...styles.appBar, justifyContent: "flex-start"}}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("back")}/>
                <SweetText size={24}>{messages.markets}</SweetText>
            </HStack>
            <FlatList
                data={markets}
                contentContainerStyle={{ paddingVertical: 100 * pixelRatio, paddingHorizontal: 15 * pixelRatio}}
                renderItem={renderItem}
                keyExtractor={item => item.marketID}
                numColumns={2}
                refreshControl={<RefreshControl refreshing={refresh} onRefresh={refreshData}
                                                progressViewOffset={100}/>}
            />
        </>
    );
}
