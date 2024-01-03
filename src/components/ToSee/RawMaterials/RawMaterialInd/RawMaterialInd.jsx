import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRMById } from '../../../../features/Promises/rawMaterial/rawMaterialSlice';

const RawMaterialInd = () => {
  const dispatch = useDispatch();
  const { rawMaterial } = useSelector((state) => state.rawMaterial);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRMById(id));
  }, [id]);

  useEffect(() => {
    console.log(rawMaterial);
  }, [rawMaterial]);

  return (
    <div className="container mt-5">
      {rawMaterial ? (
        <div>
          <p className="lead">Forma: {rawMaterial.shape}</p>
          <p className="lead">Material: {rawMaterial.material}</p>
          <p className="lead">D.Externo: {rawMaterial.externalDiameter}</p>
          <p className="lead">D.Interno: {rawMaterial.internalDiameter}</p>
          <p className="lead">Precio por 1kg(€): {rawMaterial.priceKg}</p>
          <p className="lead">Precio por 1 metro(€): {rawMaterial.priceMeter}</p>
          {/* Si deseas mostrar información adicional, puedes agregar más elementos aquí */}
          {rawMaterial.stock && (
            <p className="lead">Stock: {rawMaterial.stock}</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RawMaterialInd;
