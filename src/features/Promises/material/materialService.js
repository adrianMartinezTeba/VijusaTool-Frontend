import axios from "axios";

const API_URL = "http://localhost:8080";

const getMaterials = async () => {
    const res = await axios.get(`${API_URL}/material/get`);
    console.log(res.data);
    return res.data;
};
const getMaterialById = async (id) => {
    const res = await axios.get(`${API_URL}/material/get/${id}`);
    return res.data;
};
const create = async (material) => {
    await material
    console.log(material);
    const res = await axios.post(`${API_URL}/material/create`,material);

    return res.data;
}
const deleteMaterial = async (id) => {
    const res = await axios.delete(`${API_URL}/material/delete/${id}`);
    return res.data;
}
const updateMaterial = async (id,updOrder) => {
    const res = await axios.put(`${API_URL}/material/update/${id}`,updOrder);
    return res.data;
}

const materialService = {
create,
deleteMaterial,
getMaterialById,
getMaterials,
updateMaterial
};

export default materialService;