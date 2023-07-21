import moment from 'moment/min/moment-with-locales'

export const dateFormatter = (date, format) => {
    return moment(date).locale("tr").format(format || "DD MMMM YYYY")
}