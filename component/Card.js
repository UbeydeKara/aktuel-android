import {View} from "react-native";
import {pixelRatio} from "../utils/pixelRatio";
import {useSelector} from "react-redux";

export default function Card(
    {
        children,
        noShadow,
        bgColor,
        radius,
        padding = 10,
        params
    }) {

    const {colors} = useSelector(state => state.settingsReducer);

    const defaultStyle = {
        backgroundColor: "#fff",
        shadowColor: colors.shadowColor,
        elevation: 4,
        borderRadius: 20,
        padding: padding * pixelRatio
    }

    const style = {
        ...defaultStyle,
        borderRadius: radius * pixelRatio || defaultStyle.borderRadius,
        backgroundColor: bgColor || defaultStyle.backgroundColor,
        elevation: noShadow ? 0 : defaultStyle.elevation
    }

    return (
        <View style={style} {...params}>
            {children}
        </View>
    );
};
