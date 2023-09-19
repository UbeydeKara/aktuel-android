import {ADD_FAVORITE, GET_CATALOGS, REMOVE_FAVORITE} from "../types";
import {storage} from "../../utils/Storage";

const dummy = [
    {
        type: "dummy"
    },
    {
        type: "dummy"
    },
    {
        type: "dummy"
    },
    {
        type: "dummy"
    },
    {
        type: "adSkeleton"
    },
    {
        type: "empty"
    },
    {
        type: "dummy"
    },
    {
        type: "dummy"
    },
]

const initialState = {
    catalogs: [],
    recentlyAdded: [...dummy],
    favorites: storage.contains("favorites") ? JSON.parse(storage.getString('favorites')) : []
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CATALOGS:
            return {...state, catalogs: payload, recentlyAdded: payload.sort(
                    (a, b) => Date.parse(a.createAt) - Date.parse(b.createAt)
                ).reverse().slice(0, 10)};
        case ADD_FAVORITE:
            const append_res = [...state.favorites, payload];
            storage.set("favorites", JSON.stringify(append_res));
            return {...state, favorites: append_res};
        case REMOVE_FAVORITE:
            const remove_res = [...state.favorites.filter(x => x !== payload)];
            storage.set("favorites", JSON.stringify(remove_res));
            return {...state, favorites: remove_res};
        default:
            return state;
    }
};
