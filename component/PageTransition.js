import {useEffect, useState} from "react";
import {Animated, Dimensions} from "react-native";

const {height, width} = Dimensions.get("screen");

export default function PageTransition({children, isActive}) {
    const [scale] = useState(new Animated.Value(isActive ? 0.95 : 1));
    const [fade] = useState(new Animated.Value(isActive ? 0 : 1));

    const viewStyle = {
        position: 'absolute',
        height: height,
        width: width,
        paddingVertical: 40,
        paddingHorizontal: 20,
        opacity: fade,
        zIndex: isActive ? 1 : 0,
        transform: [{scaleX: scale}, {scaleY: scale}]
    }

    useEffect(() => {
        Animated.parallel([
            Animated.spring(fade, {
                toValue: isActive ? 1 : 0,
                duration: 250,
                useNativeDriver: true
            }),
            Animated.spring(scale, {
                toValue: isActive ? 1 : 0.95,
                duration: 250,
                useNativeDriver: true
            })
        ]).start();
    }, [isActive]);

    return(
        <Animated.View needsOffscreenAlphaCompositing={true} style={viewStyle}>
            {children}
        </Animated.View>
    );
}
