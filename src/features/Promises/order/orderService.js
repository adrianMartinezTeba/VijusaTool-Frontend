import axios from "axios";

const API_URL = "http://localhost:8080";
const addToCreateOrderState = {
    addProduct : (data) => {
        return data
    },
    executeFunction: (functionName, data) => {
        // Verifica el nombre de la función y ejecuta la correspondiente
        if (functionName && addToCreateOrderState[functionName]) {
            return addToCreateOrderState[functionName](data);
        }
        // Si el nombre de la función no es válido, puedes manejarlo como desees
        console.error('Función no válida');
        return Promise.reject('Función no válida');
    },
}
const getOrders = async () => {
    const res = await axios.get(`${API_URL}/order/get`);
    return res.data;
};
const getContactById = async (id) => {
    const res = await axios.get(`${API_URL}/order/get/${id}`);
    return res.data;
};
const create = async (order) => {
    const res = await axios.post(`${API_URL}/order/create`,order);

    return res.data;
}
const deleteOrder = async (id) => {
    const res = await axios.delete(`${API_URL}/order/delete/${id}`);
    return res.data;
}
const updateOrder = async (id,updOrder) => {
    const res = await axios.put(`${API_URL}/order/update/${id}`,updOrder);
    return res.data;
}

const productService = {
create,
deleteOrder,
getContactById,
getOrders,
updateOrder
};

export default productService;