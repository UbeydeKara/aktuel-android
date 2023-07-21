import {useContext} from "react";
import {FlatList, TouchableOpacity} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {HStack, IconButton, SweetText, VStack} from "../component";
import {styles} from "../constant/style";

import {SvgCssUri} from "react-native-svg";
import {selectMarket} from "../redux/actions/MarketAction";
import {switchPage} from "../redux/actions/NavigationAction";

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

    const renderItem = ({item}) => {
        return (
            <Item item={item} handleSelect={handleSelect}/>
        );
    }

    const handleSelect = (item) => {
        dispatch(selectMarket(item));
        dispatch(switchPage("market_catalogs", item));
    }

    return (
        <VStack style={[styles.px2, styles.py4]}>
            <HStack space={15}>
                <IconButton name="chevron-back" onPress={e => switchPage(0, null)}/>
                <SweetText size={24}>Marketler</SweetText>
            </HStack>
            <FlatList
                data={markets}
                renderItem={renderItem}
                keyExtractor={item => item.marketID}
                numColumns={2}
                contentContainerStyle={{minHeight: 1400}}
                showsVerticalScrollIndicator={false}
            />
        </VStack>
    );
}