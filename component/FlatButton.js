import {Text, TouchableOpacity} from "react-native";
import {styles} from "../constant/style";

export default function FlatButton({children, ...params}) {
    return(
        <TouchableOpacity style={[styles.flat_button, styles.my2]} {...params}>
            <Text style={styles.button_text}>{children}</Text>
        </TouchableOpacity>
    )
}