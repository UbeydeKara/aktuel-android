import {View} from "react-native";

export default function HStack({children, centerX, space, mt, my, ...params}) {
    const viewStyle = {
        flexDirection: 'row',
        alignItems: "center",
        gap: isNaN(+space) ? 0 : space,
        justifyContent: centerX ? 'center' : space === 'auto' ? 'space-between' :'flex-start',
        marginTop: mt ? mt * 10 : 0,
        marginVertical: my ? my * 10 : 0,
        ...params.style
    }
    return(
        <View style={viewStyle}>
            {children}
        </View>
    );
}
