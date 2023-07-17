import Carousel from "../section/Carousel";
import VStack from "../component/VStack";
import {styles} from "../constant/style";
import {Alert, Text, TouchableOpacity} from "react-native";
import Recent from "../section/Recent";
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import HStack from "../component/HStack";
import {todayMessage} from "../utils/days";
import SweetText from "../component/SweetText";

export default function Home() {
    return(
        <VStack style={[styles.px2, styles.py4]}>

            {/*Top Banner*/}
            <HStack space={15}>
                <MaterialCommunityIcons name="party-popper" size={36} color="orange" />
                <SweetText size={32} style={{width: "50%"}}>{todayMessage()}</SweetText>
                <TouchableOpacity style={{marginLeft: 'auto'}}
                                  onPress={e => Alert.alert("Aktüel Market App from Hatitech")}>
                    <Feather name="info" size={34} color="black" />
                </TouchableOpacity>
            </HStack>

            {/*Carousel*/}
            <Carousel/>

            {/*Recent*/}
            <Recent/>
        </VStack>
    )
}