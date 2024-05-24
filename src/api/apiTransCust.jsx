import useAxios from "./indexApi";

export const CreateTransCust = async (data) => {
    try {
        const response = await useAxios.post("/transaksi", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
};