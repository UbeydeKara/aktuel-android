import {HStack, IconButton, SweetText, VStack} from "../component";
import {Linking, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {set_lang, set_theme} from "../redux/actions/SettingsAction";
import {Ionicons} from "@expo/vector-icons";
import {useMemo} from "react";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";
import {pixelRatio} from "../utils/pixelRatio";

const radioButton = (title, isActive, color, onPress) => (
    <TouchableOpacity onPress={onPress}
                      style={{padding: 20 * pixelRatio}}>
        <HStack space="auto">
            <SweetText size={18}>{title}</SweetText>
            <Ionicons name="checkmark-sharp" size={24} color={color} style={{opacity: isActive ? 1 : 0}}/>
        </HStack>
    </TouchableOpacity>
);

function LanguageMenu() {
    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);
    const dispatch = useDispatch();

    return (
        <View>
            <SweetText size={24}>{messages.language}</SweetText>
            <VStack style={styles.radioGroup} mt={2} mb={3}>
                {radioButton("English",
                    lang === "en_US",
                    styles.sweet_text.color,
                    () => dispatch(set_lang("en_US")))}
                <View style={styles.divider}/>
                {radioButton("Türkçe",
                    lang === "tr_TR",
                    styles.sweet_text.color,
                    () => dispatch(set_lang("tr_TR")))}
            </VStack>
        </View>
    );
}

function ThemeMenu() {
    const dispatch = useDispatch();

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);
    const messages = useMemo(() => getMessages(lang), [lang]);

    return (
        <View>
            <SweetText size={24}>{messages.appearance}</SweetText>
            <VStack style={styles.radioGroup} mt={2} mb={2}>
                {radioButton(messages.light,
                    theme === "light",
                    styles.sweet_text.color,
                    () => dispatch(set_theme("light")))}
                <View style={styles.divider}/>
                {radioButton(messages.dark,
                    theme === "dark",
                    styles.sweet_text.color,
                    () => dispatch(set_theme("dark")))}
            </VStack>
        </View>
    );
}

export default function Settings() {
    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    return (
        <View>
            <HStack px={4} pt={7} pb={3} mb={3} style={styles.menuBg}>
                <SweetText size={32}>{messages.settings}</SweetText>
            </HStack>
            <VStack px={4}>
                <LanguageMenu/>
                <ThemeMenu/>
                <IconButton name="send" size={20} text={messages.contact} buttonStyle={styles.flatButton}
                            color={styles.flatButton.color}
                            onPress={() => Linking.openURL(`mailto:hatitech.app@gmail.com`)}>
                </IconButton>
            </VStack>
        </View>
    );
}
