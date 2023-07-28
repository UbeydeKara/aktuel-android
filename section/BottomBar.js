import {TouchableOpacity} from "react-native";
import HStack from "../component/HStack";
import {SweetText} from "../component";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";

const barItem = (item, dispatch, isActive) => {
    const {styles} = useSelector(state => state.settingsReducer);
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
    const {text, styles} = useSelector(state => state.settingsReducer);
    const dispatch = useDispatch();

    const elements = [
        {key: "home", title: text.homepage, icon: "home"},
        {key: "markets", title: text.markets, icon: "store"},
        {key: "settings", title: text.settings, icon: "settings"}];

    return (
        <HStack style={styles.bottomBar}>
            {elements.map(item => {
                return barItem(item, dispatch, item.key === pageKey);
            })}
        </HStack>
    );
}