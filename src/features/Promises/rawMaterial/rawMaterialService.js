import axios from "axios";

const API_URL = "https://vijusa-tool-backend.vercel.app";
const apiLocal = "http://localhost:8080";
const getRM = async () => {
    const res = await axios.get(`${API_URL}/rawMaterial/get`);
    return res.data;
};
const getRMById = async (id) => {
    const res = await axios.get(`${API_URL}/rawMaterial/get/${id}`);
    return res.data;
};
const createRM = async (rawMaterial) => {
    const res = await axios.post(`${API_URL}/rawMaterial/create`,rawMaterial);

    return res.data;
}
const RMToCreate = async (rawMaterial) => {
    return rawMaterial;
}
const deleteRM = async (id) => {
    const res = await axios.delete(`${API_URL}/rawMaterial/delete/${id}`);
    return res.data;
}
const updateRM = async (id,updRM) => {
    const res = await axios.put(`${API_URL}/rawMaterial/update/${id}`,updRM);
    return res.data;
}
const searcher = async (data) => {
    const res = await axios.get(`${API_URL}/rawMaterial/search`,{ params: data});
    return res.data;
}
const rawMaterialService = {
createRM,
RMToCreate,
deleteRM,
getRMById,
getRM,
searcher,
updateRM
};

export default rawMaterialService;