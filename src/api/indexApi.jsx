import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000"

// Ambil gambar produk dari API
export const getGambar = (gambar) => {
    return `${BASE_URL}/storage/img/${gambar}`;
}

export const getProfile = (Profile) => {
    return `${BASE_URL}/storage/customer/${Profile}`;

}

const useAxios = axios.create({
    baseURL: `${BASE_URL}/api`
});

export default useAxios;