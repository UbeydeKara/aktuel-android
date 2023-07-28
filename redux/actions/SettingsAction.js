import {SET_LANG, SET_THEME} from "../types";

export const set_lang = (language) => (dispatch) => {
    dispatch({
        type: SET_LANG,
        payload: language,
    });
};

export const set_theme = (theme) => (dispatch) => {
    dispatch({
        type: SET_THEME,
        payload: theme,
    });
};
