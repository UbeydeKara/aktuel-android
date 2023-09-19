import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";
import {HStack, IconButton, SweetText} from "../component";
import {useState} from "react";
import base64File from "../utils/base64Converter";
import Share from "react-native-share";
import {ActivityIndicator} from "react-native";
import {formatMultipleDate} from "../utils/dateFormatter";
import {add_favorite, remove_favorite} from "../redux/actions/CatalogAction";

export default function AppBar() {
    const dispatch = useDispatch();
    const [animating, setAnimate] = useState(false);

    const {navProps} = useSelector(state => state.navigationReducer);
    const {styles, messages, lang} = useSelector(state => state.settingsReducer);
    const {favorites} = useSelector(state => state.catalogReducer);

    const inFavorite = favorites.includes(navProps?.catalogID);
    const favColor = inFavorite ? "fav" : "primary";
    const favIcon = inFavorite ? "favorite" : "favorite-outline";

    const appBarTitle =
        navProps?.market?.title + ": "
        + formatMultipleDate(navProps?.startAt, navProps?.deadline, lang)

    const handlePageSwitch = () => {
        dispatch(switchPage("back"));
    };

    const onShare = async () => {
        setAnimate(true);
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
            setAnimate(false);
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Error on sharing => ', error);
        }
    };

    const handleFav = () => (
        dispatch(inFavorite ? remove_favorite(navProps?.catalogID) : add_favorite(navProps?.catalogID))
    );

    return (
        <HStack style={styles.appBar}>
            <HStack space={5}>
                <IconButton name="chevron-back" onPress={handlePageSwitch}/>
                <SweetText size={appBarTitle.length > 24 ? 17 : 20}>
                    {appBarTitle}
                </SweetText>
            </HStack>
            <HStack>
                <IconButton variant="MaterialIcons" name={favIcon} color={favColor} onPress={handleFav}/>
                {animating ? <ActivityIndicator size={24} style={{padding: 10}} color="orange"/>
                    : <IconButton name="share-outline" onPress={onShare}/>}
            </HStack>

        </HStack>
    );
}
