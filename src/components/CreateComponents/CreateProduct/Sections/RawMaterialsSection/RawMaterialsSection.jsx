import React, { useState, useEffect } from 'react';
import './RawMaterialsSection.scss';
import CreateRawMaterial from '../../../CreateRawMaterial/CreateRawMaterial.jsx';
import SearcherRMS from './SearcherRMS/SearcherRMS.jsx';
import { priceOnThisRawMaterial, priceCut } from '../../../../../features/NoPromises/operationsRawMaterialSection/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import {reset,addToCreateProductState} from '../../../../../features/Promises/product/productSlice.js';
import DeleteRaw from './Buttons/DeleteRaw/DeleteRaw.jsx';
const RawMaterialsSection = () => {
  const dispatch = useDispatch();
  const [buttonsState, setButtonsState] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });
  const [rawMaterialsArray, setRawMaterialsArray] = useState([]);

  const addToRawMaterialsArray = (data) =>{
    const addingData = { ...data,rawMaterialId: data._id,precioDelCorte: '', cantidadDeCortes: '', precioTotalSobreEsaMateriaPrima: '', tamañoDelCorte: '' }
    setRawMaterialsArray([...rawMaterialsArray,addingData])
  }
  const deleteRawMaterialFromArray = (data) =>{
    const newArray = [...rawMaterialsArray];
    newArray.splice(data, 1);
    setRawMaterialsArray(newArray);
  }
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newArray = [...rawMaterialsArray];
    if (name === 'tamañoDelCorte') {
      newArray[index] = {
        ...newArray[index],
        tamañoDelCorte: value,
        precioDelCorte: priceCut(value, newArray[index].priceMetro),
        precioTotalSobreEsaMateriaPrima: priceOnThisRawMaterial(
          newArray[index].cantidadDeCortes,
          priceCut(value, newArray[index].priceMetro)
        ),
      };
    } else if (name === 'cantidadDeCortes') {
      newArray[index] = {
        ...newArray[index],
        cantidadDeCortes: value,
        precioTotalSobreEsaMateriaPrima: priceOnThisRawMaterial(
          value,
          newArray[index].precioDelCorte
        ),
      };
    } else {
      newArray[index] = {
        ...newArray[index],
        [name]: value,
      };
    }
setRawMaterialsArray(newArray);
dispatch(addToCreateProductState({ functionName: 'addRawMaterials', data: newArray}));
  };
  const handleBtnState = (action) => {
    setButtonsState({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };
  useEffect(() => {
    console.log(rawMaterialsArray);
  },[rawMaterialsArray])
  return (
    <div className="container mt-4">
      <h3>Materias primas</h3>
      {rawMaterialsArray.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Nombre</th>
                <th scope="col">Diámetro Externo</th>
                <th scope="col">Diámetro Interno</th>
                <th scope="col">Precio por Kg</th>
                <th scope="col">Peso por Metro(g)</th>
                <th scope="col">Precio por Metro</th>
                <th scope="col">Tamaño del corte(mm)</th>
                <th scope="col">Precio por corte</th>
                <th scope="col">Cantidad de cortes</th>
                <th scope="col">Precio sobre esta materia</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {rawMaterialsArray.map((item, index) => (
                <tr key={index}>
                  <td>{item.shape.nameShape}</td>
                  <td>{item.material.nameMaterial}</td>
                  <td>{item.externalDiameter}</td>
                  <td>{item.internalDiameter}</td>
                  <td>{item.priceKg}</td>
                  <td>{item.wheightMeter}</td>
                  <td>{item.priceMetro}</td>
                  <td>
                    <input
                      type="number"
                      name="tamañoDelCorte"
                      onChange={(e) => handleInputChange(e, index)}
                      value={item.tamañoDelCorte}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="precioDelCorte"
                      value={item.precioDelCorte}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="cantidadDeCortes"
                      value={item.cantidadDeCortes}
                      onChange={(e) => handleInputChange(e, index)}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="precioTotalSobreEsaMateriaPrima"
                      value={item.precioTotalSobreEsaMateriaPrima}
                      onChange={(e) => handleInputChange(e, index)}
                      readOnly
                      className="form-control"
                    />
                  </td>
                  <td>
                    <DeleteRaw deleteRawMaterialFromArray={deleteRawMaterialFromArray} index={index} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="mt-3">
        {buttonsState.buscar ? (
          <SearcherRMS buttonsState={buttonsState} addToRawMaterialsArray={addToRawMaterialsArray} />
        ) : buttonsState.crear ? (
          <CreateRawMaterial handleBtnState={handleBtnState} buttonsState={buttonsState} />
        ) : null}
        <div className="mt-3">
          {buttonsState.buscar || buttonsState.crear ? (
            <button className="btn btn-secondary me-2" onClick={() => handleBtnState('cerrar')}>
              Cerrar
            </button>
          ) : (
            <>
              <button className="btn btn-primary me-2" onClick={() => handleBtnState('buscar')}>
                Buscar
              </button>
              <button className="btn btn-success" onClick={() => handleBtnState('crear')}>
                Crear
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 
export default RawMaterialsSection;
