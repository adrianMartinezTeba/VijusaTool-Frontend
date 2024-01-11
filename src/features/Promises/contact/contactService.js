import axios from "axios";

const API_URL = "vijusa-tool-backend.vercel.app";

const getContacts = async () => {
    const res = await axios.get(`${API_URL}/contact/get`);
   
    return res.data;
};
const getContactById = async (id) => {
    const res = await axios.get(`${API_URL}/contact/get/${id}`);
    return res.data;
};
const getContactByName = async (name) => {
    console.log(name);
    const res = await axios.get(`${API_URL}/contact/getByName/${name}`);
    console.log(res.data);
    return res.data;
}
const createContact = async (contactData) => {
  await contactData
  console.log(contactData);
    const res = await axios.post(`${API_URL}/contact/create`,contactData);

    return res.data;
}
const contactToCreate = async (contactData) => {

      return contactData;
  }
const deleteContact = async (id) => {
    const res = await axios.delete(`${API_URL}/contact/delete/${id}`);
    return res.data;
}
const updateContact = async (id,updContact) => {
    const res = await axios.put(`${API_URL}/contact/update/${id}`,updContact);
    return res.data;
}

const productService = {
createContact,
contactToCreate,
deleteContact,
getContactById,
getContacts,
getContactByName,
updateContact
};

export default productService;