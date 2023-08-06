import {GET_CATALOGS, GET_CATALOGS_RECENTLY_ADDED} from "../types";

const initialState = {
    catalogs: [
        {catalogID: -1}, {catalogID: -2}, {catalogID: -3}, {catalogID: -4}, {catalogID: -5}, {catalogID: -6}
    ],
    recentlyAdded: [
        {catalogID: -1}, {catalogID: -2}, {catalogID: -3}, {catalogID: -4}, {catalogID: -5}, {catalogID: -6}
    ]
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATALOGS:
            return {...state, catalogs: payload};
        case GET_CATALOGS_RECENTLY_ADDED:
            return {...state, recentlyAdded: payload};
        default:
            return state;
    }
};
