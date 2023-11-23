import React, { useState, useEffect } from 'react';
import './CreateRawMaterialsSection.scss';
import CreateRawMaterial from '../../../CreateRawMaterial/CreateRawMaterial.jsx';
import SearcherRMS from './SearcherRMS/SearcherRMS.jsx';
import { priceOnThisRawMaterial, priceCut } from '../../../../../features/NoPromises/operationsRawMaterialSection/operations.js';
import { useDispatch, useSelector } from 'react-redux';
import { addToCreateProductRMObj } from '../../../../../features/Promises/product/productSlice.js';

const CreateRawMaterialsSection = () => {
  const dispatch = useDispatch();
  const { createProductState } = useSelector((state) => state.product);
  const [buttonsState, setButtonsState] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });

  const [rawMaterialsArrayToView, setRawMaterialsArrayToView] = useState([]);
  const [rawMaterialsArrayToSend, setRawMaterialsArrayToSend] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedArrayToView = [...rawMaterialsArrayToView];
    const updatedArrayToSend = [...rawMaterialsArrayToSend];

    if (name === 'tamañoDelCorte') {
      updatedArrayToView[index] = {
        ...updatedArrayToView[index],
        tamañoDelCorte: value,
        precioDelCorte: priceCut(value, updatedArrayToView[index].priceMetro),
        precioTotalSobreEsaMateriaPrima: priceOnThisRawMaterial(
          updatedArrayToView[index].cantidadDeCortes,
          priceCut(value, updatedArrayToView[index].priceMetro)
        ),
      };

      updatedArrayToSend[index] = {
        ...updatedArrayToSend[index],
        tamañoDelCorte: value,
        precioDelCorte: priceCut(value, updatedArrayToView[index].priceMetro),
        precioTotalSobreEsaMateriaPrima: priceOnThisRawMaterial(
          updatedArrayToSend[index].cantidadDeCortes,
          priceCut(value, updatedArrayToSend[index].priceMetro)
        ),
      };
    } else if (name === 'cantidadDeCortes') {
      updatedArrayToView[index] = {
        ...updatedArrayToView[index],
        cantidadDeCortes: value,
        precioTotalSobreEsaMateriaPrima: priceOnThisRawMaterial(
          value,
          updatedArrayToView[index].precioDelCorte
        ),
      };

      updatedArrayToSend[index] = {
        ...updatedArrayToSend[index],
        cantidadDeCortes: value,
        precioTotalSobreEsaMateriaPrima: priceOnThisRawMaterial(
          value,
          updatedArrayToSend[index].precioDelCorte
        ),
      };
    } else {
      updatedArrayToView[index] = {
        ...updatedArrayToView[index],
        [name]: value,
      };

      updatedArrayToSend[index] = {
        ...updatedArrayToSend[index],
        [name]: value,
      };
    }

    setRawMaterialsArrayToView(updatedArrayToView);
    setRawMaterialsArrayToSend(updatedArrayToSend);
  };

  const handleBtnState = (action) => {
    setButtonsState({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };

  const addToArray = (newData) => {
    setRawMaterialsArrayToView([
      ...rawMaterialsArrayToView,
      { ...newData, precioDelCorte: '', cantidadDeCortes: '', precioTotalSobreEsaMateriaPrima: '', tamañoDelCorte: '' },
    ]);
    setRawMaterialsArrayToSend([
      ...rawMaterialsArrayToSend,
      { rawMaterialId: newData._id, precioDelCorte: '', cantidadDeCortes: '', precioTotalSobreEsaMateriaPrima: '', tamañoDelCorte: '' },
    ]);
  };

  const handleDelete = (index) => {
    setRawMaterialsArrayToView((prevToView) => {
      const updatedToView = [...prevToView];
      updatedToView.splice(index, 1);
      return updatedToView;
    });

    setRawMaterialsArrayToSend((prevToSend) => {
      const updatedToSend = [...prevToSend];
      updatedToSend.splice(index, 1);
      return updatedToSend;
    });
  };

  useEffect(() => {
    console.log(rawMaterialsArrayToView);
  }, [rawMaterialsArrayToView]);

  useEffect(() => {
    console.log(rawMaterialsArrayToSend);
    dispatch(addToCreateProductRMObj(rawMaterialsArrayToSend));
   
  }, [rawMaterialsArrayToSend]);
  useEffect(() => {
    console.log(createProductState);
  }, [createProductState]);

  return (
    <div className="container mt-4">
      <h3>Materias primas</h3>
      {rawMaterialsArrayToView && rawMaterialsArrayToView.length > 0 ? (
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
              {rawMaterialsArrayToView.map((item, index) => (
                <tr key={index}>
                  <td>{item.typeMat.TypeMat}</td>
                  <td>{item.material.name}</td>
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
                    <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <div className="mt-3">
        {buttonsState.buscar ? (
          <SearcherRMS addToArray={addToArray} buttonsState={buttonsState} />
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

export default CreateRawMaterialsSection;
