import useAxios from "./indexApi";

export const GetAllHistorySaldo = async () => {
    try {
        const response = await useAxios.get("/history", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);

        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const AcceptSaldo = async (id) => {
    try {
        const response = await useAxios.put(`/historyAcceptSaldo/${id}`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
        return response.data;
    } catch (e) {
        console.error('Full error response:', e);
        throw e.response;
    }
}

export const RejectSaldo = async (id) => {
    try {
        const response = await useAxios.delete(`/historyRejectSaldo/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        console.log(response.data.data);

        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
}