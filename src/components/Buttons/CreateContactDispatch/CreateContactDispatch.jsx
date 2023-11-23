import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createContact } from "../../../features/Promises/contact/contactSlice"; // Asegúrate de importar el slice correcto

const CreateContactDispatch = () => {
    const dispatch = useDispatch()
    const {contact} = useSelector(
        (state) => state.contact
      );
  return (
    <div>
      <button onClick={() => dispatch(createContact(contact))}>Crear</button>
    </div>
  )
}

export default CreateContactDispatch
