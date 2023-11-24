
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RMToCreate } from '../../../features/Promises/rawMaterial/rawMaterialSlice';
import { getMaterials } from '../../../features/Promises/material/materialSlice';
import { getShapes } from '../../../features/Promises/shape/shapeSlice';
import { calculatePriceMetro} from '../../../features/NoPromises/operationsCreateRawMaterial/operations'; // Ajusta la ruta según sea necesario
import CreateRMDispatch from '../../Buttons/CreateRMDispatch/CreateRMDispatch';

const CreateRawMaterial = () => {
  const [rawMaterialData, setRawMaterialData] = useState({
    material: '',
    shape: '',
    priceKg: '',
    priceMetro: '',
    wheightMeter: '',
    externalDiameter: '',
    internalDiameter: ''
  });
  const dispatch = useDispatch();
  const { materials, isSuccessMaterial, isErrorMaterial, messageMaterial } = useSelector(
    (state) => state.material
  );
  const { shapes } = useSelector(
    (state) => state.shape
  );
  const { rawMaterial } = useSelector(
    (state) => state.rawMaterial
  );


  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getShapes());
  }, []);
  useEffect(() => {
console.log(shapes);
console.log(materials);
  }, [shapes, materials]);
  useEffect(() => {
    console.log(rawMaterialData);
dispatch(RMToCreate(rawMaterialData));
  }, [rawMaterialData]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'priceKg') {
      const priceKg = value;

      if (!isNaN(priceKg)) {
        const priceMetro = calculatePriceMetro(priceKg, rawMaterialData.wheightMeter);
        setRawMaterialData((prevData) => ({
          ...prevData,
          priceKg,
          priceMetro,
        }));
      } else {
        setRawMaterialData((prevData) => ({
          ...prevData,
          priceKg,
          priceMetro: 'Se necesitan más datos',
        }));
      }
    } else if (name === 'wheightMeter') {
      const wheightMeter = value;

      if (!isNaN(wheightMeter)) {
        const priceMetro = calculatePriceMetro(rawMaterialData.priceKg, wheightMeter);
        setRawMaterialData((prevData) => ({
          ...prevData,
          wheightMeter,
          priceMetro,
        }));
      } else {
        setRawMaterialData((prevData) => ({
          ...prevData,
          wheightMeter,
          priceMetro: '',
        }));
      }
    } else {
      setRawMaterialData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h2>Crear Materia prima</h2>
      <form>
        <div>
        <label>Forma:</label>
          <select name="shape" value={rawMaterialData.shape} onChange={handleInputChange}>
            <option value="">Seleccionar material existente o crear uno nuevo</option>
            {shapes ? (
              shapes.map((shape) => (
                <option key={shape._id} value={shape._id}>{shape.nameShape}</option>
              ))
            ) : (
              <option value="">Cargando formas...</option>
            )}
          </select>
        </div>
        <div>
          <label>Tipo de Material:</label>
          <select name="material" value={rawMaterialData.material} onChange={handleInputChange}>
            <option value="">Seleccionar tipo de material existente o crear uno nuevo</option>
            {materials ? (
              materials.map((material) => (
                <option key={material._id} value={material._id}>{material.nameMaterial}</option>
              ))
            ) : (
              <option value="">Cargando tipos de materiales...</option>
            )}
          </select>
        </div>
        <div>
          <label>Diámetro Externo (mm+):</label>
          <input type="text" name="externalDiameter" value={rawMaterialData.externalDiameter} onChange={handleInputChange} />
        </div>
        <div>
          <label>Diámetro Interno (mm):</label>
          <input type="text" name="internalDiameter" value={rawMaterialData.internalDiameter} onChange={handleInputChange} />
        </div>
        <div>
          <label>Precio por Kg:</label>
          <input type="number" step={"0.0001"} name="priceKg" value={rawMaterialData.priceKg} onChange={handleInputChange} />
        </div>
        <div>
          <label>Peso por metro (gramos):</label>
          <input type="number" step={"0.0001"} name="wheightMeter" value={rawMaterialData.wheightMeter} onChange={handleInputChange} />
        </div>
        <div>
          <label>Precio por Metro:</label>
          <input type="text" name="priceMetro" value={rawMaterialData.priceMetro} readOnly />
        </div>
        
      </form >
            <div>
             <CreateRMDispatch/>
            </div>
    </div >
  );
};

export default CreateRawMaterial;
