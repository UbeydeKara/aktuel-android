import {HStack, SweetText, VStack} from "../component";
import {TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {set_lang, set_theme} from "../redux/actions/SettingsAction";
import {Ionicons} from "@expo/vector-icons";

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
    const {text, lang, styles} = useSelector(state => state.settingsReducer);
    const dispatch = useDispatch();

    return(
        <VStack space={10}>
            <SweetText size={24}>{text.language}</SweetText>
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
    const {text, theme, styles} = useSelector(state => state.settingsReducer);
    const dispatch = useDispatch();

    return(
        <VStack space={10}>
            <SweetText size={24}>{text.appearance}</SweetText>
            <VStack style={styles.radioGroup}>
                {radioButton(text.light,
                    theme === "light",
                    styles.sweet_text.color,
                    () => dispatch(set_theme("light")))}
                <View style={styles.divider}/>
                {radioButton(text.dark,
                    theme === "dark",
                    styles.sweet_text.color,
                    () => dispatch(set_theme("dark")))}
            </VStack>
        </VStack>
    );
}

export default function Settings() {
    const {text} = useSelector(state => state.settingsReducer);

    return(
      <VStack style={{paddingVertical: 40, paddingHorizontal: 20}} space={15}>
          <SweetText size={36}>{text.settings}</SweetText>
          <LanguageMenu/>
          <ThemeMenu/>
          <SweetText size={20} center>Aktuel Market from Hatitech</SweetText>
      </VStack>
    );
}