import useAxios from "./indexApi";


// Admin Side
export const SendEmailForLink = async (data) => {
    try {
        const response = await useAxios.post("/forget-password", data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const CheckingCredentialToken = async (data) => {
    try {
        const response = await useAxios.post("/checkCredentialToken", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const SendPasswordReset = async (data) => {
    try {
        const response = await useAxios.put("/reset-password", data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const GetCustomerAll = async () => {
    try {
        const response = await useAxios.get("/customerGetAll", {
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

export const SearchGetCustomer = async (data) => {
    try {
        const response = await useAxios.post("/customerSearch", data, {
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

export const GetCustomerHistoryByID = async (data) => {
    try {
        const response = await useAxios.get("/customerHistory/" + data, {
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

export const GetDetailTransaksi = async (data) => {
    try{
        const response = await useAxios.get("/customerTransaction/" + data, {
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