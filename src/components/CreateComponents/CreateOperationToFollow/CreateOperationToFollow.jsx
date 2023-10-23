import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../../features/operationToFollow/operationToFollowSlice';
const CreateOperationToFollow = () => {
  const dispatch = useDispatch();
  const [operationData, setOperationData] = useState({
    name: '',
    codeOperation: '',
    notes: '',
    priceHourEur: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOperationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create(operationData));
    console.log(operationData);
  };

  return (
    <div>
      <h2>Crear Operación a Seguir</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la Operación:</label>
          <input
            type="text"
            name="name"
            value={operationData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Código de la Operación:</label>
          <input
            type="number"
            name="codeOperation"
            value={operationData.codeOperation}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Notas:</label>
          <textarea
            name="notes"
            value={operationData.notes}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Precio por Hora (EUR):</label>
          <input
            type="number"
            step={'0.0001'}
            name="priceHourEur"
            value={operationData.priceHourEur}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Crear Operación</button>
      </form>
    </div>
  );
};

export default CreateOperationToFollow;
