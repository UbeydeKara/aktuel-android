import {useEffect, useState} from 'react';
import {Image, View} from "react-native";

import {Audio} from 'expo-av';
import {FontAwesome5} from "@expo/vector-icons";

import {IconButton, SweetText, VStack} from "../component";
import {useSelector} from "react-redux";

const playStyle = {
  position: "absolute",
  bottom: 15,
  right: 15
};

export default function NoResult({resultSize}) {
    const [sound, setSound] = useState();
    const {pageKey} = useSelector(state => state.navigationReducer);

    async function playSound() {
        const {sound} = await Audio.Sound.createAsync(require('../assets/static/meow.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    }

    async function stopSound() {
        if (sound)
            await sound.unloadAsync();
    }

    useEffect(() => {
        stopSound();
    }, [pageKey]);

    return (
        <View>
            {resultSize === 0 ?
                <VStack space={15} centerX>
                    <View style={{overflow: "hidden", borderRadius: 50}}>
                        <Image style={{height: 400, width: 300}} onTouchStart={playSound}
                               source={require("../assets/static/cat-sad.gif")}/>
                        <IconButton size={40} color="whitesmoke" name="play-outline" style={playStyle} onPress={playSound}/>
                    </View>
                    <SweetText size={26} style={{textAlign: "center"}}>
                        Aradığınız markete ait güncel katalog bulamadık
                    </SweetText>
                    <FontAwesome5 name="sad-cry" size={50} color="orange"/>
                </VStack>
                : null}
        </View>

    );
}