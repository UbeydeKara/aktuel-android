import {SWITCH_PAGE} from "../types";

const initialState = {pageKey: 'home', navProps: {}, history: ["home"]};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SWITCH_PAGE:
            const navProps = payload.navProps || state.navProps;
            let pageKey = payload.pageKey;
            let history = state.history;

            if (pageKey === "back") {
                history.pop();
                pageKey = history.slice(-1)[0] || "home";
            }
            else if(!history.includes(pageKey))
                history.push(pageKey);

            return {pageKey, navProps, history};
        default:
            return state;
    }
};
