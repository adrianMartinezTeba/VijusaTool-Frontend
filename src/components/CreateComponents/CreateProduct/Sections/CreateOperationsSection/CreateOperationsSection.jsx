import React, { useState } from 'react';

const CreateOperationsSection = () => {
  const [operationsData, setOperationsData] = useState({
    operationId: '',
    notes: '',
    expectedTime: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOperationsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h4>Operaciones a seguir:</h4>
      <div className="mb-3">
        <label htmlFor="operationId">Operación a Seguir:</label>
        <select
          id="operationId"
          name="operationId"
          className="form-select"
          value={operationsData.operationId}
          onChange={handleInputChange}
        >
          {/* Opciones de "Operaciones a Seguir" */}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="notes">Notas:</label>
        <input
          type="text"
          id="notes"
          name="notes"
          className="form-control"
          value={operationsData.notes}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="expectedTime">Tiempo Esperado:</label>
        <input
          type="text"
          id="expectedTime"
          name="expectedTime"
          className="form-control"
          value={operationsData.expectedTime}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CreateOperationsSection;
