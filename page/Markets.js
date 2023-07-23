import {useContext, useState} from "react";
import {FlatList, RefreshControl, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {HStack, IconButton, SweetText, VStack} from "../component";
import {styles} from "../constant/style";

import {SvgCssUri} from "react-native-svg";
import {getMarkets, selectMarket} from "../redux/actions/MarketAction";
import {switchPage} from "../redux/actions/NavigationAction";
import Skeleton from "../component/Skeleton";

const Item = ({item, handleSelect}) => (
    <TouchableOpacity onPress={() => handleSelect(item)}
                      style={[styles.marketCard, styles.shadowProp, {backgroundColor: item.tint}]}>
        <SvgCssUri
            width="100%"
            height="100%"
            uri={item?.img_path}
        />
    </TouchableOpacity>
);

export default function Markets() {
    const {markets} = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(false);

    const renderItem = ({item}) => {
        return item?.marketID < 0 ? <Skeleton styleProp={styles.marketCard}/> : <Item item={item} handleSelect={handleSelect}/>
    }

    const handleSelect = (item) => {
        dispatch(selectMarket(item));
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
        <VStack style={[styles.px2, styles.py4]}>
            <HStack space={15}>
                <IconButton name="chevron-back" onPress={e => handlePageSwitch("back")}/>
                <SweetText size={24}>Marketler</SweetText>
            </HStack>
            <FlatList
                data={markets}
                renderItem={renderItem}
                keyExtractor={item => item.marketID}
                numColumns={2}
                contentContainerStyle={{minHeight: 1400}}
                showsVerticalScrollIndicator={false}
                refreshControl={
                <RefreshControl refreshing={refresh} onRefresh={refreshData}/>
                }
            />
        </VStack>
    );
}