import {Animated} from "react-native";
import {useEffect, useRef} from "react";

export default function Skeleton({styleProp}) {
    const fadeAnim = useRef(new Animated.Value(0.4)).current;

    const style = {
        ...styleProp,
        backgroundColor: "#252836",
        opacity: fadeAnim
    }

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.2,
                    duration: 1000,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.4,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start();
    }, []);

    return(
        <Animated.View style={style}></Animated.View>
    );
}
