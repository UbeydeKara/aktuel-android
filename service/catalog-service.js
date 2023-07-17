import http from "./http-common";

const serviceUrl = "/catalog"

const getAll = () => {
    return http.get(serviceUrl);
};

const getAllByMarket = (market) => {
    return http.get(serviceUrl);
};

const save = (catalog) => {
    return http.post(serviceUrl, catalog);
}

const deleteByIds = (catalogIds) => {
    return http.delete(serviceUrl, {
        params: {catalogId: catalogIds}
    })
}

const CatalogService = {
    getAll,
    getAllByMarket,
    save,
    deleteByIds
};

export default CatalogService;
