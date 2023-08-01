import {Appearance, NativeModules} from "react-native";
import {SET_LANG, SET_THEME} from "../types";

const systemColorScheme = Appearance.getColorScheme();
const systemLanguage = NativeModules.I18nManager.localeIdentifier;

const initialState = {
    lang: systemLanguage,
    theme: systemColorScheme
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_LANG:
            return {...state, lang: payload};
        case SET_THEME:
            return {...state, theme: payload};
        default:
            return state;
    }
};
