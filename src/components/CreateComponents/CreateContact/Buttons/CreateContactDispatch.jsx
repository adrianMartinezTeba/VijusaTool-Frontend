import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createContact } from "../../../../features/Promises/contact/contactSlice"; // Asegúrate de importar el slice correcto

const CreateContactDispatch = ({resetCrContact}) => {
    const dispatch = useDispatch()
    const {contact} = useSelector(
        (state) => state.contact
      );
      const handleClick = (data) =>{
        dispatch(createContact(data))
        resetCrContact()
      }
  return (
    <div>
      <button onClick={() => handleClick(contact)}>Crear</button>
    </div>
  )
}

export default CreateContactDispatch
