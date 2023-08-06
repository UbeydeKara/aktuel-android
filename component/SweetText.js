import {Text} from "react-native";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getStyles} from "../constant/style";
import {pixelRatio} from "../utils/pixelRatio";

export default function SweetText({children, color, size = 14, family, center, my, ...params}) {
    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const textStyle = {
        fontFamily: family || "PublicSans_500Medium",
        fontSize: pixelRatio * size,
        textAlign: center && "center",
        color: color || styles.sweet_text.color,
        marginVertical: my && pixelRatio * my * 5,
        ...params.style
    }

    return(
      <Text style={textStyle}>{children}</Text>
    );
}
