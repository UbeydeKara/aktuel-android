import {View} from "react-native";

export default function HStack({children, centerX, space, ...params}) {
    const viewStyle = {
        flexDirection: 'row',
        alignItems: "center",
        gap: space || 0,
        justifyContent: centerX ? 'center' : 'flex-start',
        ...params.style
    }
    return(
        <View style={viewStyle}>
            {children}
        </View>
    );
}