import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactToCreate } from '../../../features/Promises/contact/contactSlice';
import CreateContactDispatch from './Buttons/CreateContactDispatch';

const CreateContact = () => {
  const dispatch = useDispatch();
  const [contactData, setContactData] = useState({
    name: '',
    address: '',
    type: 'Cliente',
    tlfn: '',
    productsProvided: '',
  });

  const resetCrContact = () => {
    setContactData({
      name: '',
      address: '',
      type: 'Cliente',
      tlfn: '',
      productsProvided: '',
    });
  };

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
    <div className="create-contact container">
      <h2>Crear Contacto</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre (Obligado):
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={contactData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Dirección (Opcional):
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={contactData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Tipo (Obligado):
          </label>
          <select
            className="form-select"
            id="type"
            name="type"
            value={contactData.type}
            onChange={handleInputChange}
          >
            <option value="Cliente">Cliente</option>
            <option value="Proveedor">Proveedor</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tlfn" className="form-label">
            Teléfono (Obligado):
          </label>
          <input
            type="text"
            className="form-control"
            id="tlfn"
            name="tlfn"
            value={contactData.tlfn}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="mb-3">
        <CreateContactDispatch resetCrContact={resetCrContact} />
      </div>
    </div>
  );
};

export default CreateContact;
