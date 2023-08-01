export const en_US = {
    // bottom_bar
    homepage: "Home",
    markets: "Markets",
    settings: "Settings",

    // settings_page
    language: "Language",
    appearance: "Appearance",
    light: "Light",
    dark: "Dark",
    contact: "Contact",

    // homepage
    happy: "Happy",
    recentlyAdded: "Recently Added",

    // catalog
    offerStart: "Offer Starts At",
    offerEnd: "Offer Ends At",
    products: "Products",
    shareDialog: "Share catalogs",
    noResultDialog: "We could not find an up-to-date catalog for the market you are looking for",

    // alert
    noConnection: "No internet connection"
};
export const tr_TR = {
    // bottom_bar
    homepage: "Ana Sayfa",
    markets: "Marketler",
    settings: "Ayarlar",

    // settings_page
    language: "Dil",
    appearance: "Görünüm",
    light: "Açık",
    dark: "Koyu",
    contact: "İletişim",

    // homepage
    happy: "Mutlu",
    recentlyAdded: "Son Eklenenler",

    // catalog
    offerStart: "Kampanya Başlangıç",
    offerEnd: "Kampanya Bitiş",
    products: "Ürünler",
    shareDialog: "Katalogları paylaş",
    noResultDialog: "Aradığınız markete ait güncel katalog bulamadık",

    // alert
    noConnection: "No internet connection"
};

export const getMessages = (lang) => lang === "tr_TR" ? tr_TR : en_US;
