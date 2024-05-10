import useAxios from "./indexApi";

export const GetAllPengeluaran = async () => {
    try {
        const response = await useAxios.get("/pengeluaran", {
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

export const PostPengeluaran = async (data) => {
    try {
        const response = await useAxios.post("/pengeluaran", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        // console.log(response.data);
        return response.data;
    } catch (e) {
        throw error.response.data;
    }
}

export const UpdatePengeluaran = async (data) => {
    try {
        const response = await useAxios.put("/updatePengeluaranByID/"+data.ID_Pengeluaran, data, {
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

export const DeletePengeluaran = async (id) => {
    try {
        const response = await useAxios.delete("/deletePengeluaranByID/"+id, {
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

export const SearchPengeluaran = async (data) => {
    try {
        const response = await useAxios.post("/pengeluaranSearch", data, {
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