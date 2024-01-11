import axios from "axios";

const API_URL = "vijusa-tool-backend.vercel.app";
const addToCreateProductState = {
    addContactId : (data) => {
        return data
    },
    addModelName: (data) => {
        return data
    },
    addRawMaterials: (data) => {
        return data
    },
    deleteRawMaterial: (data) => {
        return data
    },
    addOperation: (data) => {
        return data
    },
    deleteOperation: (data) => {
        return data
    },
    addTotalPrice: (data) => {
        return data
    },
    executeFunction: (functionName, data) => {
        // Verifica el nombre de la función y ejecuta la correspondiente
        if (functionName && addToCreateProductState[functionName]) {
            return addToCreateProductState[functionName](data);
        }
        // Si el nombre de la función no es válido, puedes manejarlo como desees
        console.error('Función no válida');
        return Promise.reject('Función no válida');
    },
}
const getProducts = async () => {
    const res = await axios.get(`${API_URL}/product/get`);
    return res.data;
};
const getProductsWithOutRTF = async () => {
    const res = await axios.get(`${API_URL}/product/getWithoutRTF`);
    return res.data;
};
const getProductById = async (id) => {
    const res = await axios.get(`${API_URL}/product/get/${id}`);
    return res.data;
};
const getLastProduct = async () => {
    const res = await axios.get(`${API_URL}/product/getLast`);
    console.log(res.data);
    return res.data;
}
const create = async (product) => {
    const res = await axios.post(`${API_URL}/product/create`,product);

    return res.data;
}
const deleteProduct = async (id) => {
    const res = await axios.delete(`${API_URL}/product/delete/${id}`);
    return res.data;
}

const updateProduct = async (updProduct,id) => {
    const res = await axios.put(`${API_URL}/product/update/${id}`,updProduct);
    return res.data;
}

const productService = {
create,
deleteProduct,
getProductById,
getProducts,
getProductsWithOutRTF,
getLastProduct,
updateProduct,
addToCreateProductState
};

export default productService;