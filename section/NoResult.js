import {useEffect, useMemo, useState} from 'react';
import {Image, View} from "react-native";

import {Audio} from 'expo-av';
import {FontAwesome5} from "@expo/vector-icons";

import {IconButton, SweetText, VStack} from "../component";
import {useSelector} from "react-redux";
import {getMessages} from "../constant/lang";

const playStyle = {
    position: "absolute",
    bottom: 15,
    right: 15
};

export default function NoResult() {
    const [sound, setSound] = useState();
    const {pageKey} = useSelector(state => state.navigationReducer);

    const {lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);

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
        <VStack centerX mt={2}>
            <View style={{overflow: "hidden", borderRadius: 50, aspectRatio: 0.9, width: "85%"}}>
                <Image style={{height: "100%", width: "100%"}} onTouchStart={playSound}
                       source={require("../assets/static/cat-sad.gif")}/>
                <IconButton size={40} color="whitesmoke" name="play-outline" style={playStyle} onPress={playSound}/>
            </View>
            <SweetText size={24} style={{textAlign: "center"}} my={3}>
                {messages.noResultDialog}
            </SweetText>
            <FontAwesome5 name="sad-cry" size={48} color="orange"/>
        </VStack>

    );
}
