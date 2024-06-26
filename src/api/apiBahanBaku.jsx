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

export const SearchBahanBaku = async (data) => {
    try {
        const response = await useAxios.post("/searchBahanBakuByNama", data, {
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

export const GetAllBahanBakuWithTransaksi = async (id) => {
    try {
        const response = await useAxios.get("/getAllIngredientsAndProduct/" + id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
};

export const LaporanPenggunaanBahanBaku = async (data) => {
    try {
        const response = await useAxios.get('/laporan-penggunaan-bahan-baku/'+data.tglAwal+'/'+data.tglAkhir, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
};

export const MOAccept = async (id) => {
    try {
        const response = await useAxios.put(`/MOAcceptTransaction/${id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.error('Full error response:', e);
        throw e.response ? e.response.data : e;
    }
};

export const MOReject = async (id) => {
    try {
        const response = await useAxios.put(`/MORejectTransaction/${id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        console.error('Full error response:', e);
        throw e.response ? e.response.data : e;
    }
}

export const LaporanPenggunaanBahanBakuOwner = async (data) => {
    try {
        const response = await useAxios.get('/owner/laporan-penggunaan-bahan-baku/'+data.tglAwal+'/'+data.tglAkhir, {
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

export const GetAllMaterialUse = async () => {
    try {
        const response = await useAxios.get("/penggunaan-bahanbaku", {
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