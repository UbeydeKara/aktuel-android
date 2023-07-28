import {Text} from "react-native";
import {useSelector} from "react-redux";

export default function SweetText({children, color, size, family, center, ...params}) {
    const {styles} = useSelector(state => state.settingsReducer);

    const textStyle = {
        fontFamily: family || "PublicSans_500Medium",
        fontSize: size || 14,
        textAlign: center && "center",
        color: color || styles.sweet_text.color,
        ...params.style
    }

    return(
      <Text style={textStyle}>{children}</Text>
    );
}