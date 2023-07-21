import {TouchableOpacity} from "react-native";
import {styles} from "../constant/style";
import {Ionicons} from "@expo/vector-icons";

export default function IconButton({name, color, size, ...params}) {
    return(
        <TouchableOpacity style={styles.icon_button} {...params}>
            <Ionicons name={name} size={size || 24} color={color || "black"} />
        </TouchableOpacity>
    )
}