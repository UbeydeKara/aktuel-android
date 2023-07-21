import {GET_CATALOGS_BY_MARKET, GET_CATALOGS_RECENTLY_ADDED} from "../types";

const initialState = {catalogsByMarket: [], recentlyAdded: []};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATALOGS_BY_MARKET:
            return {...state, catalogsByMarket: payload};
        case GET_CATALOGS_RECENTLY_ADDED:
            return {...state, recentlyAdded: payload};
        default:
            return state;
    }
};