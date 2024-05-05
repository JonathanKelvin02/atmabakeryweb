import useAxios from './indexApi';

export const Register = async (data) => {
    try {
        const response = await useAxios.post('/register', data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}

export const SendEmailConfirmation = async (data) => {
    try {
        const response = await useAxios.post('/confirm-email', data);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
}