import {Appearance, NativeModules} from "react-native";
import {SET_LANG, SET_THEME} from "../types";
import {en_US, selectLang, tr_TR} from "../../constant/lang";
import {styles} from "../../constant/style";

const systemColorScheme = Appearance.getColorScheme();
const systemLanguage = NativeModules.I18nManager.localeIdentifier;

const initialState = {
    lang: systemLanguage,
    theme: systemColorScheme,
    text: systemLanguage === "tr_TR" ? tr_TR : en_US,
    styles: styles(systemColorScheme)
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_LANG:
            return {...state, lang: payload, text: selectLang(payload)};
        case SET_THEME:
            return {...state, theme: payload, styles: styles(payload)};
        default:
            return state;
    }
};
