import React, { useEffect, useState } from 'react';
import './CreateContact.scss'; // Asegúrate de importar tus estilos SCSS
import { useDispatch, useSelector } from "react-redux";
import { contactToCreate} from "../../../features/Promises/contact/contactSlice";
import CreateContactDispatch from './Buttons/CreateContactDispatch';
const CreateContact = () => {
    const dispatch = useDispatch();
    const [contactData, setContactData] = useState({
        name: '',
        address: '',
        type: 'Cliente', // Valor por defecto para el tipo de contacto
        tlfn: '',
        productsProvided: '', // Campo para productos proporcionados por proveedores
    });
const resetCrContact = () => {
    setContactData({
        name: '',
        address: '',
        type: 'Cliente', // Valor por defecto para el tipo de contacto
        tlfn: '',
        productsProvided: '', // Campo para productos proporcionados por proveedor
    });
}
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
                    <label htmlFor="name">Nombre(Obligado):</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="address">Dirección(Opcional):</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={contactData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor="type">Tipo(Obligado):</label>
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
                <div className='form-group'>
                    <label htmlFor="tlfn">Teléfono(Obligado):</label>
                    <input
                        type="text"
                        id="tlfn"
                        name="tlfn"
                        value={contactData.tlfn}
                        onChange={handleInputChange}
                    />
                </div>
            </form>
                <div className='form-group'>
                    <CreateContactDispatch resetCrContact={resetCrContact}/>
                </div>
        </div>
    );
};

export default CreateContact;
