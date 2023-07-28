import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";

export default function IconButton({name, color, size, ...params}) {
    const {styles} = useSelector(state => state.settingsReducer);

    return(
        <TouchableOpacity style={styles.icon_button} {...params}>
            <Ionicons name={name} size={size || 24} color={color || styles.sweet_text.color} />
        </TouchableOpacity>
    )
}