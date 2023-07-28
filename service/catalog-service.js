import http from "./http-common";

const catalogUrl = "/catalog"
const marketUrl = "/market"

const getCatalogsRecentlyAdded = () => {
    return http.get(catalogUrl + "/recently-added");
};

const getCatalogsByMarket = (marketID) => {
    return http.get(catalogUrl + "/market/" + marketID);
};

const getMarkets = () => {
    return http.get(marketUrl + "/findAll");
}

const CatalogService = {
    getCatalogsRecentlyAdded,
    getCatalogsByMarket,
    getMarkets
};

export default CatalogService;
