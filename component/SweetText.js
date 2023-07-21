import {Text} from "react-native";

export default function SweetText({children, color, size, family, ...params}) {
    const textStyle = {
        fontFamily: family || "PublicSans_500Medium",
        color: color || "#000",
        fontSize: size || 14,
        ...params.style
    }

    return(
      <Text style={textStyle}>{children}</Text>
    );
}