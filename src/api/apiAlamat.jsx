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
};
