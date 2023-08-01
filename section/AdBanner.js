import {BannerAd, BannerAdSize} from "react-native-google-mobile-ads";
import {HStack} from "../component";

export const AdBanner = () => (
    <HStack centerX>
        <BannerAd
            unitId="ca-app-pub-8805921975199454/6510599960"
            size={BannerAdSize.LARGE_BANNER}/>
    </HStack>
);
