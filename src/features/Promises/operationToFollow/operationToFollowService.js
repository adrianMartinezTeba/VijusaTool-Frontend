import axios from "axios";
const API_URL = "http://localhost:8080";
const apiLocal = "https://vijusa-tool-backend.vercel.app";

const createOTF = async (operationToFollow) => {
    const res = await axios.post(`${apiLocal}/operationToFollow/create`,operationToFollow);

    return res.data;
}
const OTFToCreate = async (operationToFollow) => {
  return operationToFollow;
}
const getOTF = async () => {
    const res = await axios.get(`${apiLocal}/operationToFollow/get`);
    return res.data;
};
const getOTFById = async (id) => {
    const res = await axios.get(`${apiLocal}/operationToFollow/get/${id}`);
    return res.data;
};
const deleteOTF = async (id) => {
    const res = await axios.delete(`${apiLocal}/operationToFollow/delete/${id}`);
    return res.data;
}
const updateOTF = async (id,updOTF) => {
    const res = await axios.put(`${apiLocal}/operationToFollow/update/${id}`,updOTF);
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