import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RMToCreate } from '../../../features/Promises/rawMaterial/rawMaterialSlice';
import { calculatePriceMetro } from '../../../features/NoPromises/operationsCreateRawMaterial/operations'; // Ajusta la ruta según sea necesario
import CreateRMDispatch from './Buttons/CreateRMDispatch';

const CreateRawMaterial = () => {
  const dispatch = useDispatch();
  const [rawMaterialData, setRawMaterialData] = useState({
    material: '',
    shape: '',
    priceKg: '',
    priceMeter: '',
    wheightMeter: '', // Corregido a "weightMeter"
    externalDiameter: '',
    internalDiameter: ''
  });

  const [errors, setErrors] = useState({});

  const resetInputs = () => {
    setRawMaterialData({
      material: '',
      shape: '',
      priceKg: '',
      priceMeter: '',
      wheightMeter: '', // Corregido a "weightMeter"
      externalDiameter: '',
      internalDiameter: ''
    });
    setErrors({});
  };

  const validate = (name, value) => {
    let error = '';
    switch (name) {
      case 'material':
        if (!value) error = 'El material es requerido';
        break;
      case 'shape':
        if (!value) error = 'La forma es requerida';
        break;
      case 'priceKg':
        if (!value) error = 'El precio por Kg es requerido';
        else if (isNaN(value)) error = 'Debe ser un número';
        break;
      case 'wheightMeter': // Corregido a "weightMeter"
        if (!value) error = 'El peso por metro es requerido';
        else if (isNaN(value)) error = 'Debe ser un número';
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (name === 'priceKg' || name === 'wheightMeter') {
      const priceKg = name === 'priceKg' ? value : rawMaterialData.priceKg;
      const wheightMeter = name === 'wheightMeter' ? value : rawMaterialData.wheightMeter;
      if (!isNaN(priceKg) && !isNaN(wheightMeter) && priceKg && wheightMeter) {
        const priceMeter = calculatePriceMetro(priceKg, wheightMeter);
        setRawMaterialData((prevData) => ({
          ...prevData,
          [name]: value,
          priceMeter,
        }));
      } else {
        setRawMaterialData((prevData) => ({
          ...prevData,
          [name]: value,
          priceMeter: '',
        }));
      }
    } else {
      setRawMaterialData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (Object.values(errors).every((error) => !error) && Object.values(rawMaterialData).every((field) => field !== '')) {
      dispatch(RMToCreate(rawMaterialData)); // Se despachan los datos aquí
    }
  }, [rawMaterialData]);

  return (
    <div className="create-rm container">
      <h2>Crear Materia Prima</h2>
      <form>
        <div className="mb-3">
          <label id="rmShape" className="form-label">Forma:</label>
          <input
            list="shapeOptions"
            className="form-control"
            name="shape"
            value={rawMaterialData.shape}
            onChange={handleInputChange}
            placeholder="Ingresar o seleccionar forma"
          />
          <datalist id="shapeOptions">
            <option value="Tubo" />
            <option value="Pletina" />
            <option value="Barra" />
          </datalist>
          {errors.shape && <div className="text-danger">{errors.shape}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" id="rmMaterial">Tipo de Material:</label>
          <input
            className="form-control"
            list="materialOptions"
            name="material"
            value={rawMaterialData.material}
            onChange={handleInputChange}
            placeholder="Ingresar o seleccionar tipo de material"
          />
          <datalist id="materialOptions">
            <option value="Latón" />
            <option value="Cobre" />
            <option value="Hierro" />
          </datalist>
          {errors.material && <div className="text-danger">{errors.material}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Diámetro Externo (mm+):</label>
          <input
            className="form-control"
            type="text"
            name="externalDiameter"
            value={rawMaterialData.externalDiameter}
            onChange={handleInputChange}
          />
          {errors.externalDiameter && <div className="text-danger">{errors.externalDiameter}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Diámetro Interno (mm):</label>
          <input
            className="form-control"
            type="text"
            name="internalDiameter"
            value={rawMaterialData.internalDiameter}
            onChange={handleInputChange}
          />
          {errors.internalDiameter && <div className="text-danger">{errors.internalDiameter}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Precio por Kg:</label>
          <input
            className="form-control"
            type="number"
            step={"0.0001"}
            name="priceKg"
            value={rawMaterialData.priceKg}
            onChange={handleInputChange}
          />
          {errors.priceKg && <div className="text-danger">{errors.priceKg}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Peso por metro (gramos):</label>
          <input
            className="form-control"
            type="number"
            step={"0.0001"}
            name="wheightMeter" // Corregido a "weightMeter"
            value={rawMaterialData.wheightMeter} // Corregido a "weightMeter"
            onChange={handleInputChange}
          />
          {errors.weightMeter && <div className="text-danger">{errors.weightMeter}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Precio por Metro:</label>
          <input
            className="form-control"
            type="text"
            name="priceMeter"
            value={rawMaterialData.priceMeter}
            readOnly
          />
        </div>
      </form>
      <div>
        <CreateRMDispatch rawMaterialData={rawMaterialData} resetInputs={resetInputs} />
      </div>
    </div>
  );
};

export default CreateRawMaterial;
