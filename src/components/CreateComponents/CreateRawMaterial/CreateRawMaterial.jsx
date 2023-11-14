
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../../features/Promises/rawMaterial/rawMaterialSlice';
import { getMaterials } from '../../../features/Promises/material/materialSlice';
import { getTypeMats } from '../../../features/Promises/typeMat/typeMatSlice';
import { calculatePriceMetro} from '../../../features/NoPromises/operationsCreateRawMaterial/operations'; // Ajusta la ruta según sea necesario

const CreateRawMaterial = ({ handleBtnState, buttonsState }) => {
  const dispatch = useDispatch();
  const { materials, isSuccessMaterial, isErrorMaterial, messageMaterial } = useSelector(
    (state) => state.material
  );
  const { typeMats, isSuccessTypeMat, isErrorTypeMat, messageTypeMat } = useSelector(
    (state) => state.typeMat
  );

  const [rawMaterialData, setRawMaterialData] = useState({
    material: '',
    typeMat: '',
    externalDiameter: '',
    internalDiameter: '',
    priceKg: '',
    wheightMeter: '',
    priceMetro: '',
  });

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getTypeMats());
  }, [dispatch]);
  useEffect(() => {

  }, [buttonsState]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rawMaterialData);
    dispatch(create(rawMaterialData));
    handleBtnState('cerrar');
  };

  return (
    <div>
      <h2>Crear Material Crudo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Material:</label>
          <select name="material" value={rawMaterialData.material} onChange={handleInputChange}>
            <option value="">Seleccionar material existente o crear uno nuevo</option>
            {materials ? (
              materials.map((material) => (
                <option key={material._id} value={material._id}>{material.name}</option>
              ))
            ) : (
              <option value="">Cargando materiales...</option>
            )}
          </select>
        </div>
        <div>
          <label>Tipo de Material:</label>
          <select name="typeMat" value={rawMaterialData.typeMat} onChange={handleInputChange}>
            <option value="">Seleccionar tipo de material existente o crear uno nuevo</option>
            {typeMats ? (
              typeMats.map((typeMat) => (
                <option key={typeMat._id} value={typeMat._id}>{typeMat.TypeMat}</option>
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
            <div>
              <button type="submit">Crear</button>
            </div>
        
      </form >
    </div >
  );
};

export default CreateRawMaterial;
