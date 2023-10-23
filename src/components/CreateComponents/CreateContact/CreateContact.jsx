import React, { useEffect, useState } from 'react';
import './CreateContact.scss'; // Asegúrate de importar tus estilos SCSS
import { useDispatch, useSelector } from "react-redux";
import { create} from "../../../features/contact/contactSlice";
const CreateContact = () => {
    const dispatch = useDispatch();
    // const { exercises } = useSelector((state) => state.exercises);
//   useEffect(() => {
//     console.log(contactData);
//   },[contactData])
    const handleCreateContact = (e) => {
        e.preventDefault();
      dispatch(create(contactData));
      
    };
  
    const [contactData, setContactData] = useState({
        name: '',
        address: '',
        type: 'Cliente', // Valor por defecto para el tipo de contacto
        tlfn: '',
        productsProvided: '', // Campo para productos proporcionados por proveedores
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContactData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    return (
        <div className="create-contact">
            <h2>Crear Contacto</h2>
            <form>
                <div className='form-group'>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="address">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={contactData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="type">Tipo:</label>
                    <select
                        id="type"
                        name="type"
                        value={contactData.type}
                        onChange={handleInputChange}
                    >
                        <option value="Cliente">Cliente</option>
                        <option value="Proveedor">Proveedor</option>
                    </select>
                </div>
                {contactData.type === "Proveedor" && (
                    <div className='form-group'>
                        <label htmlFor="productsProvided">Productos que provee:</label>
                        <input
                            type="text"
                            id="productsProvided"
                            name="productsProvided"
                            value={contactData.productsProvided}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className='form-group'>
                    <label htmlFor="tlfn">Teléfono:</label>
                    <input
                        type="text"
                        id="tlfn"
                        name="tlfn"
                        value={contactData.tlfn}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <button type='submit' onClick={handleCreateContact} className='btn'>Crear</button>
                </div>
                {/* Otros campos de formulario */}
            </form>
        </div>
    );
};

export default CreateContact;
