import {useDispatch, useSelector} from "react-redux";
import {switchPage} from "../redux/actions/NavigationAction";
import {HStack, IconButton, SweetText} from "../component";
import {useMemo, useState} from "react";
import {getStyles} from "../constant/style";
import base64File from "../utils/base64Converter";
import Share from "react-native-share";
import {getMessages} from "../constant/lang";
import {ActivityIndicator} from "react-native";

export default function AppBar({title, images}) {
    const dispatch = useDispatch();
    const [animating, setAnimate] = useState(false);

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);
    const messages = useMemo(() => getMessages(lang), [lang]);

    const handlePageSwitch = () => {
        dispatch(switchPage("back"));
    }

    const onShare = async () => {
        setAnimate(true);
        const base64Images = [];

        for (const url of images) {
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

    return (
        <HStack style={styles.appBar}>
            <IconButton name="chevron-back" onPress={handlePageSwitch}/>
            <SweetText size={22}>
                {title}
            </SweetText>
            {animating ? <ActivityIndicator size={24} style={{padding: 10}} color="orange"/>
                : <IconButton name="share-outline" onPress={onShare}/>}

        </HStack>
    );
}
