import useAxios from "./indexApi";

export const GetLaporanPresensi = async (data) => {
    try {
        console.log(data);

        const response = await useAxios.post("/laporanPresensiKaryawanByBulanTahun", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}

export const GetLaporanPemasukanPengeluaran = async (data) => {
    try {
        const response = await useAxios.post("/laporanPemasukanPengeluaran", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}

export const GetLaporanTransaksiPenitip = async (data) => {
    try {
        const response = await useAxios.post("/laporanPenitipan", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}

export const OGetLaporanPresensi = async (data) => {
    try {
        console.log(data);

        const response = await useAxios.post("/OlaporanPresensiKaryawanByBulanTahun", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}

export const OGetLaporanPemasukanPengeluaran = async (data) => {
    try {
        const response = await useAxios.post("/OlaporanPemasukanPengeluaran", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}

export const OGetLaporanTransaksiPenitip = async (data) => {
    try {
        const response = await useAxios.post("/OlaporanPenitipan", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}