import {GET_MARKETS, SELECT_MARKET} from "../types";
import CatalogService from "../../service/catalog-service";
import {getCatalogsByMarket} from "./CatalogAction";
import {show_alert} from "./AlertAction";

export const getMarkets = () => async (dispatch) => {
    try {
        const res = await CatalogService.getMarkets();
        dispatch({
            type: GET_MARKETS,
            payload: res.data.data,
        });
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(show_alert("İnternet bağlantısı yok", "warning"));
        return Promise.reject([]);
    }
};

export const selectMarket = (market) => async (dispatch) => {
    try {
        dispatch({
            type: SELECT_MARKET,
            payload: market,
        });
        dispatch(getCatalogsByMarket(market));
        return Promise.resolve(market);
    } catch (err) {
        dispatch(show_alert("İnternet bağlantısı yok", "warning"));
        return Promise.reject([]);
    }
};
