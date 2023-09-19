import http from "./http-common";

export const registerDevice = (deviceInfo) => {
    return http.post("/notification/register", deviceInfo);
};
