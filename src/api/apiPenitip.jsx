import useAxios from "./indexApi";

export const GetAllPenitip = async () => {
    try {
        const response = await useAxios.get("/getPenitipAll", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        // console.log(response.data.data);
        return response.data.data;
    } catch (e) {
        throw error.response.data;
    }
}

export const GetProductBySpesificPenitip = async (data) => {
    try {
        const response = await useAxios.post("/productForSpesificPenitip", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (e) {
        console.log(e);
        throw error.response.data;
    }
}

export const PostPenitip = async (data) => {
    console.log(data);

    try {
        const response = await useAxios.post("/createPenitip", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw error.response.data;
    }
}

export const UpdatePenitip = async (data) => {
    try {
        const response = await useAxios.put("/updatePenitip/"+data.ID_Penitip, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw error.response.data;
    }
}

export const DeletePenitip = async (id) => {
    try {
        const response = await useAxios.delete("/deletePenitip/"+id, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw error.response.data;
    }
}

export const SearchPenitip = async (data) => {
    try {
        const response = await useAxios.post("/searchPenitipByNama", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });


        return response.data.data;
    } catch (e) {
        throw error.response.data;
    }
}