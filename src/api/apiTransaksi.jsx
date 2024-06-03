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

export const GetTransaksiDiproses = async () => {
    try {
        const response = await useAxios.get("/transaksi-diproses", {
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

export const PutTransaksiDikirim = async (data) => {
    try {
        const response = await useAxios.put("/transaksi-diproses/"+data.ID_Transaksi, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const GetTransaksiDikirim = async () => {
    try {
        const response = await useAxios.get("/transaksi-siap-kirim", {
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

export const PutTransaksiSelesai = async (data) => {
    try {
        const response = await useAxios.put("/transaksi-siap-kirim/"+data.ID_Transaksi, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const PutTransaksiSelesaiCustomer = async (data) => {
    try {
        const response = await useAxios.put("/customer/confirm-transaksi-selesai/"+data.ID_Transaksi, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const GetTransaksiTelatBayar = async () => {
    try {
        const response = await useAxios.get("/transaksi-telat-bayar", {
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

export const PutTransaksiTelatBayar = async (data) => {
    try {
        const response = await useAxios.put("/transaksi-telat-bayar/"+data.ID_Transaksi, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const GetDetailTransaksiBatal = async (id) => {
    try {
        const response = await useAxios.get("/detail-transaksi/"+id, {
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

export const LaporanPenjualanTahunan = async (tahun) => {
    try {
        const response = await useAxios.get("/laporan-penjualan-tahunan/"+tahun, {
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

export const LaporanPenjualanTahunanOwner = async (tahun) => {
    try {
        const response = await useAxios.get("/owner/laporan-penjualan-tahunan/"+tahun, {
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