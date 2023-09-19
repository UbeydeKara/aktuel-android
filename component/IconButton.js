import {TouchableOpacity} from "react-native";
import {useSelector} from "react-redux";
import SweetText from "./SweetText";
import HStack from "./HStack";
import Icon from "./Icon";

export default function IconButton({variant = "Ionicons", name, color = "primary", size = 24, buttonStyle, text, ...params}) {
    const {styles} = useSelector(state => state.settingsReducer);

    return(
        <TouchableOpacity style={styles.icon_button} {...params}>
            <HStack centerX space={10} style={buttonStyle}>
                {text !== undefined && <SweetText size={20} color={color}>{text}</SweetText>}
                <Icon variant={variant} name={name} size={size} color={color}/>
            </HStack>
        </TouchableOpacity>
    )
}
