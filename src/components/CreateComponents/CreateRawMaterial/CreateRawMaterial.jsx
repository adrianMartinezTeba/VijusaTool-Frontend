import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { create } from '../../../features/rawMaterial/rawMaterialSlice';
import { getMaterials } from '../../../features/material/materialSlice';
import { getTypeMats } from '../../../features/typeMat/typeMatSlice';

const CreateRawMaterial = () => {
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
  console.log(rawMaterialData.priceKg);
  console.log(rawMaterialData.wheightMeter);
  console.log(rawMaterialData.priceMetro);
  console.log(rawMaterialData);
},[rawMaterialData])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'priceKg') {
      const priceKg = value
  
      if (!isNaN(priceKg)) {
        const priceMetro = ((priceKg * rawMaterialData.wheightMeter)/1000).toFixed(3);
        console.log(priceMetro);
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
        const priceMetro = ((rawMaterialData.priceKg * wheightMeter)/1000).toFixed(3);
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
        <button type="submit">Crear Material Crudo</button>
      </form>
    </div>
  );
};

export default CreateRawMaterial;
