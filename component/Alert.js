import {Animated} from "react-native";
import {useEffect, useRef, useState} from "react";
import HStack from "./HStack";
import IconButton from "./IconButton";
import {useSelector} from "react-redux";
import SweetText from "./SweetText";
import Icon from "./Icon";

export default function Alert() {
    const [open, setOpen] = useState(false);
    const scaleValue = useRef(new Animated.Value(0)).current;
    const {id, message} = useSelector(state => state.alertReducer);

    const {styles, messages} = useSelector(state => state.settingsReducer);

    const scaleStyle = {
        transform: [{scaleX: scaleValue}, {scaleY: scaleValue}],
        elevation: open ? 4 : 0,
        zIndex: open ? 1 : -1
    };

    const handleClose = (delay) => {
        Animated.spring(scaleValue, {
            toValue: 0,
            delay: delay,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setOpen(false))
    }

    const handleOpen = () => {
        setOpen(true);
        Animated.spring(scaleValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => handleClose(3000));
    }

    useEffect(() => {
        if (message)
            handleOpen();
    }, [id]);

    return (
        <Animated.View style={[styles.alertStyle, scaleStyle]}>
            <HStack space={10} centerX>
                <Icon variant="FontAwesome" name="warning" size={24} color="warning"/>
                <SweetText size={17} color="alert">{messages.noConnection}</SweetText>
                <IconButton name="close" color="alert" onPress={() => handleClose(0)}/>
            </HStack>
        </Animated.View>
    );
}
