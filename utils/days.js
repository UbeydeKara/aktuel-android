
const days = ["Pazarlar", "Pazartesiler", "Salılar", "Çarşambalar", "Perşembeler", "Cumalar", "Cumartesiler"]
const dayIndex = new Date().getDay();
export const todayMessage = () => {
    return "Mutlu " + days[dayIndex];
}