import axios from "axios";

const API_URL = "http://localhost:8080";

const getProducts = async () => {
    const res = await axios.get(`${API_URL}/product/get`);
    return res.data;
};
const getProductById = async (id) => {
    const res = await axios.get(`${API_URL}/product/get/${id}`);
    return res.data;
};
const create = async (product) => {
    const res = await axios.post(`${API_URL}/product/create`,product);

    return res.data;
}
const addToCreateProductRMObj = async (newData) => {

   return newData ;
};
const addToRMSectToView = async(newData) => {
   return newData
};
const addToRMSectToSend = async(newData) => {
    return newData
 };

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
addToCreateProductRMObj,
addToRMSectToView,
addToRMSectToSend,
deleteProduct,
getProductById,
getProducts,
updateProduct
};

export default productService;