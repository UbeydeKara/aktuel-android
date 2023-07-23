import {SET_LANG, SET_THEME} from "../types";
import {selectLang, tr_TR} from "../../constant/lang";

const initialState = {text: tr_TR, theme: "light"};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_LANG:
            return {...state, text: selectLang(payload)};
        case SET_THEME:
            return {...state, theme: payload};
        default:
            return state;
    }
};