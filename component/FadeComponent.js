import {useEffect, useState} from "react";
import {Animated, Dimensions} from "react-native";

const {height, width} = Dimensions.get("screen");

export default function FadeComponent(props) {
    const [fadeAnim] = useState(new Animated.Value(props.visible ? 0 : 1));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: props.visible ? 1 : 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, [props.visible]);

    return(
        <Animated.View style={{ position: 'absolute', height: height, width: width, opacity: fadeAnim, zIndex: props.visible ? 1 : 0 }}>
            {props.children}
        </Animated.View>
    );
}