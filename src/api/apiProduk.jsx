import useAxios from "./indexApi";

export const GetAllProducts = async () => {
    try {
        const response = await useAxios.get("/produk-customer", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
    
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const GetOneProduct = async (id) => {
    try {
        const response = await useAxios.get(`/produk-customer/${id}`, {
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

export const GetAllPenitip = async () => {
    try {
        const response = await useAxios.get("/getPenitipAll", {
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

export const CreateProdukTitipan = async (data) => {
    try {
        const response = await useAxios.post("/produk/titipan", data, {
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

export const UpdateTitipan = async (values) => {
    try {
        const response = await useAxios.put(`/titipan/${values.ID_Produk}`, values, {
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

export const CreateProdukHampers = async (data) => {
    try {
        const response = await useAxios.post("/produk/hampers", data, {
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

export const UpdateHamper = async (values) => {
    try {
        const response = await useAxios.put(`/hampers/${values.ID_Produk}`, values, {
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

export const UpdateProduct = async (values) => {
    try {
        const response = await useAxios.put(`/produk/${values.ID_Produk}`, values, {
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

export const DeleteProduct = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const response = await useAxios.delete(`/produk/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
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