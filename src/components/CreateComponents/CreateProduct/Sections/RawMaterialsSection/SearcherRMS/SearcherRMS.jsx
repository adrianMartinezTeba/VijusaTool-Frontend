import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRM,reset} from '../../../../../../features/Promises/rawMaterial/rawMaterialSlice';
import AddOnSearcherRMS from '../Buttons/AddOnSearcherRMS/AddOnSearcherRMS';
const SearcherRMS = ({addToRawMaterialsArray}) => {
  const dispatch = useDispatch();
  const { rawMaterials} = useSelector((state) => state.rawMaterial);
  useEffect(() => { 
    dispatch(getRM());
    return ()=>{
      dispatch(reset());
      console.log('se limpiaaaaa');
    }
  }, []);
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
          {rawMaterials  ? (
            rawMaterials.map((material) => (
              <tr key={material._id}>
                <td>{material.shape}</td>
                <td>{material.material}</td>
                <td>{material.externalDiameter}</td>
                <td>{material.internalDiameter}</td>
                <td>{material.priceKg}</td>
                <td>{material.wheightMeter}</td>
                <td>{material.priceMetro}</td>
                <td>
                 <AddOnSearcherRMS RMData={material} addToRawMaterialsArray={addToRawMaterialsArray}/>
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