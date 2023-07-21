import {View} from "react-native";

export default function HStack({children, centerX, space, ...params}) {
    const viewStyle = {
        flexDirection: 'row',
        alignItems: "center",
        gap: isNaN(+space) ? 0 : space,
        justifyContent: centerX ? 'center' : space === 'auto' ? 'space-between' :'flex-start',
        ...params.style
    }
    return(
        <View style={viewStyle}>
            {children}
        </View>
    );
}