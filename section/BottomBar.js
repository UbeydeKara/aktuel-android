import {TouchableOpacity} from "react-native";
import HStack from "../component/HStack";
import {SweetText} from "../component";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";
import {useMemo} from "react";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";

const barItem = (item, dispatch, isActive) => {
    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const textColor = isActive ? "orange" : "gray";
    const bgStyle = {
        ...styles.navButton,
        backgroundColor: isActive ? styles.navButton.backgroundColor : "transparent"
    };

    const handleSwitchPage = () => {
        dispatch(switchPage(item.key));
    }

    return <TouchableOpacity key={item?.key} style={bgStyle} onPress={handleSwitchPage}>
        <HStack space={10} centerX>
            {item?.icon === "settings" ? <Ionicons name={item?.icon} size={16} color={textColor}/> :
                <FontAwesome5 name={item?.icon} size={14} color={textColor}/>}
            <SweetText size={13} color={textColor}>{item?.title}</SweetText>
        </HStack>
    </TouchableOpacity>
}

export default function BottomBar() {
    const {pageKey} = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const elements = [
        {key: "home", title: messages.homepage, icon: "home"},
        {key: "markets", title: messages.markets, icon: "store"},
        {key: "settings", title: messages.settings, icon: "settings"}];

    return (
        <HStack style={styles.bottomBar}>
            {elements.map(item => {
                return barItem(item, dispatch, item.key === pageKey);
            })}
        </HStack>
    );
}
