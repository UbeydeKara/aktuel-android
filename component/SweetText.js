import {Text} from "react-native";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {getStyles} from "../constant/style";

export default function SweetText({children, color, size, family, center, ...params}) {
    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const textStyle = {
        fontFamily: family || "PublicSans_500Medium",
        fontSize: size || 14,
        textAlign: center && "center",
        color: color || styles.sweet_text.color,
        ...params.style
    }

    return(
      <Text style={textStyle}>{children}</Text>
    );
}
