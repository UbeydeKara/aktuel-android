import {Animated} from "react-native";
import {useEffect, useState} from "react";
import HStack from "./HStack";
import {FontAwesome} from "@expo/vector-icons";
import IconButton from "./IconButton";
import {useSelector} from "react-redux";
import SweetText from "./SweetText";

export default function Alert() {
    const [open, setOpen] = useState(false);
    const [scaleValue] = useState(new Animated.Value(0));
    const {id, message} = useSelector(state => state.alertReducer);
    const {styles} = useSelector(state => state.settingsReducer);

    const scaleStyle = {
        transform: [{scaleX: scaleValue}, {scaleY: scaleValue}],
        elevation: open ? 4 : 0,
        zIndex: open ? 1 : -1
    };

    const handleClose = () => {
        Animated.spring(scaleValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setOpen(false);
    }

    useEffect(() => {
        if (!message) return;
        Animated.spring(scaleValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        setOpen(true);
    }, [id]);

    return(
        <Animated.View style={[styles.alertStyle, scaleStyle]}>
            <HStack space={10} centerX>
                <FontAwesome name="warning" size={24} color="#FFC61A" />
                <SweetText size={17} color="rgb(122, 79, 1);">{message}</SweetText>
                <IconButton name="close" color="rgb(122, 79, 1)" onPress={handleClose}/>
            </HStack>
        </Animated.View>
    );
}