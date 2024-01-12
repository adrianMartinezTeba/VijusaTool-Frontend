import axios from "axios";
const API_URL = "https://vijusa-tool-backend.vercel.app";
const apiLocal = "http://localhost:8080";
const getRTF= async () => {
    const res = await axios.get(`${apiLocal}/ruteToFollow/getRTFs`);
    return res.data;
};
const getRTFById = async (id) => {
    const res = await axios.get(`${apiLocal}/ruteToFollow/getRTF/${id}`);
    return res.data;
};
const createRTF= async (ruteToFollow) => {
    await ruteToFollow
    const res = await axios.post(`${apiLocal}/ruteToFollow/createRTF`,ruteToFollow);

    return res.data;
}
const addToCrRTF = async (data) => {
    return data;
}
const shapeToCreate = async (ruteToFollow) => {
    return ruteToFollow;    
}
const deleteRTF = async (id) => {
    const res = await axios.delete(`${apiLocal}/ruteToFollow/deleteRTF/${id}`);
    return res.data;
}
const updateRTF = async (id,updRTF) => {
    const res = await axios.put(`${apiLocal}/ruteToFollow/update/${id}`,updRTF);
    return res.data;
}

const ruteToFollow = {
createRTF,
addToCrRTF,
getRTF,
getRTFById,
deleteRTF,
updateRTF
};

export default ruteToFollow;