import {useSelector} from "react-redux";
import {iconComponents} from "../utils/iconComponents";
import {pixelRatio} from "../utils/pixelRatio";

export default function Icon({variant = "Ionicons", name, color = "primary", size = 24, ...params}) {
    const {colors} = useSelector(state => state.settingsReducer);
    const IconComponent = iconComponents[variant];

    return(
        <IconComponent name={name} size={size * pixelRatio} color={colors[color]} {...params}/>
    )
}
