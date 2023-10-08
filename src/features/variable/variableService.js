import axios from "axios";

const API_URL = "http://localhost:8080";

const getVariables = async () => {
    const res = await axios.get(`${API_URL}/variable/get`);
    return res.data;
};
const getVariableById = async (id) => {
    const res = await axios.get(`${API_URL}/variable/get/${id}`);
    return res.data;
};
const create = async (variable) => {
    const res = await axios.post(`${API_URL}/variable/create`,variable);

    return res.data;
}
const deleteVariable = async (id) => {
    const res = await axios.delete(`${API_URL}/variable/delete/${id}`);
    return res.data;
}
const updateVariable = async (id) => {
    const res = await axios.put(`${API_URL}/variable/update/${id}`,);
    return res.data;
}

const variableService = {
create,
deleteVariable,
getVariableById,
getVariables,
updateVariable
};

export default variableService;