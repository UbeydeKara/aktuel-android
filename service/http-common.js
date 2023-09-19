import axios from "axios";

export default axios.create({
    baseURL: "http://37.148.212.156:8080/api/v1",
    headers: {
        'content-type': 'application/json'
    },
    timeout: 5000,
    timeoutErrorMessage: "Bağlantı Hatası"
});
