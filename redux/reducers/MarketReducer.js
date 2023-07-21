import {GET_MARKETS, SELECT_MARKET} from "../types";

const initialState = [];

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MARKETS:
            return {...state, markets: payload};
        case SELECT_MARKET:
            return {...state, selectedMarket: payload};
        default:
            return state;
    }
};