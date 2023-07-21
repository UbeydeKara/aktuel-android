import {GET_CATALOGS_BY_MARKET, GET_CATALOGS_RECENTLY_ADDED} from "../types";
import CatalogService from "../../service/catalog-service";

export const getCatalogsByMarket = (selectedMarket) => async (dispatch) => {
    try {
        const res = await CatalogService.getCatalogsByMarket(selectedMarket);
        dispatch({
            type: GET_CATALOGS_BY_MARKET,
            payload: res.data.data,
        });
        return Promise.resolve(res.data.data);
    } catch (err) {
        return Promise.reject(err.response.data);
    }
};

export const getCatalogsRecentlyAdded = () => async (dispatch) => {
    try {
        const res = await CatalogService.getCatalogsRecentlyAdded();
        dispatch({
            type: GET_CATALOGS_RECENTLY_ADDED,
            payload: res.data.data,
        });
        return Promise.resolve(res.data.data);
    } catch (err) {
        return Promise.reject(err.response.data);
    }
};