import useAxios from "./indexApi";

export const GetTransaksiCustomer = async () => {
    try {
        const response = await useAxios.get("/confirm-transaksi", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const UpdateStatus = async (data) => {
    try {
        const response = await useAxios.put(`/confirm-transaksi/${data.ID_Transaksi}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response;
    }
}

export const GetTransaksiNoTotalBayar = async () => {
    try {
        const response = await useAxios.get("/transaksi-total-bayar", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const UpdateTotalBayarCustomer = async (data) => {
    try {
        const response = await useAxios.put(`/transaksi-total-bayar/${data.ID_Transaksi}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data
    }
}