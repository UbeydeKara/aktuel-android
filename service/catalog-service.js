import http from "./http-common";

const catalogUrl = "/catalog"
const marketUrl = "/market"

const getCatalogsRecentlyAdded = () => {
    return http.get(catalogUrl + "/recently-added");
};

const getCatalogsByMarket = (market) => {
    return http.post(catalogUrl + "/market", market);
};

const getMarkets = () => {
    return http.get(marketUrl);
}

const CatalogService = {
    getCatalogsRecentlyAdded,
    getCatalogsByMarket,
    getMarkets
};

export default CatalogService;
