import axios from "axios";

const API_URL = "http://localhost:8080";

const createOTF = async (operationToFollow) => {
    const res = await axios.post(`${API_URL}/operationToFollow/create`,operationToFollow);

    return res.data;
}
const OTFToCreate = async (operationToFollow) => {
  return operationToFollow;
}
const getOTF = async () => {
    const res = await axios.get(`${API_URL}/operationToFollow/get`);
    return res.data;
};
const getOTFById = async (id) => {
    const res = await axios.get(`${API_URL}/operationToFollow/get/${id}`);
    return res.data;
};
const deleteOTF = async (id) => {
    const res = await axios.delete(`${API_URL}/operationToFollow/delete/${id}`);
    return res.data;
}
const updateOTF = async (id,updOTF) => {
    const res = await axios.put(`${API_URL}/operationToFollow/update/${id}`,updOTF);
    return res.data;
}

const productService = {
createOTF,
OTFToCreate,
deleteOTF,
getOTFById,
getOTF,
updateOTF
};

export default productService;