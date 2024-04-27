import useAxios from "./indexApi";

export const GetAllResep = async () => {
    try {
        const response = await useAxios.get("/detail-resep", {
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

export const GetResep = async (data) => {
    try {
        const response = await useAxios.get(`/detail-resep/${data.ID_Produk}`, {
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

export const PostResep = async (data) => {
    try {
        const response = await useAxios.post("/detail-resep", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (e) {
        throw error.response.data;
    }
}

export const PutResep = async (data) => {
    try {
        const response = await useAxios.put(`/detail-resep/${data.ID_Produk}`, data, {
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

export const DeleteResep = async (data) => {
    try {
        const response = await useAxios.delete(`/detail-resep/${data.ID_Produk}`, data, {
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

export const SearchResep = async (data) => {
    try {
        const response = await useAxios.get(`/detail-resep/${data}`, {
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