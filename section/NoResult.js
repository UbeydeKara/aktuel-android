import {Image, View} from "react-native";

import {Icon, IconButton, SweetText, VStack} from "../component";
import {soundPlayer} from "../utils/AudioTool";

const playStyle = {
    position: "absolute",
    bottom: 15,
    right: 15
};

export default function NoResult({message}) {
    async function playSound() {
        if(!soundPlayer._loaded)
            await soundPlayer.loadAsync(require('../assets/static/meow.mp3'));
        await soundPlayer.playAsync();
    }

    return (
        <VStack centerX mt={2}>
            <View style={{overflow: "hidden", borderRadius: 50, aspectRatio: 0.9, width: "85%"}}>
                <Image style={{height: "100%", width: "100%"}} onTouchStart={playSound}
                       source={require("../assets/static/cat-sad.gif")}/>
                <IconButton size={40} color="light" name="play-outline" style={playStyle} onPress={playSound}/>
            </View>
            <SweetText size={24} style={{textAlign: "center"}} my={3}>
                {message}
            </SweetText>
            <Icon variant="FontAwesome5" name="sad-cry" size={48} color="orange"/>
        </VStack>

    );
}
