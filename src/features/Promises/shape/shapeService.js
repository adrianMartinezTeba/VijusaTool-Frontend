import axios from "axios";

const API_URL = "http://localhost:8080";

const getShapes = async () => {
    const res = await axios.get(`${API_URL}/shape/get`);
    return res.data;
};
const getShapeById = async (id) => {
    const res = await axios.get(`${API_URL}/shape/get/${id}`);
    return res.data;
};
const createShape = async (shape) => {
    await shape
    console.log(
        shape
    );
    const res = await axios.post(`${API_URL}/shape/create`,shape);

    return res.data;
}
const shapeToCreate = async (shape) => {
  console.log(
    shape
  );
    return shape;    
}
const deleteShape = async (id) => {
    const res = await axios.delete(`${API_URL}/shape/delete/${id}`);
    return res.data;
}
const updateShape = async (id,updShape) => {
    const res = await axios.put(`${API_URL}/shape/update/${id}`,updShape);
    return res.data;
}

const typeMatService = {
createShape,
shapeToCreate,
deleteShape,
getShapeById,
getShapes,
updateShape
};

export default typeMatService;