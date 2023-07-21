import {SWITCH_PAGE} from "../types";

const initialState = {pageKey: 'home', navProps: {}};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SWITCH_PAGE:
            const pageKey = payload.pageKey || state.pageKey;
            const navProps = payload.navProps || state.navProps;
            return {pageKey, navProps};
        default:
            return state;
    }
};