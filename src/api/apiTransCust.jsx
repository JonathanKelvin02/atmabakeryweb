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

export const CreateReady = async (data) => {
    try {
        const response = await useAxios.post("/transaksi-ready", data, {
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

export const ShowCompleteOrder = async () => {
    try {
        const response = await useAxios.get("/complete-order", {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
};