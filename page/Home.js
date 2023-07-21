import Carousel from "../section/Carousel";
import VStack from "../component/VStack";
import {styles} from "../constant/style";
import Recent from "../section/Recent";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import HStack from "../component/HStack";
import {todayMessage} from "../utils/days";
import SweetText from "../component/SweetText";

export default function Home() {

    return(
        <VStack style={[styles.px2, styles.py4]} space={10}>

            {/*Top Banner*/}
            <HStack space={15}>
                <MaterialCommunityIcons name="party-popper" size={40} color="orange" />
                <VStack>
                    <SweetText size={32} family="PublicSans_300Light">Mutlu</SweetText>
                    <SweetText size={32}>{todayMessage()}</SweetText>
                </VStack>
                {/*<TouchableOpacity style={{marginLeft: 'auto'}}*/}
                {/*                  onPress={e => Alert.alert("Aktüel MarketCatalogs App from Hatitech")}>*/}
                {/*    <Feather name="info" size={34} color="black" />*/}
                {/*</TouchableOpacity>*/}
            </HStack>

            {/*Carousel*/}
            <Carousel/>

            {/*Recent*/}
            <Recent/>
        </VStack>
    )
}