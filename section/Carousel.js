import {FlatList, Image, Text, TouchableOpacity} from "react-native";
import VStack from "../component/VStack";
import HStack from "../component/HStack";
import {FontAwesome5} from "@expo/vector-icons";
import {styles} from "../constant/style";
import {useContext} from "react";
import {NavigatorContext} from "../navigation/NavigatorProvider";

const data = [
    {
        id: 0,
        title: "Bim",
        img_path: require("../assets/static/bim_logo.png")
    },
    {
        id: 1,
        title: "A101",
        img_path: require("../assets/static/a101_logo.png")
    },
    {
        id: 2,
        title: "Şok",
        img_path: require("../assets/static/sok_logo.png")
    }
];

export default function Carousel() {
    const {switchPage} = useContext(NavigatorContext);

    const Item = ({item}) => (
        <TouchableOpacity
            style={{width: 340, height: 150, marginHorizontal: 5, overflow: "hidden"}}
            onPress={() => switchPage(2, item)}>
            <Image
                style={{width: '100%', height: '90%', resizeMode: "contain"}}
                source={item?.img_path}/>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => {
        return (
            <Item item={item}/>
        );
    }

    return (
        <VStack>
            <HStack space={15}>
                <FontAwesome5 name="store" size={18} color="black" />
                <Text style={styles.subtitle}>Marketler</Text>
            </HStack>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                persistentScrollbar
            />
        </VStack>
    )
}