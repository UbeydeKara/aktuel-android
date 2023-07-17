import React, {createRef, useCallback, useRef, useState} from 'react';
import {Animated, View} from 'react-native';
import {PanGestureHandler, PinchGestureHandler, State} from 'react-native-gesture-handler';


const AnimatedImage = ({source}) => {
    const [panEnabled, setPanEnabled] = useState(false);
    const scale = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    const pinchRef = createRef();
    const panRef = createRef();

    const onPinchEvent = Animated.event([{
            nativeEvent: { scale }
        }],
        { useNativeDriver: true });

    const onPanEvent = Animated.event([{
            nativeEvent: {
                translationX: translateX,
                translationY: translateY
            }
        }],
        { useNativeDriver: true });

    const handlePinchStateChange = ({ nativeEvent }) => {
        // enabled pan only after pinch-zoom
        if (nativeEvent.state === State.ACTIVE) {
            setPanEnabled(true);
        }

        // when scale < 1, reset scale back to original (1)
        const nScale = nativeEvent.scale;
        if (nativeEvent.state === State.END) {
            if (nScale < 1) {
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true
                }).start();
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true
                }).start();

                setPanEnabled(false);
            }
        }
    };

    const onHandlerStateChange = useCallback(() => {
        translateX.extractOffset();
        translateY.extractOffset();
    }, []);

    return (
        <View style={{overflow: "hidden"}}>
            <PanGestureHandler
                enabled
                onGestureEvent={onPanEvent}
                ref={panRef}
                simultaneousHandlers={[pinchRef]}
                minDist={0}
                minDeltaY={100}
                shouldCancelWhenOutside>
                <Animated.View>
                    <PinchGestureHandler
                        ref={pinchRef}
                        onGestureEvent={onPinchEvent}
                        simultaneousHandlers={[panRef]}
                        onHandlerStateChange={handlePinchStateChange}>
                        <Animated.Image
                            source={source}
                            style={{
                                width: '100%',
                                height: '100%',
                                transform: [{scale}, {translateX}, {translateY}]
                            }}
                            resizeMode="contain"/>
                    </PinchGestureHandler>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};


export default AnimatedImage;