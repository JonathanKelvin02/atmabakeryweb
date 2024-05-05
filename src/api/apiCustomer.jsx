import useAxios from "./indexApi";

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
    console.log(data);

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

export const GetProfile = async () => {
    try {
        const response = await useAxios.get("/customer", {
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