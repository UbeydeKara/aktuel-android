import {Text} from "react-native";

export default function SweetText({children, color, size, ...params}) {
    const textStyle = {
        fontFamily: "Belanosima",
        color: color || "#000",
        fontSize: size || 16,
        ...params.style
    }

    return(
      <Text style={textStyle}>{children}</Text>
    );
}