import useAxios from "./indexApi";

export const GetLaporanPresensi = async (data) => {
    try {
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