import {GET_MARKETS, SELECT_MARKET} from "../types";
import CatalogService from "../../service/catalog-service";
import {getCatalogsByMarket} from "./CatalogAction";

export const getMarkets = () => async (dispatch) => {
    try {
        const res = await CatalogService.getMarkets();
        dispatch({
            type: GET_MARKETS,
            payload: res.data.data,
        });
        return Promise.resolve(res.data.data);
    } catch (err) {
        return Promise.reject(err.response.data);
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
        return Promise.reject("Hata Oluştu: Market seçilemedi.");
    }
};