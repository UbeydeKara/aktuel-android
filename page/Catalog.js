import {Dimensions, FlatList, Image} from "react-native";
import {useSelector} from "react-redux";

import {Entypo, MaterialCommunityIcons} from "@expo/vector-icons";

import {HStack, SweetText, VStack} from "../component";
import {dateFormatter, formatMultipleDate} from "../utils/dateFormatter";

import ImageZoom from 'react-native-image-pan-zoom';
import {useCallback, useMemo, useRef} from "react";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";
import {imageRatio} from "../utils/pixelRatio";
import {AdBanner, AppBar} from "../section";

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
        <Item item={item} height={(height - (330 * imageRatio))} width={(width - 50)}/>
    ), [navProps.images]);

    const productItem = useCallback(({item}) => (
        <Item item={item} height={(width - 150)} width={(width - 100)}/>
    ), [navProps.products]);

    return (
        <>
            <AppBar title={appBarTitle} images={navProps?.images}/>

            <FlatList
                contentContainerStyle={{paddingVertical: 100}}
                data={navProps?.images}
                renderItem={catalogItem}
                keyExtractor={(item, index) => index}
                getItemLayout={getCatalogItemLayout}
                ListFooterComponent={
                    <VStack px={4}>
                        <HStack space={5} mt={3}>
                            <MaterialCommunityIcons name="calendar-start" size={22} color={styles.sweet_text.color}/>
                            <SweetText size={16}>{messages.offerStart}: {dateFormatter(navProps?.startAt, lang)}</SweetText>
                        </HStack>
                        <HStack space={5} mt={3} mb={1}>
                            <MaterialCommunityIcons name="calendar-end" size={22} color={styles.sweet_text.color}/>
                            <SweetText size={16}>{messages.offerEnd}: {dateFormatter(navProps?.deadline, lang)}</SweetText>
                        </HStack>

                        <AdBanner unitId="ca-app-pub-8805921975199454/2272482800"/>

                        <FlatList
                            data={navProps?.products}
                            renderItem={productItem}
                            keyExtractor={(item, index) => index}
                            getItemLayout={getProductItemLayout}
                            ListHeaderComponent={
                            navProps?.products?.length > 0 ?
                                <HStack space={5} mt={4} mb={2}>
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
