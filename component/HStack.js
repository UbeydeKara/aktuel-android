import {View} from "react-native";
import {pixelRatio} from "../utils/pixelRatio";

export default function HStack({children, centerX, space, mt, my, mb, pt, pb, px, bgcolor, ...params}) {

    const viewStyle = {
        flexDirection: 'row',
        alignItems: "center",
        columnGap: isNaN(+space) ? 0 : space,
        justifyContent: centerX ? 'center' : space === 'auto' ? 'space-between' : 'flex-start',
        marginTop: mt && mt * pixelRatio * 5,
        marginVertical: my && my * pixelRatio * 5,
        marginBottom: mb && mb * pixelRatio * 5,
        paddingTop: pt && pt * pixelRatio * 5,
        paddingBottom: pb && pb * pixelRatio * 5,
        paddingHorizontal: px && px * pixelRatio * 5,
        backgroundColor: bgcolor,
        ...params.style
    }

    return(
        <View style={viewStyle}>
            {children}
        </View>
    );
}
