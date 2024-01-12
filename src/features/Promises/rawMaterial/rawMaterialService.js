import axios from "axios";

const API_URL = "https://vijusa-tool-backend.vercel.app";
const apiLocal = "http://localhost:8080";
const getRM = async () => {
    const res = await axios.get(`${apiLocal}/rawMaterial/get`);
    return res.data;
};
const getRMById = async (id) => {
    const res = await axios.get(`${apiLocal}/rawMaterial/get/${id}`);
    return res.data;
};
const createRM = async (rawMaterial) => {
    const res = await axios.post(`${apiLocal}/rawMaterial/create`,rawMaterial);

    return res.data;
}
const RMToCreate = async (rawMaterial) => {
    return rawMaterial;
}
const deleteRM = async (id) => {
    const res = await axios.delete(`${apiLocal}/rawMaterial/delete/${id}`);
    return res.data;
}
const updateRM = async (id,updRM) => {
    const res = await axios.put(`${apiLocal}/rawMaterial/update/${id}`,updRM);
    return res.data;
}
const searcher = async (data) => {
    const res = await axios.get(`${apiLocal}/rawMaterial/search`,{ params: data});
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