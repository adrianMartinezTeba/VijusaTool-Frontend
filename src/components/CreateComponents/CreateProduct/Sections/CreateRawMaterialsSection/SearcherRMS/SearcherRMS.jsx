import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRM } from '../../../../../../features/Promises/rawMaterial/rawMaterialSlice';

const SearcherRMS = ({ addToArray }) => {
  const dispatch = useDispatch();
  const { rawMaterials, isSuccessRawMaterial, isErrorRawMaterial, messageRawMaterial } = useSelector((state) => state.rawMaterial);

  useEffect(() => {
    dispatch(getRM());
  }, []);

  useEffect(() => {
    // Lógica adicional cuando rawMaterials cambia
  }, [rawMaterials]);

  return (
    <div className='table-responsive'>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Tipo</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Diámetro Externo</th>
            <th scope='col'>Diámetro Interno</th>
            <th scope='col'>Precio por Kg</th>
            <th scope='col'>Peso por Metro</th>
            <th scope='col'>Precio por Metro</th>
            <th scope='col'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rawMaterials && rawMaterials.length > 0 ? (
            rawMaterials.map((material) => (
              <tr key={material._id}>
                <td>{material.typeMat.TypeMat}</td>
                <td>{material.material.name}</td>
                <td>{material.externalDiameter}</td>
                <td>{material.internalDiameter}</td>
                <td>{material.priceKg}</td>
                <td>{material.wheightMeter}</td>
                <td>{material.priceMetro}</td>
                <td>
                  <button className='btn btn-primary' onClick={(e) => { addToArray(material, e) }}>
                    Añadir
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='8'>Cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearcherRMS;
