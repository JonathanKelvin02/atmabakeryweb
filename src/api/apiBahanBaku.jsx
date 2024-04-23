import useAxios from "./indexApi";

export const GetBahanBaku = async () => {
    try {
        const response = await useAxios.get("/getBahanBakuAll", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        // console.log(response.data.data);
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }    
}

export const GetRelatedProduct = async (data) => {
    try{
        const response = await useAxios.post(`/detail-resepForRelated`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });

        console.log(response.data.data);
        return response.data.data;
    }catch(e){
        throw e.response.data;
    }
}