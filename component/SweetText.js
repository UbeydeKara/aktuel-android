import {Text} from "react-native";
import {useSelector} from "react-redux";
import {pixelRatio} from "../utils/pixelRatio";

export default function SweetText(
    {
        children,
        color = "primary",
        size = 14,
        family,
        center,
        my,
        numberOfLines,
        bold,
        thin,
        ...params
    }) {
    const {colors} = useSelector(state => state.settingsReducer);

    const textStyle = {
        fontFamily: (bold && "PublicSans_700Bold") || (thin && "PublicSans_300Light") || "PublicSans_500Medium",
        fontSize: pixelRatio * size,
        textAlign: center && "center",
        color: colors[color],
        marginVertical: my && pixelRatio * my * 5,
        ...params.style
    }

    return(
      <Text numberOfLines={numberOfLines} style={textStyle}>{children}</Text>
    );
}
