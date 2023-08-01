import {HStack, IconButton, SweetText, VStack} from "../component";
import {Linking, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {set_lang, set_theme} from "../redux/actions/SettingsAction";
import {Ionicons} from "@expo/vector-icons";
import {useMemo} from "react";
import {getMessages} from "../constant/lang";
import {getStyles} from "../constant/style";

const radioButton = (title, isActive, color, onPress) => (
    <TouchableOpacity onPress={onPress}
                      style={{padding: 20}}>
        <HStack space="auto">
            <SweetText size={18}>{title}</SweetText>
            <Ionicons name="checkmark-sharp" size={24} color={color} style={{opacity: isActive ? 1 : 0}} />
        </HStack>
    </TouchableOpacity>
);

function LanguageMenu() {
    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);
    const dispatch = useDispatch();

    return(
        <VStack space={10}>
            <SweetText size={24}>{messages.language}</SweetText>
            <VStack style={styles.radioGroup}>
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
        </VStack>
    );
}

function ThemeMenu() {
    const dispatch = useDispatch();

    const {theme, lang} = useSelector(state => state.settingsReducer);
    const styles = useMemo(() => getStyles(theme), [theme]);
    const messages = useMemo(() => getMessages(lang), [lang]);

    return(
        <VStack space={10}>
            <SweetText size={24}>{messages.appearance}</SweetText>
            <VStack style={styles.radioGroup}>
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
        </VStack>
    );
}

export default function Settings() {
    const {theme, lang} = useSelector(state => state.settingsReducer);
    const messages = useMemo(() => getMessages(lang), [lang]);
    const styles = useMemo(() => getStyles(theme), [theme]);

    return(
      <VStack space={15}>
          <SweetText size={36}>{messages.settings}</SweetText>
          <LanguageMenu/>
          <ThemeMenu/>
          <IconButton name="send" size={20} text={messages.contact} buttonStyle={styles.flatButton} color={styles.flatButton.color}
              onPress={() => Linking.openURL(`mailto:hatitech.app@gmail.com`)}>
          </IconButton>
      </VStack>
    );
}
