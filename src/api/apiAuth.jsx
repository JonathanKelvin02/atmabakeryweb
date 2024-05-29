import useAxios from "./indexApi";

const Login = async (data) => {
    try {
        const response = await useAxios.post("/login", data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
};

const LogoutPegawai = async () => {
    try {
        const response = await useAxios.post("/logoutPegawai", null, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
};

const LogoutCustomer = async () => {
    try {
        const response = await useAxios.post("/logoutCustomer", null, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
};



export { Login, LogoutPegawai, LogoutCustomer };