import {GET_MARKETS, SELECT_MARKET} from "../types";

const initialState = {
    markets: [
        {marketID: -1},
        {marketID: -2},
        {marketID: -3},
        {marketID: -4},
        {marketID: -5},
        {marketID: -6}
    ]
};

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