import axios from "axios";

const API_URL = "https://vijusa-tool-backend.vercel.app";

const getRTF= async () => {
    const res = await axios.get(`${API_URL}/ruteToFollow/getRTFs`);
    return res.data;
};
const getRTFById = async (id) => {
    const res = await axios.get(`${API_URL}/ruteToFollow/getRTF/${id}`);
    return res.data;
};
const createRTF= async (ruteToFollow) => {
    await ruteToFollow
    const res = await axios.post(`${API_URL}/ruteToFollow/createRTF`,ruteToFollow);

    return res.data;
}
const addToCrRTF = async (data) => {

    return data;
}
const shapeToCreate = async (ruteToFollow) => {
    return ruteToFollow;    
}
const deleteRTF = async (id) => {
    const res = await axios.delete(`${API_URL}/ruteToFollow/deleteRTF/${id}`);
    return res.data;
}
const updateRTF = async (id,updRTF) => {
    const res = await axios.put(`${API_URL}/ruteToFollow/update/${id}`,updRTF);
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