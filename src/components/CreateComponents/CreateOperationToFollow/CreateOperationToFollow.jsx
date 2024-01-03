import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OTFToCreate } from '../../../features/Promises/operationToFollow/operationToFollowSlice';
import CreateOTFDispatch from './Buttons/CreateOTFDispatch';

const CreateOperationToFollow = () => {
  const dispatch = useDispatch();
  const [operationData, setOperationData] = useState({
    name: '',
    codeOperation: '',
    priceHourEur: '',
  });

  const resetCrOTF = () => {
    setOperationData({
      name: '',
      codeOperation: '',
      priceHourEur: '',
    });
  };

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
    <div className="container">
      <h2>Crear Operación a Seguir</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre de la Operación:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={operationData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="codeOperation" className="form-label">
            Código de la Operación:
          </label>
          <input
            type="number"
            className="form-control"
            id="codeOperation"
            name="codeOperation"
            value={operationData.codeOperation}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priceHourEur" className="form-label">
            Precio por Hora (EUR):
          </label>
          <input
            type="number"
            step={'0.0001'}
            className="form-control"
            id="priceHourEur"
            name="priceHourEur"
            value={operationData.priceHourEur}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="mb-3">
        <CreateOTFDispatch resetCrOTF={resetCrOTF} />
      </div>
    </div>
  );
};

export default CreateOperationToFollow;
