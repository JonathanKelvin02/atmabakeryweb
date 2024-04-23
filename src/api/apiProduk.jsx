import useAxios from "./indexApi";

export const GetAllProducts = async () => {
    const response = await useAxios.get()
}

export const GetAllRecipe = async () => {
    try {
        const response = await useAxios.get("/resep", {
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

export const GetAllHampers = async () => {
    try {
        const response = await useAxios.get("/hampers", {
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

export const GetAllTitipan = async () => {
    try {
        const response = await useAxios.get("/titipan", {
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

export const CreateHomecook = async (data) => {
    try {
        const response = await useAxios.post("/produk/resep", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
};

export const UpdateHomecook = async (values) => {
    try {
        const response = await useAxios.put(`/resep/${values.ID_Produk}`, values, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetOneRecipe = async (id) => {
    try {
        const response = await useAxios.get(`/resep/${id}`, {
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