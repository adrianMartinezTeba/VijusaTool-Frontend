import React, { useState } from 'react';

const CreateRawMaterialsSection = () => {
  const [rawMaterialsData, setRawMaterialsData] = useState({
    rawMaterialId: '',
    diameter: '',
    whatToCut: '',
    pricePerUnit: 0,
    totalQuantity: 0,
    totalPrice: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRawMaterialsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h4>Materias primas:</h4>
      <div className="mb-3">
        <label htmlFor="rawMaterialId">Materia Prima:</label>
        <select
          id="rawMaterialId"
          name="rawMaterialId"
          className="form-select"
          value={rawMaterialsData.rawMaterialId}
          onChange={handleInputChange}
        >
          {/* Opciones de "Materias primas" */}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="diameter">Diámetro:</label>
        <input
          type="text"
          id="diameter"
          name="diameter"
          className="form-control"
          value={rawMaterialsData.diameter}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="whatToCut">Lo que Medirá / Lo que se Va a Cortar:</label>
        <input
          type="text"
          id="whatToCut"
          name="whatToCut"
          className="form-control"
          value={rawMaterialsData.whatToCut}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pricePerUnit">Precio por Unidad (en euros):</label>
        <input
          type="number"
          id="pricePerUnit"
          name="pricePerUnit"
          className="form-control"
          value={rawMaterialsData.pricePerUnit}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="totalQuantity">Cantidad Total:</label>
        <input
          type="number"
          id="totalQuantity"
          name="totalQuantity"
          className="form-control"
          value={rawMaterialsData.totalQuantity}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="totalPrice">Precio Final:</label>
        <input
          type="number"
          id="totalPrice"
          name="totalPrice"
          className="form-control"
          value={rawMaterialsData.totalPrice}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default CreateRawMaterialsSection;
