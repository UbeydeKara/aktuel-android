import {useEffect, useState} from "react";
import {Animated} from "react-native";

export default function PageTransition({children, isActive}) {
    const [scale] = useState(new Animated.Value(isActive ? 0.95 : 1));
    const [fade] = useState(new Animated.Value(isActive ? 0.5 : 1));

    const viewStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: fade,
        zIndex: isActive ? 1 : 0,
        transform: [{scaleX: scale}, {scaleY: scale}]
    }

    useEffect(() => {
        Animated.parallel([
            Animated.spring(fade, {
                toValue: isActive ? 1 : 0.5,
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

    if(isActive) {
        return(
            <Animated.View needsOffscreenAlphaCompositing={true} style={viewStyle}>
                {children}
            </Animated.View>
        );
    }
}
