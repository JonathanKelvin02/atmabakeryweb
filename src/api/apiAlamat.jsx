import useAxios from "./indexApi";



export const GetAlamatSpesificCustomer = async (data) => {
    try {
        const id = data.ID_Customer;        
        const response = await useAxios.get("/customerAddress/" + id, {
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

export const GetAllAlamat = async () => {
    try {
        const response = await useAxios.get("/alamat", {
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

export const GetAllAlamatNoJarak = async () => {
    try {
        const response = await useAxios.get("/alamat/no-jarak", {
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

export const GetSingleAlamat = async (data) => {
    try {
        const response = await useAxios.get("/alamat/"+data.ID_Customer+"/"+data.ID_Alamat, {
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

export const UpdateJarakBiayaAlamat = async (data) => {
    try {
        const response = await useAxios.put("/update-jarak-biaya/"+data.ID_Customer+"/"+data.ID_Alamat, data, {
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

export const GetAlamatCustomer = async () => {
    try {
        const response = await useAxios.get("/customer/alamat", {
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

export const PostAlamatCustomer = async (data) => {
    try {
        const response = await useAxios.post("/customer/alamat", data, {
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

export const PutAlamatCustomer = async (data) => {
    try {
        const response = await useAxios.put("/customer/alamat/"+data.ID_Alamat, data, {
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

export const DeleteAlamatCustomer = async (data) => {
    try {
        const response = await useAxios.delete("/customer/alamat/"+data.ID_Alamat, {
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