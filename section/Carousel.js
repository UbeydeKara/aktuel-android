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

export default function Carousel() {
    const {markets} = useSelector(state => state.marketReducer);
    const {styles, text} = useSelector(state => state.settingsReducer);
    const dispatch = useDispatch();


    const handleSelect = (item) => {
        dispatch(selectMarket(item.marketID));
        dispatch(switchPage("market_catalogs", item));
    }

    const handlePageSwitch = (key, item) => {
        dispatch(switchPage(key, item));
    }

    const Item = ({item}) => (
        <TouchableOpacity
            style={[styles.carouselItem, {backgroundColor: item?.tint}]}
            onPress={() => handleSelect(item)}>
            <SvgCssUri
                width="100%"
                height="100%"
                uri={item?.img_path}
            />
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        return item.marketID < 0 ? <Skeleton styleProp={styles.carouselItem}/> : <Item item={item}/>;
    }

    return (
        <VStack space={10}>
            <HStack space="auto">
                <HStack space={15}>
                    <FontAwesome name="shopping-cart" size={22} color={styles.sweet_text.color}/>
                    <SweetText size={24}>{text.markets}</SweetText>
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