import moment from 'moment/min/moment-with-locales'

const tr_days = ["Pazarlar", "Pazartesiler", "Salılar", "Çarşambalar", "Perşembeler", "Cumalar", "Cumartesiler"]
const today = new Date();

export const todayMessage = (lang) => {
    return lang === "tr_TR" ? tr_days[today.getDay()] : moment(today).format("dddd");
}
