import moment from 'moment/min/moment-with-locales'

export const dateFormatter = (date) => {
    return moment(date).locale("tr").format("DD MMMM YYYY")
}