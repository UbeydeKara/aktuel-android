import axios from "axios";

export default axios.create({
    baseURL: "http://37.148.212.156:8080/api/v1",
        headers:{
            'Content-Type': 'application/json'
    },
    timeout: 60000,
    timeoutErrorMessage: "Sunucu yanıt vermiyor."
});
