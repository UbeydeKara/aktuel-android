import {FlatList, Image, RefreshControl, TouchableOpacity} from "react-native";
import {NavigatorContext} from "../navigation/NavigatorProvider";
import {useContext, useEffect, useState} from "react";
import CatalogService from "../service/catalog-service";
import HStack from "../component/HStack";
import {MaterialIcons} from "@expo/vector-icons";
import {styles} from "../constant/style";
import VStack from "../component/VStack";
import {dateFormatter} from "../utils/dateFormatter";
import SweetText from "../component/SweetText";
import IconButton from "../component/IconButton";

const Item = ({item, switchPage}) => (
    <TouchableOpacity onPress={e => switchPage(1, item)}
                      style={[styles.card, styles.shadowProp]}>
        <Image
            style={{width: '100%', height: '100%', borderRadius: 10}}
            source={{uri: item?.img_path}}/>
        <HStack style={styles.card_footer} centerX={true} space={5}>
            <MaterialIcons name="update" size={22} color="#fff"/>
            <SweetText color="white" size={16}>{dateFormatter(item?.deadline)}</SweetText>
        </HStack>
    </TouchableOpacity>
);

export default function Market({...params}) {
    const [data, setData] = useState([{catalogID: 0}, {catalogID: 1}, {catalogID: 2}, {catalogID: 3}]);
    const {item, switchPage} = useContext(NavigatorContext);
    const [refresh, setRefresh] = useState(false);

    const renderItem = ({item}) => {
        return (
            <Item item={item} switchPage={switchPage}/>
        );
    }

    const getData = async () => {
        setRefresh(true);
        await CatalogService.getAllByMarket().then(
            (res) => {
                setData(res.data.data);
                setRefresh(false);
            }
        )
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <VStack style={[styles.px2, styles.py4]}>
            <HStack style={{justifyContent: "space-between"}}>
                <IconButton name="chevron-back" onPress={e => switchPage(0, null)}/>
                <Image
                    style={{width: '25%', height: '90%', resizeMode: "contain"}}
                    source={item?.img_path}/>
                <IconButton name="share-outline" onPress={e => switchPage(0, null)}/>
            </HStack>
            <FlatList
                {...params}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.catalogID}
                numColumns={2}
                contentContainerStyle={{minHeight: 1400}}
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={getData}
                    />
                }
            />
        </VStack>
    );
}