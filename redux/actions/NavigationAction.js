import {SWITCH_PAGE} from "../types";

export const switchPage = (key, navProps) => (dispatch) => {
    dispatch({
        type: SWITCH_PAGE,
        payload: {pageKey: key, navProps: navProps},
    });
};