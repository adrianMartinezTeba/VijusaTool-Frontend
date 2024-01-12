import axios from "axios";

const API_URL = "https://vijusa-tool-backend.vercel.app";
const apiLocal = "http://localhost:8080";
const getContacts = async () => {
    const res = await axios.get(`${apiLocal}/contact/get`);
   
    return res.data;
};
const getContactById = async (id) => {
    const res = await axios.get(`${apiLocal}/contact/get/${id}`);
    return res.data;
};
const getContactByName = async (name) => {
    console.log(name);
    const res = await axios.get(`${apiLocal}/contact/getByName/${name}`);
    console.log(res.data);
    return res.data;
}
const createContact = async (contactData) => {
  await contactData
  console.log(contactData);
    const res = await axios.post(`${apiLocal}/contact/create`,contactData);

    return res.data;
}
const contactToCreate = async (contactData) => {

      return contactData;
  }
const deleteContact = async (id) => {
    const res = await axios.delete(`${apiLocal}/contact/delete/${id}`);
    return res.data;
}
const updateContact = async (id,updContact) => {
    const res = await axios.put(`${apiLocal}/contact/update/${id}`,updContact);
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