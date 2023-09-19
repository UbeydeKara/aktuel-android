import {useEffect, useRef} from "react";
import {Animated} from "react-native";

export default function PageTransition({children, isActive}) {
    const fade = useRef(new Animated.Value(isActive ? 0.5 : 1)).current;

    const scale = fade.interpolate({
        inputRange: [0.5, 1],
        outputRange: [0.95, 1],
    });

    const viewStyle = {
        opacity: fade,
        zIndex: isActive ? 1 : 0,
        transform: [{scaleX: scale}, {scaleY: scale}]
    }

    useEffect(() => {
        Animated.spring(fade, {
            toValue: isActive ? 1 : 0.5,
            duration: 250,
            useNativeDriver: true
        }).start();
    }, [isActive]);

    return isActive && (
        <Animated.View needsOffscreenAlphaCompositing={true} style={viewStyle}>
            {children}
        </Animated.View>
    );
}
