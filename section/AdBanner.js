import {BannerAd, BannerAdSize} from "react-native-google-mobile-ads";
import {useEffect, useMemo, useState} from "react";
import {Animated} from "react-native";
import {adsRatio, pixelRatio} from "../utils/pixelRatio";
import {useSelector} from "react-redux";
import {getStyles} from "../constant/style";
import {UNIT_TEST_ID} from "../utils/AdUnitIds";

export default function AdBanner({unitId = UNIT_TEST_ID, overlay}) {
    const [loaded, setLoad] = useState(false);
    const [height] = useState(new Animated.Value(0));
    const [fade] = useState(new Animated.Value(0));

    const {theme} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const style = {
        ...styles.adsMenu,
        height: height,
        opacity: fade,
        position: overlay && "absolute",
        bottom: overlay && 60 * adsRatio,
        marginTop: !overlay && loaded && 15 * pixelRatio
    };

    useEffect(() => {
        if (!loaded)
            return;

        Animated.parallel([
            Animated.spring(fade, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false
            }),
            Animated.spring(height, {
                toValue: 105,
                duration: 250,
                useNativeDriver: false
            })
        ]).start();
    }, [loaded]);

        return(
            <Animated.View style={style}>
                <BannerAd
                    unitId={UNIT_TEST_ID}
                    size={BannerAdSize.LARGE_BANNER}
                    requestOptions={{requestNonPersonalizedAdsOnly: true}}/>
            </Animated.View>
    )
};
