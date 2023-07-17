import {Animated, Text} from "react-native";
import {useEffect, useState} from "react";
import HStack from "./HStack";
import {FontAwesome} from "@expo/vector-icons";
import IconButton from "./IconButton";

export default function Alert({open, variant, message}) {
    const [fadeAnim] = useState(new Animated.Value(open ? 0 : 1));
    const [scale] = useState(new Animated.Value(open ? 0.8 : 1));

    const alertStyle = {
        position: "absolute",
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderRadius: 20,
        left: "10%",
        bottom: 20,
        alignSelf: 'center',
        zIndex: 1,
        backgroundColor: "rgb(255, 247, 205)",
        opacity: fadeAnim,
        transform: [{scaleX: scale}, {scaleY: scale}]
    }

    const alertText = {
        color: "rgb(122, 79, 1)",
        fontFamily: "Belanosima",
        fontSize: 18
    }

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: open ? 1 : 0,
            duration: 200,
            useNativeDriver: true
        }).start();
        Animated.spring(scale, {
            toValue: open ? 1 : 0.8,
            useNativeDriver: true
        }).start();
    }, [open]);

    return(
        <Animated.View style={alertStyle}>
            <HStack>
                <FontAwesome name="warning" size={24} color="#FFC61A" />
                <Text style={alertText}>{message}</Text>
                <IconButton name="close" color="rgb(122, 79, 1)"/>
            </HStack>
        </Animated.View>
    );
}