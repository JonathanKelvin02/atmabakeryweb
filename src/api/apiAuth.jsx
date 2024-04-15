import useAxios from "./indexApi";

const Login = async (data) => {
    try {
        const response = await useAxios.post("/login", data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
};

export { Login };