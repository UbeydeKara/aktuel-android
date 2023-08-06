import {GET_CATALOGS, GET_CATALOGS_RECENTLY_ADDED} from "../types";
import CatalogService from "../../service/catalog-service";
import {show_alert} from "./AlertAction";

export const getCatalogs = () => async (dispatch) => {
    try {
        const res = await CatalogService.getCatalogs();
        dispatch({
            type: GET_CATALOGS,
            payload: res.data.data,
        });
        return Promise.resolve(res.data.data);
    } catch (err) {
        dispatch(show_alert("İnternet bağlantısı yok", "warning"));
        return Promise.reject([]);
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
        console.log(err)
        dispatch(show_alert("İnternet bağlantısı yok", "warning"));
        return Promise.reject([]);
    }
};
