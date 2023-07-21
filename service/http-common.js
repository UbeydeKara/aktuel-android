import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.2.229:8080/api/v1",
        headers:{
            'Content-Type': 'application/json'
    },
    timeout: 60000,
    timeoutErrorMessage: "Sunucu yanıt vermiyor."
});
