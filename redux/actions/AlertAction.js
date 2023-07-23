import {SET_MESSAGE} from "../types";

export const show_alert = (message, variant) => (dispatch) => {
    dispatch({
        type: SET_MESSAGE,
        payload: {message: message, variant: variant},
    });
};