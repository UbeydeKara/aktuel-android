import {useCallback, useMemo, useState} from "react";
import {Dimensions, FlatList, RefreshControl, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {HStack, IconButton, SweetText, VStack} from "../component";

import {SvgCssUri} from "react-native-svg";
import {getMarkets, selectMarket} from "../redux/actions/MarketAction";
import {switchPage} from "../redux/actions/NavigationAction";
import Skeleton from "../component/Skeleton";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";
import {AdBanner} from "../section/AdBanner";

const {height} = Dimensions.get("screen");

export default function Markets() {
    const {markets} = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

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
        <VStack>
            <HStack space={15}>
                <IconButton name="chevron-back" onPress={() => handlePageSwitch("back")}/>
                <SweetText size={24}>{messages.markets}</SweetText>
            </HStack>
            <FlatList
                data={markets}
                renderItem={renderItem}
                keyExtractor={item => item.marketID}
                numColumns={2}
                style={{height: height - 280}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={refreshData}/>
                }
            />
            <AdBanner/>
        </VStack>
    );
}
