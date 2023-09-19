import HStack from "../component/HStack";
import {Icon, SweetText} from "../component";
import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";
import {Animated, TouchableOpacity} from "react-native";
import {useEffect, useRef} from "react";
import {pixelRatio, width} from "../utils/pixelRatio";

const barItem = (item, dispatch, order) => {
    const isActive = item.order === order;

    const {styles, colors} = useSelector(state => state.settingsReducer);

    const color = isActive ? "secondary" : "primary"

    const itemWidth = (width / 4)

    const handleSwitchPage = () => {
        dispatch(switchPage(item.key));
    }

    const scaleValue = useRef(new Animated.Value(isActive ? 0 : 1)).current;

    const xValue = scaleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [45 * pixelRatio, 10 * pixelRatio],
    })

    const xLeft = scaleValue.interpolate({
        inputRange: [0, 1],
        outputRange: [25 * pixelRatio, 10 * pixelRatio],
    })

    const itemStyle = {
        width: itemWidth,
        height: 50 * pixelRatio,
        opacity: !isActive && 0.7
    }

    const bgStyle = {
        position: "absolute",
        top: 2,
        bottom: 2,
        left: 0,
        right: 0,
        backgroundColor: colors.primary,
        borderRadius: 100 * pixelRatio,
        transform: [{scaleX: scaleValue}],
        opacity: scaleValue
    };

    const iconStyle = {
        ...styles.posAbs,
        top: 14 * pixelRatio,
        transform: [{translateX: item.order < order ? xLeft : xValue}]
    }

    const textStyle = {
        ...styles.posAbs,
        top: 17 * pixelRatio,
        left: ((item.title.length * -1) + 35) * pixelRatio,
        transform: [{translateX: xValue}, {scaleX: scaleValue}],
        opacity: scaleValue
    }

    useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: isActive ? 1 : 0,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }, [isActive]);

    return (
        <TouchableOpacity key={item?.key} onPress={handleSwitchPage} style={itemStyle}>
            <Animated.View style={bgStyle}/>
            <Animated.View style={iconStyle}>
                <Icon variant={item.variant} name={item?.icon} size={isActive ? 20 : 22} color={color}/>
            </Animated.View>
            <Animated.View style={textStyle}>
                <SweetText size={11} color={color}>{item.title}</SweetText>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default function BottomBar() {
    const {pageKey} = useSelector(state => state.navigationReducer);
    const dispatch = useDispatch();

    const {styles, messages} = useSelector(state => state.settingsReducer);

    const elements = [
        {key: "home", title: messages.homepage, icon: "home", variant: "Feather", order: 0},
        {key: "favorites", title: messages.favorites, icon: "favorite-outline", variant: "MaterialIcons", order: 1},
        {key: "last_added", title: messages.last_added, icon: "calendar", variant: "Feather", order: 2},
        {key: "markets", title: messages.markets, icon: "storefront", variant: "MaterialIcons", order: 3},
        {key: "settings", title: messages.settings, icon: "settings-outline", variant: "Ionicons", order: 4}];

    return (
        <HStack style={styles.bottomBar}>
            {elements.map(item => {
                return barItem(item, dispatch, elements.find(x => x.key === pageKey)?.order);
            })}
        </HStack>
    );
}
