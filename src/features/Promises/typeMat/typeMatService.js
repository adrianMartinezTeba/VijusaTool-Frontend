import axios from "axios";

const API_URL = "http://localhost:8080";

const getTypeMats = async () => {
    const res = await axios.get(`${API_URL}/typeMat/get`);
    return res.data;
};
const getTypeMatById = async (id) => {
    const res = await axios.get(`${API_URL}/typeMat/get/${id}`);
    return res.data;
};
const create = async (typeMat) => {
    await typeMat
    const res = await axios.post(`${API_URL}/typeMat/create`,typeMat);

    return res.data;
}
const deleteTypeMat = async (id) => {
    const res = await axios.delete(`${API_URL}/typeMat/delete/${id}`);
    return res.data;
}
const updateTypeMat = async (id,updTypeMat) => {
    const res = await axios.put(`${API_URL}/typeMat/update/${id}`,updTypeMat);
    return res.data;
}

const typeMatService = {
create,
deleteTypeMat,
getTypeMatById,
getTypeMats,
updateTypeMat
};

export default typeMatService;