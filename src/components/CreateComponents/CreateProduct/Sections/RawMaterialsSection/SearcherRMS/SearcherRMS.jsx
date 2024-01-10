import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRM, reset } from '../../../../../../features/Promises/rawMaterial/rawMaterialSlice';
import AddOnSearcherRMS from '../Buttons/AddOnSearcherRMS/AddOnSearcherRMS';
const SearcherRMS = ({ addToRawMaterialsArray }) => {
  const dispatch = useDispatch();
  const { rawMaterials } = useSelector((state) => state.rawMaterial);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getRM())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(reset());
      console.log('Limpieza del estado de materias primas');
    };
  }, [dispatch]);

  return (
    <div className='table-responsive'>
      {loading ? (
        <p>Cargando...</p> // Muestra un spinner de carga mientras se cargan las materias primas
      ) : (
        <table className='table table-striped'>
          <thead className="table-dark">
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
                  <td>{material.shape}</td>
                  <td>{material.material}</td>
                  <td>{material.externalDiameter}</td>
                  <td>{material.internalDiameter}</td>
                  <td>{material.priceKg}</td>
                  <td>{material.wheightMeter}</td>
                  <td>{material.priceMeter}</td>
                  <td>
                    <AddOnSearcherRMS RMData={material} addToRawMaterialsArray={addToRawMaterialsArray} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='8'>No hay materias primas para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearcherRMS;
