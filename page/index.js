import Catalog from "./Catalog";
import Home from "./Home";
import MarketCatalogs from "./MarketCatalogs";
import Markets from "./Markets";
import Settings from "./Settings";

export const pages = [
    {
        key: "home",
        component: <Home/>
    },
    {
        key: "catalog",
        component: <Catalog/>
    },
    {
        key: "market_catalogs",
        component: <MarketCatalogs/>
    },
    {
        key: "markets",
        component: <Markets/>
    },
    {
        key: "settings",
        component: <Settings/>
    },
];
