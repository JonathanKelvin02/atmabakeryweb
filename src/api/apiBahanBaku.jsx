import useAxios from "./indexApi";

export const GetBahanBaku = async () => {
    try {
        const response = await useAxios.get("/getBahanBakuAll", {
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