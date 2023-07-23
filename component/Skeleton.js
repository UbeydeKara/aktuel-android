import {Animated, Easing} from "react-native";
import {useEffect, useState} from "react";

export default function Skeleton({styleProp}) {
    const [fadeAnim] = useState(new Animated.Value(1));

    const style = {
        ...styleProp,
        backgroundColor: "lightgray",
        opacity: fadeAnim
    }

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    return(
        <Animated.View style={style}></Animated.View>
    );
}