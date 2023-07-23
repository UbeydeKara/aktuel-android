import {Alert, Dimensions, FlatList, Image, View} from "react-native";
import {useSelector} from "react-redux";

import * as Sharing from 'expo-sharing';
import * as ImageManipulator from "expo-image-manipulator";
import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

import AppBar from "../section/AppBar";
import {HStack, SweetText, VStack} from "../component";
import {styles} from "../constant/style";
import {dateFormatter} from "../utils/dateFormatter";

import ImageZoom from 'react-native-image-pan-zoom';

const Item = ({item}) => (
    <View style={styles.productCard}>
        <Image
            style={{width: '100%', height: '100%', borderRadius: 10, resizeMode: "contain"}}
            source={{uri: item?.img_path}}/>
    </View>
);

const renderItem = ({item}) => {
    return (
        <Item item={item}/>
    );
}

const {width, height} = Dimensions.get("screen");

export default function Catalog() {
    const {navProps} = useSelector(state => state.navigationReducer);
    const appBarTitle =
        navProps?.market?.title + ": "
        + dateFormatter(navProps?.startAt, "DD")
        + "-"
        + dateFormatter(navProps?.deadline, "DD MMMM");

    const onShare = async () => {
        try {
            const image_obj = await ImageManipulator.manipulateAsync(navProps?.img_path);

            const options = {
                mimeType: 'image/png',
                dialogTitle: navProps?.market?.title + " marketindeki ürünleri paylaş"
            }

            await Sharing.shareAsync(image_obj.uri, options);
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <>
            <AppBar
                title={appBarTitle}
                onShare={onShare}/>
            <FlatList
                ListHeaderComponent={
                    <VStack space={15}>
                        <ImageZoom cropWidth={width - 40}
                                   cropHeight={height - 320}
                                   imageWidth={width - 40}
                                   imageHeight={height - 320}
                                   style={{borderRadius: 10}}>
                            <Image style={{width: "100%", height: "100%", resizeMode: "stretch"}}
                                   source={{uri: navProps?.img_path}}/>
                        </ImageZoom>
                        <HStack space={5}>
                            <MaterialCommunityIcons name="calendar-start" size={22} color="black"/>
                            <SweetText size={16}>Kampanya Başlangıç: {dateFormatter(navProps?.startAt)}</SweetText>
                        </HStack>
                        <HStack space={5}>
                            <MaterialCommunityIcons name="calendar-end" size={22} color="black"/>
                            <SweetText size={16}>Kampanya Bitiş: {dateFormatter(navProps?.deadline)}</SweetText>
                        </HStack>
                        {navProps?.products?.length > 0 ?
                            <HStack space={5}>
                                <Entypo name="dropbox" size={22} color="black"/>
                                <SweetText size={24}>Ürünler</SweetText>
                            </HStack> : null}
                    </VStack>
                }
                contentContainerStyle={{paddingVertical: 110, paddingHorizontal: 20}}
                data={navProps?.products}
                renderItem={renderItem}
                keyExtractor={item => item.productID}
            />
        </>
    )
        ;
}