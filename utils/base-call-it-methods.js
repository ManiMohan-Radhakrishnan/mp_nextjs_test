import baseCallitAxios from "./axios-call-it-base-utils";

export const eventApi = () => baseCallitAxios.get("/events");
