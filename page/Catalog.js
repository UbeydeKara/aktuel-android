import {Alert, Text} from "react-native";
import {NavigatorContext} from "../navigation/NavigatorProvider";
import {useContext} from "react";
import VStack from "../component/VStack";
import {styles} from "../constant/style";
import AnimatedImage from "../component/AnimatedImage";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import IconButton from "../component/IconButton";
import HStack from "../component/HStack";
import {MaterialIcons} from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import {dateFormatter} from "../utils/dateFormatter";

export default function Catalog() {
    const {item, switchPage} = useContext(NavigatorContext);

    const onShare = async () => {
        try {
            const { uri: localUri } = await FileSystem.downloadAsync(item?.img_path.uri,
                FileSystem.documentDirectory + item?.store + ".png");
            await Sharing.shareAsync(localUri, {
                dialogTitle: item?.store + "'deki ucuz ürünlere göz at" + "\n" + item?.img_path.uri,
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    return (
        <VStack style={[styles.px2, styles.py4]}>
            <HStack style={{justifyContent: "space-between"}}>
                <IconButton name="chevron-back" onPress={e => switchPage(0, null)}/>
                <Text style={[styles.subtitle]}>{item?.store} Hafta 14</Text>
                <IconButton name="share-outline" onPress={onShare}/>
            </HStack>
            <GestureHandlerRootView style={{height: '80%', zIndex: 2}}>
                <AnimatedImage source={{uri: item?.img_path}}/>
            </GestureHandlerRootView>
            <HStack style={{zIndex: 0}} space={15}>
                <MaterialIcons name="update" size={24} color="black"/>
                <Text style={[styles.subtitle2]}>Kampanya Son Gün: {dateFormatter(item?.deadline)}</Text>
            </HStack>
        </VStack>
    );
}