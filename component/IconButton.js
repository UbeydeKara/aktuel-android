import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getStyles} from "../constant/style";
import SweetText from "./SweetText";
import HStack from "./HStack";

export default function IconButton({name, color, size, buttonStyle, text, ...params}) {
    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

    return(
        <TouchableOpacity style={styles.icon_button} {...params}>
            <HStack centerX space={10} style={buttonStyle}>
                {text !== undefined && <SweetText size={20} color={color}>{text}</SweetText>}
                <Ionicons name={name} size={size || 24} color={color || styles.sweet_text.color} />
            </HStack>
        </TouchableOpacity>
    )
}
