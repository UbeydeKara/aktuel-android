import {View} from "react-native";
import {pixelRatio} from "../utils/pixelRatio";

export default function VStack({children, space, centerX, pt, px, mt, my, mb, fullHeight, ...params}) {

    const viewStyle = {
        alignItems: centerX && "center",
        paddingTop: pt && pixelRatio * pt * 5,
        paddingHorizontal: px && pixelRatio * px * 5,
        marginTop: mt && pixelRatio * mt * 5,
        marginVertical: my && pixelRatio * my * 5,
        marginBottom: mb && pixelRatio * mb * 5,
        height: fullHeight && "100%",
        ...params.style
    }

    return (
        <View style={viewStyle}>
            {children}
        </View>
    );
}
