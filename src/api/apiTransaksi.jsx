import useAxios from "./indexApi";

export const GetAllTransaction = async () => {
    try {
        const response = await useAxios.get("/getTransactionStatusPayValid", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
};