import useAxios from "./indexApi";

export const GetAllJabatan = async () => {
    try {
        const response = await useAxios.get("/jabatan",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (e) {
        throw error.response.data;
    }
}