import useAxios from "./indexApi";

export const GetAllKaryawan = async () => {
    try {
        const response = await useAxios.get("/pegawai", {
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

export const PostKaryawan = async (data) => {
    try {
        const response = await useAxios.post("/pegawai", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const PutKaryawan = async (data) => {
    try {
        console.log(data);
        const response = await useAxios.put(`/pegawai/${data.ID_Pegawai}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const DeleteKaryawan = async (id) => {
    try {
        const response = await useAxios.delete(`/pegawai/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const SeachKaryawan = async (data) => {
    try {
        const response = await useAxios.get(`/pegawai/${data}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const ResetPasswordKaryawan = async (id) => {
    try {
        const response = await useAxios.put(`/reset-password/${id}`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}