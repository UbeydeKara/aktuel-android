import {Dimensions, FlatList, Image} from "react-native";
import {useSelector} from "react-redux";

import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

import AppBar from "../section/AppBar";
import {HStack, SweetText, VStack} from "../component";
import {dateFormatter, formatMultipleDate} from "../utils/dateFormatter";

import ImageZoom from 'react-native-image-pan-zoom';
import {useRef} from "react";
import {BannerAd, BannerAdSize, TestIds} from "react-native-google-mobile-ads";
import Share from 'react-native-share';
import base64File from "../utils/base64Converter";

const Item = ({item, styles, width, height}) => {
    const scaleValue = useRef(1);

    return (
        <ImageZoom cropWidth={width}
                   cropHeight={height}
                   imageWidth={width}
                   imageHeight={height}
                   style={styles.productCard}
                   onStartShouldSetPanResponder={(e) => {
                       return e.nativeEvent.touches.length === 2 || scaleValue.current > 1;
                   }}
                   onMove={({scale}) => {
                       scaleValue.current = scale;
                   }}>
            <Image style={styles.imageContainer}
                   source={{uri: item}}/>
        </ImageZoom>
    )
}

const {width, height} = Dimensions.get("screen");

export default function Catalog() {
    const {navProps} = useSelector(state => state.navigationReducer);
    const {styles, text, lang} = useSelector(state => state.settingsReducer);

    const appBarTitle =
        navProps?.market?.title + ": "
        + formatMultipleDate(navProps?.startAt, navProps?.deadline, lang)

    const catalogItem = ({item}) => {
        return (
            <Item item={item} styles={styles} height={(height - 330)} width={(width - 50)}/>
        );
    }

    const productItem = ({item}) => {
        return (
            <Item item={item} styles={styles} height={250} width={300}/>
        );
    }



    const onShare = async () => {
        const base64Images = [];

        for (const url of navProps?.images) {
            const base64Image = await base64File(url);
            base64Images.push(base64Image);
        }

        const shareOptions = {
            title: text.shareDialog,
            urls: base64Images,
            failOnCancel: false,
        };

        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error on sharing => ', error);
        }
    };

    return (
        <>
            <AppBar
                title={appBarTitle}
                onShare={onShare}/>

            <FlatList
                contentContainerStyle={{paddingVertical: 110, paddingHorizontal: 20}}
                data={navProps?.images}
                renderItem={catalogItem}
                keyExtractor={(item, index) => index}
                ListFooterComponent={
                    <VStack space={15}>
                        <HStack space={5} mt={1}>
                            <MaterialCommunityIcons name="calendar-start" size={22} color={styles.sweet_text.color}/>
                            <SweetText size={16}>{text.offerStart}: {dateFormatter(navProps?.startAt, lang)}</SweetText>
                        </HStack>
                        <HStack space={5}>
                            <MaterialCommunityIcons name="calendar-end" size={22} color={styles.sweet_text.color}/>
                            <SweetText size={16}>{text.offerEnd}: {dateFormatter(navProps?.deadline, lang)}</SweetText>
                        </HStack>
                        <HStack centerX mt={1}>
                            <BannerAd
                                unitId={TestIds.BANNER}
                                size={BannerAdSize.LARGE_BANNER}
                                requestOptions={{
                                    requestNonPersonalizedAdsOnly: true,
                                }}
                            />
                        </HStack>
                        <FlatList
                            data={navProps?.products}
                            renderItem={productItem}
                            keyExtractor={(item, index) => index}
                            ListHeaderComponent={
                                <HStack space={5} my={1}>
                                    <Entypo name="dropbox" size={22} color={styles.sweet_text.color}/>
                                    <SweetText size={24}>{text.products}</SweetText>
                                </HStack>
                            }
                        />
                    </VStack>
                }
            />
        </>
    )
}
