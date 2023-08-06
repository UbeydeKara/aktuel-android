import http from "./http-common";

const catalogUrl = "/catalog"
const marketUrl = "/market"

const getCatalogs = () => {
    return http.get(catalogUrl + "/findAll");
};

const getCatalogsRecentlyAdded = () => {
    return http.get(catalogUrl + "/recently-added");
};

const getMarkets = () => {
    return http.get(marketUrl + "/findAll");
}

const CatalogService = {
    getCatalogs,
    getCatalogsRecentlyAdded,
    getMarkets
};

export default CatalogService;
