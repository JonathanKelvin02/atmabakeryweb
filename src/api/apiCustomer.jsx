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

export const GetProfile = async () => {
    try {
        const response = await useAxios.get("/customer", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        // console.log(response.data.data);
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const GetAlamatUser = async () => {
    try {    
        const response = await useAxios.get("/customer-alamat", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (e) {
        throw e.response.data;
    }
};

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

export const UpdateProfileImage = async (data) => {
    try {
        const response = await useAxios.post("/customer", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const UpdateProfile = async (data) => {
    try {
        const response = await useAxios.put("/update-customer", data, {
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

export const GetHistory = async () => {
    try {
        const response = await useAxios.get("/customer/history", {
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

export const SearchHistory = async (nama) => {
    try {
        const response = await useAxios.get("/customer/history/"+nama, {
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

export const GetTransaksiSelesai = async () => {
    try {
        const response = await useAxios.get("/customer/transaksi-selesai", {
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

export const GetDetailTransaksiSelesai = async (id) => {
    try {
        const response = await useAxios.get("/customer/detail-transaksi/"+id, {
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

export const GetTransaksiByIdCustomer = async (id) => {
    try {
        const response = await useAxios.get("/getTransaksiByIdCustomer/"+id, {
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

// export const SendProofPayment = async (data) => {
//     // for (let entry of data.entries()) {
//     //     console.log(entry[0], entry[1]);
//     // }

//     try {
//         const response = await useAxios.post("/sendProofPayment", data, {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//         });
//         return response.data;
//     } catch (e) {
//         throw e.response.data;
//     }
// }

export const SendProofPayment = async (data) => {
    try {
        const response = await useAxios.post("/sendProofPayment", data, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const ReducePoin = async (values) => {
    try {
        const response = await useAxios.put(`/reduce-poin`, values, {
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