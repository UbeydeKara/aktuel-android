import {Animated} from "react-native";
import {useEffect, useMemo, useState} from "react";
import HStack from "./HStack";
import {FontAwesome} from "@expo/vector-icons";
import IconButton from "./IconButton";
import {useSelector} from "react-redux";
import SweetText from "./SweetText";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";

// TODO: messages should be translated
export default function Alert() {
    const [open, setOpen] = useState(false);
    const [scaleValue] = useState(new Animated.Value(0));
    const {id, message} = useSelector(state => state.alertReducer);

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const scaleStyle = {
        transform: [{scaleX: scaleValue}, {scaleY: scaleValue}],
        elevation: open ? 4 : 0,
        zIndex: open ? 1 : -1
    };

    const handleClose = () => {
        Animated.spring(scaleValue, {
            toValue: 0,
            delay: 3000,
            duration: 500,
            useNativeDriver: true,
        }).start(() => setOpen(false));
    }

    useEffect(() => {
        if (!message) return;

        setOpen(true);
        Animated.spring(scaleValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => handleClose());
    }, [id]);

    return(
        <Animated.View style={[styles.alertStyle, scaleStyle]}>
            <HStack space={10} centerX>
                <FontAwesome name="warning" size={24} color="#FFC61A" />
                <SweetText size={17} color="rgb(122, 79, 1);">{messages.noConnection}</SweetText>
                <IconButton name="close" color="rgb(122, 79, 1)" onPress={handleClose}/>
            </HStack>
        </Animated.View>
    );
}
