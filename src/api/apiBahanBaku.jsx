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

export const PostBahanBaku = async (data) => {
    try {
        const response = await useAxios.post("/createBahanBaku", data, {
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

export const UpdateBahanBaku = async (data) => {
    try {
        const response = await useAxios.put("/updateBahanBaku/"+data.ID_Bahan_Baku, data, {
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

export const DeleteBahanBaku = async (id) => {
    try {
        const response = await useAxios.delete("/deleteBahanBaku/"+id, {
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