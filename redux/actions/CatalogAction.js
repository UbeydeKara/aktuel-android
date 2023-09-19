import {ADD_FAVORITE, GET_CATALOGS, REMOVE_FAVORITE} from "../types";
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

export const add_favorite = (catalogID) => (dispatch) => {
    dispatch({
        type: ADD_FAVORITE,
        payload: catalogID,
    });
};

export const remove_favorite = (catalogID) => (dispatch) => {
    dispatch({
        type: REMOVE_FAVORITE,
        payload: catalogID,
    });
};
