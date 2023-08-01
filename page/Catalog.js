import {Dimensions, FlatList, Image} from "react-native";
import {useSelector} from "react-redux";

import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

import AppBar from "../section/AppBar";
import {HStack, SweetText, VStack} from "../component";
import {dateFormatter, formatMultipleDate} from "../utils/dateFormatter";

import ImageZoom from 'react-native-image-pan-zoom';
import {useCallback, useMemo, useRef} from "react";
import Share from 'react-native-share';
import base64File from "../utils/base64Converter";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";
import {AdBanner} from "../section/AdBanner";

const {width, height} = Dimensions.get("screen");
const catalogHeight = height - 330;

const getCatalogItemLayout = (data, index) => (
    {length: catalogHeight, offset: catalogHeight * index, index}
)

const getProductItemLayout = (data, index) => (
    {length: 250, offset: 250 * index, index}
)

export default function Catalog() {
    const {navProps} = useSelector(state => state.navigationReducer);
    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    const appBarTitle =
        navProps?.market?.title + ": "
        + formatMultipleDate(navProps?.startAt, navProps?.deadline, lang)

    const onShare = async () => {
        const base64Images = [];

        for (const url of navProps?.images) {
            const base64Image = await base64File(url);
            base64Images.push(base64Image);
        }

        const shareOptions = {
            title: messages.shareDialog,
            urls: base64Images,
            failOnCancel: false,
        };

        try {
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error on sharing => ', error);
        }
    };

    const Item = useCallback(({item, width, height}) => {
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
    }, [navProps]);

    const catalogItem = useCallback(({item}) => (
        <Item item={item} height={(height - 330)} width={(width - 50)}/>
    ), [navProps.images]);

    const productItem = useCallback(({item}) => (
        <Item item={item} height={250} width={300}/>
    ), [navProps.products]);

    return (
        <>
            <AppBar
                title={appBarTitle}
                onShare={onShare}/>

            <FlatList
                contentContainerStyle={{paddingVertical: 60}}
                data={navProps?.images}
                renderItem={catalogItem}
                keyExtractor={(item, index) => index}
                getItemLayout={getCatalogItemLayout}
                ListFooterComponent={
                    <VStack space={15}>
                        <HStack space={5} mt={1}>
                            <MaterialCommunityIcons name="calendar-start" size={22} color={styles.sweet_text.color}/>
                            <SweetText size={16}>{messages.offerStart}: {dateFormatter(navProps?.startAt, lang)}</SweetText>
                        </HStack>
                        <HStack space={5}>
                            <MaterialCommunityIcons name="calendar-end" size={22} color={styles.sweet_text.color}/>
                            <SweetText size={16}>{messages.offerEnd}: {dateFormatter(navProps?.deadline, lang)}</SweetText>
                        </HStack>
                        <AdBanner/>
                        <FlatList
                            data={navProps?.products}
                            renderItem={productItem}
                            keyExtractor={(item, index) => index}
                            getItemLayout={getProductItemLayout}
                            ListHeaderComponent={
                            navProps?.products?.length > 0 ?
                                <HStack space={5} my={1}>
                                    <Entypo name="dropbox" size={22} color={styles.sweet_text.color}/>
                                    <SweetText size={24}>{messages.products + " (" + navProps?.products?.length + ")"}</SweetText>
                                </HStack> : null
                            }
                        />
                    </VStack>
                }
            />
        </>
    )
}
