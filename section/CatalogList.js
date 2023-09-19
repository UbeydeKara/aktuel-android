import {useCallback, useMemo, useState} from "react";
import {FlatList, Image, RefreshControl, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {getCatalogs} from "../redux/actions/CatalogAction";
import {switchPage} from "../redux/actions/NavigationAction";

import {formatMultipleDate} from "../utils/dateFormatter";
import {HStack, Icon, SweetText} from "../component";
import Skeleton from "../component/Skeleton";
import AdBanner from "./AdBanner";
import NoResult from "./NoResult";

export default function CatalogList({data, noResultDialog, contentContainerStyle, progressViewOffset = 100}) {
    const {styles, lang} = useSelector(state => state.settingsReducer);

    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    const handleSwitchPage = (key, item) => {
        dispatch(switchPage(key, item));
    };

    const refreshData = () => {
        setRefresh(true);
        dispatch(getCatalogs()).finally(
            () => {
                setRefresh(false);
            }
        )
    };

    const dataWithAds = useMemo(() => {
        let array = [...data];

        if (!Boolean(array[0]?.type)) {
            let putIndex = 0;
            for (let i = 4; i < data.length; i = i + 4) {
                array.splice(putIndex + i, 0, {type: "ad"});
                array.splice(putIndex + i + 1, 0, {type: "empty"});
                putIndex += 2;
            }
        }

        return array;
    }, [data]);

    const Item = useCallback(({item}) => (
        <TouchableOpacity onPress={() => handleSwitchPage("catalog", item)}
                          style={styles.recentCard}>
            <Image style={styles.imageContainer} source={{uri: item?.images[0]}}/>
            <HStack style={styles.card_footer} centerX space={5}>
                <Icon variant="MaterialIcons" name="update" size={18} color="light"/>
                <SweetText color="light" size={14}>{formatMultipleDate(item?.startAt, item?.deadline, lang)}</SweetText>
            </HStack>
        </TouchableOpacity>
    ), [data]);

    const renderItem = useCallback(({item}) => {
        if (item.type === "empty")
            return <View/>
        else if (item.type === "ad")
            return <AdBanner my={1}/>
        else if (item.type === "adSkeleton")
            return <Skeleton styleProp={{width: "92%", borderRadius: 10, height: 100, marginVertical: 5}}/>
        else if (item.type === "dummy")
            return <Skeleton styleProp={styles.recentCard}/>
        return <Item item={item}/>
    }, [data]);

    return (
            <FlatList
                contentContainerStyle={{...contentContainerStyle, paddingBottom: 75, marginTop: -5}}
                columnWrapperStyle={{justifyContent: dataWithAds?.length > 1 ? "center" : "left"}}
                data={dataWithAds}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={2}
                refreshControl={
                    <RefreshControl
                        progressViewOffset={progressViewOffset}
                        refreshing={refresh}
                        onRefresh={refreshData}
                    />
                }
                ListEmptyComponent={<NoResult message={noResultDialog}/>}
            />
    );
}
