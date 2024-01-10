import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RMToCreate } from '../../../features/Promises/rawMaterial/rawMaterialSlice';
import { calculatePriceMetro} from '../../../features/NoPromises/operationsCreateRawMaterial/operations'; // Ajusta la ruta según sea necesario
import CreateRMDispatch from './Buttons/CreateRMDispatch';

const CreateRawMaterial = () => {
  const dispatch = useDispatch();
  const [rawMaterialData, setRawMaterialData] = useState({
    material: '',
    shape: '',
    priceKg: '',
    priceMeter: '',
    wheightMeter: '',
    externalDiameter: '',
    internalDiameter: ''
  });
const resetInputs = () =>{
  setRawMaterialData({
    material: '',
    shape: '',
    priceKg: '',
    priceMeter: '',
    wheightMeter: '',
    externalDiameter: '',
    internalDiameter: ''
  });
}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'priceKg') {
      const priceKg = value;
      if (!isNaN(priceKg)) {
        const priceMeter = calculatePriceMetro(priceKg, rawMaterialData.wheightMeter);
        setRawMaterialData((prevData) => ({
          ...prevData,
          priceKg,
          priceMeter,
        }));
      } else {
        setRawMaterialData((prevData) => ({
          ...prevData,
          priceKg,
          priceMeter: 'Se necesitan más datos',
        }));
      }
    } else if (name === 'wheightMeter') {
      const wheightMeter = value;
      if (!isNaN(wheightMeter)) {
        const priceMeter = calculatePriceMetro(rawMaterialData.priceKg, wheightMeter);
        setRawMaterialData((prevData) => ({
          ...prevData,
          wheightMeter,
          priceMeter,
        }));
      } else {
        setRawMaterialData((prevData) => ({
          ...prevData,
          wheightMeter,
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
    dispatch(RMToCreate(rawMaterialData));
  }, [rawMaterialData]);
  return (
    <div className="create-rm container">
      <h2>Crear Materia prima</h2>
      <form>
        <div className="mb-3">
          <label id='rmShape' className="form-label">Forma:</label>
          <input list="shapeOptions"  className="form-control" name="shape" value={rawMaterialData.shape} onChange={handleInputChange} placeholder="Ingresar o seleccionar forma" />
          <datalist id="shapeOptions">
            <option value="Tubo" />
            <option value="Pletina" />
            <option value="Barra" />
          </datalist>
        </div>
        <div className="mb-3">
          <label className="form-label" id='rmMaterial'>Tipo de Material:</label>
          <input  className="form-control" list="materialOptions" name="material" value={rawMaterialData.material} onChange={handleInputChange} placeholder="Ingresar o seleccionar tipo de material" />
          <datalist id="materialOptions">
            <option value="Latón" />
            <option value="Cobre" />
            <option value="Hierro" />
          </datalist>
        </div>
        <div className="mb-3">
          <label className="form-label">Diámetro Externo (mm+):</label>
          <input  className="form-control" type="text" name="externalDiameter" value={rawMaterialData.externalDiameter} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Diámetro Interno (mm):</label>
          <input  className="form-control" type="text" name="internalDiameter" value={rawMaterialData.internalDiameter} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label  className="form-label">Precio por Kg:</label>
          <input  className="form-control" type="number" step={"0.0001"} name="priceKg" value={rawMaterialData.priceKg} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Peso por metro (gramos):</label>
          <input  className="form-control" type="number" step={"0.0001"} name="wheightMeter" value={rawMaterialData.wheightMeter} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio por Metro:</label>
          <input  className="form-control" type="text" name="priceMeter" value={rawMaterialData.priceMeter} readOnly />
        </div>
      </form>
      <div>
        <CreateRMDispatch resetInputs={resetInputs} />
      </div>
    </div>
  );
};

export default CreateRawMaterial;
