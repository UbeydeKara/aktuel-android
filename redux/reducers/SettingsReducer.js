import {Appearance, NativeModules} from "react-native";
import {SET_LANG, SET_THEME} from "../types";

import {storage} from "../../utils/Storage";

import {getMessages} from "../../constant/lang";
import {currentStyle, getStyles} from "../../constant/style";

const theme = storage.getString("theme") || Appearance.getColorScheme();
const language = storage.getString("language") || NativeModules.I18nManager.localeIdentifier;

const initialState = {
    lang: language,
    theme: theme,
    messages: getMessages[language],
    styles: getStyles(theme),
    colors: currentStyle[theme]
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case SET_LANG:
            storage.set("language", payload);
            return {...state, lang: payload, messages: getMessages[payload]};
        case SET_THEME:
            storage.set("theme", payload);
            return {...state, theme: payload, styles: getStyles(payload), colors: currentStyle[payload]};
        default:
            return state;
    }
};
