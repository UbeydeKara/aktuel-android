import {BannerAd, BannerAdSize} from "react-native-google-mobile-ads";
import {UNIT_DEFAULT_ID} from "../constant/AdUnitIds";
import {useState} from "react";
import {HStack, Skeleton} from "../component";

export default function AdBanner({unitId = UNIT_DEFAULT_ID, isBig, my}) {
    const [loaded, setLoaded] = useState(false);

    const adSize = isBig ? BannerAdSize.MEDIUM_RECTANGLE : BannerAdSize.LARGE_BANNER;

    return (
        <HStack centerX my={my}>
                <BannerAd
                    unitId={unitId}
                    size={adSize}
                    requestOptions={{requestNonPersonalizedAdsOnly: true}}
                    onAdLoaded={() => setLoaded(true)}/>
                {!loaded && <Skeleton styleProp={{width: 320, height: "100%", borderRadius: 10, position: "absolute"}}/>}
            </HStack>
    )
};
