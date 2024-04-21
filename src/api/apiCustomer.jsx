import useAxios from "./indexApi";

export const SendEmailForLink = async (data) => {
    try {
        const response = await useAxios.post("/forget-password", data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}