import {FlatList, TouchableOpacity} from "react-native";
import VStack from "../component/VStack";
import HStack from "../component/HStack";
import {FontAwesome} from "@expo/vector-icons";
import IconButton from "../component/IconButton";
import {SvgCssUri} from "react-native-svg";
import {useDispatch, useSelector} from "react-redux";
import {selectMarket} from "../redux/actions/MarketAction";
import {switchPage} from "../redux/actions/NavigationAction";
import Skeleton from "../component/Skeleton";
import {SweetText} from "../component";
import {useCallback, useMemo} from "react";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";

export default function Carousel() {
    const {markets} = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const handleSelect = (item) => {
        dispatch(selectMarket(item.marketID));
        dispatch(switchPage("market_catalogs", item));
    }

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    const Item = useCallback(({item}) => (
        <TouchableOpacity
            style={[styles.carouselItem, {backgroundColor: item?.tint}]}
            onPress={() => handleSelect(item)}>
            <SvgCssUri
                width="100%"
                height="100%"
                uri={item?.img_path}
            />
        </TouchableOpacity>
    ), [markets]);

    const renderItem = useCallback(({item}) => {
        return item.marketID < 0 ? <Skeleton styleProp={styles.carouselItem}/> : <Item item={item}/>;
    }, [markets]);

    return (
        <VStack>
            <HStack space="auto">
                <HStack space={15}>
                    <FontAwesome name="shopping-cart" size={22} color={styles.sweet_text.color}/>
                    <SweetText size={24}>{messages.markets}</SweetText>
                </HStack>
                <IconButton name="arrow-forward" size={28} onPress={() => handlePageSwitch("markets")}/>
            </HStack>
            <FlatList
                data={markets}
                renderItem={renderItem}
                keyExtractor={item => item.marketID}
                showsHorizontalScrollIndicator={false}
                horizontal
            />
        </VStack>
    )
}
