import React, { useEffect, useState } from 'react';
import './CreateContact.scss'; // Asegúrate de importar tus estilos SCSS
import { useDispatch, useSelector } from "react-redux";
import { contactToCreate} from "../../../features/Promises/contact/contactSlice";
import CreateContactDispatch from '../../Buttons/CreateContactDispatch/CreateContactDispatch';
const CreateContact = () => {
    const dispatch = useDispatch();
  
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
useEffect(() => {
    dispatch(contactToCreate(contactData));
}, [contactData]);


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
                {/* Otros campos de formulario */}
            </form>
                <div className='form-group'>
                    <CreateContactDispatch />
                </div>
        </div>
    );
};

export default CreateContact;
