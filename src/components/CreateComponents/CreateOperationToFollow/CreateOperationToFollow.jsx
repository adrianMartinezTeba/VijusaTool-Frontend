import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OTFToCreate } from '../../../features/Promises/operationToFollow/operationToFollowSlice';
import CreateOTFDispatch from '../../Buttons/CreateOTFDispatch/CreateOTFDispatch';
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
  useEffect(() => {
    console.log(operationData);
    dispatch(OTFToCreate(operationData));
}, [operationData]);
  return (
    <div>
      <h2>Crear Operación a Seguir</h2>
      <form>
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
       
      </form>
      <div>
        <CreateOTFDispatch/>
      </div>
    </div>
  );
};

export default CreateOperationToFollow;
