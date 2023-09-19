import moment from 'moment/min/moment-with-locales'

export const dateFormatter = (date, lang) => {
    const locale = lang === "tr_TR" ? "tr" : "en";
    return moment(date).locale(locale).format("DD MMMM YYYY")
}

export const formatMultipleDate = (date1, date2, lang) => {
    const locale = lang === "tr_TR" ? "tr" : "en";
    return moment(date1).locale(locale).format("DD MMM") + " - " + moment(date2).locale(locale).format("DD MMM")
}
