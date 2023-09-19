import {FlatList, TouchableOpacity} from "react-native";
import {SvgCssUri} from "react-native-svg";
import {useDispatch, useSelector} from "react-redux";
import {selectMarket} from "../redux/actions/MarketAction";
import {switchPage} from "../redux/actions/NavigationAction";
import {useCallback} from "react";
import {HStack, Icon, IconButton, Skeleton, SweetText, VStack} from "../component";
import Card from "../component/Card";

export default function Carousel() {
    const {markets} = useSelector(state => state.marketReducer);
    const dispatch = useDispatch();

    const {messages, styles, colors} = useSelector(state => state.settingsReducer);

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
                <HStack space={10}>
                    <Card radius={15} bgColor={colors.secondary}>
                        <Icon variant="FontAwesome" name="shopping-cart" size={22}/>
                    </Card>
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
