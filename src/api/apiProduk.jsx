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