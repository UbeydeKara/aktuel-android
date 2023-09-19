import {Dimensions, FlatList, Image, View} from "react-native";
import {useSelector} from "react-redux";

import {HStack, Icon, SweetText, VStack} from "../component";
import {dateFormatter} from "../utils/dateFormatter";

import ImageZoom from 'react-native-image-pan-zoom';
import {useCallback, useMemo, useRef} from "react";
import {pixelRatio} from "../utils/pixelRatio";
import {AdBanner, AppBar} from "../section";
import Card from "../component/Card";

const {width, height} = Dimensions.get("screen");

export default function Catalog() {
    const {navProps} = useSelector(state => state.navigationReducer);
    const {messages, styles, lang, colors} = useSelector(state => state.settingsReducer);

    const imagesWithAds = useMemo(() => {
        let array = [...navProps?.images];
        let putIndex = 0;

        for (let i = 1; i < navProps?.images.length; i = i + 4) {
            array.splice(putIndex + i, 0, {type: "ad"});
            array.splice(putIndex + i + 1, 0, {type: "empty"});
            putIndex += 2;
        }

        return array;
    }, [navProps?.images]);

    const productsWithAds = useMemo(() => {
        let array = [...navProps?.products];
        let putIndex = 0;

        for (let i = 4; i < navProps?.products.length; i = i + 4) {
            array.splice(putIndex + i, 0, {type: "ad"});
            array.splice(putIndex + i + 1, 0, {type: "empty"});
            putIndex += 2;
        }

        return array;
    }, [navProps?.products]);

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

    const catalogItem = useCallback(({item}) => {
        if (item.type === "empty")
            return <View/>
        else if (item.type === "ad")
            return <AdBanner my={1} isBig/>
        return <Item item={item} height={(height - (330 * pixelRatio))} width={(width - 50)}/>
    }, [navProps.images]);

    const productItem = useCallback(({item}) => {
        if (item.type === "empty")
            return <View/>
        else if (item.type === "ad")
            return <AdBanner my={1} isBig/>
        return <Item item={item} height={(width - 150)} width={(width - 100)}/>
    }, [navProps.products]);

    return (
        <>
            <AppBar/>

            <FlatList
                contentContainerStyle={{paddingVertical: 100 * pixelRatio, justifyContent: "center"}}
                data={imagesWithAds}
                renderItem={catalogItem}
                keyExtractor={(item, index) => index}
                ListFooterComponent={
                    <VStack px={4}>

                        <HStack space={10} mt={3}>
                            <Card radius={15} bgColor={colors.secondary} padding={8}>
                                <Icon variant="MaterialCommunityIcons" name="calendar-start" size={22}/>
                            </Card>
                            <SweetText size={16}>{messages.offerStart}: {dateFormatter(navProps?.startAt, lang)}</SweetText>
                        </HStack>

                        <HStack space={10} mt={2} mb={1}>
                            <Card radius={15} bgColor={colors.secondary} padding={8}>
                                <Icon variant="MaterialCommunityIcons" name="calendar-end" size={22}/>
                            </Card>
                            <SweetText size={16}>{messages.offerEnd}: {dateFormatter(navProps?.deadline, lang)}</SweetText>
                        </HStack>

                        <FlatList
                            data={productsWithAds}
                            renderItem={productItem}
                            keyExtractor={(item, index) => index}
                            ListHeaderComponent={
                            navProps?.products?.length > 0 ?
                                <HStack space={10} mt={5} mb={2}>
                                    <Card radius={15} bgColor={colors.secondary}>
                                        <Icon variant="Entypo" name="dropbox" size={22}/>
                                    </Card>
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
