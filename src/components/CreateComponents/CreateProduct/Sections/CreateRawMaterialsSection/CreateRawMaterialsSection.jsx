import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './CreateRawMaterialsSection.scss';
import CreateRawMaterial from '../../../CreateRawMaterial/CreateRawMaterial.jsx';
import SearcherRMS from './Searcher/SearcherRMS.jsx';
import { priceOnThisRawMaterial, priceCut } from '../../../../../features/NoPromises/operationsRawMaterialSection/operations.js';

const CreateRawMaterialsSection = () => {
  const dispatch = useDispatch();
  const [buttonsState, setButtonsState] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });

  const [rawMaterialsArrayToView, setRawMaterialsArrayToView] = useState([]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Crear una copia del array para no mutar el estado directamente
    const updatedArray = [...rawMaterialsArrayToView];

    if (name === 'tamañoDelCorte') {
      updatedArray[index].tamañoDelCorte = value;
      updatedArray[index].precioDelCorte = priceCut(updatedArray[index].tamañoDelCorte, updatedArray[index].priceMetro);
    } else if (name === 'cantidadDeCortes') {
      updatedArray[index].cantidadDeCortes = value;
      updatedArray[index].precioTotalSobreEsaMateriaPrima = priceOnThisRawMaterial(updatedArray[index].cantidadDeCortes, updatedArray[index].precioDelCorte);
    } else {
      // Si no es 'precioDelCorte' ni 'cantidadDeCortes', simplemente actualizar el valor
      updatedArray[index][name] = value;
    }

    // Actualizar el estado con la nueva copia del array
    setRawMaterialsArrayToView(updatedArray);
  };

  const handleBtnState = (action) => {
    setButtonsState({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };

  const addToArray = (newDataToView, newDataToSend) => {
    setRawMaterialsArrayToView([...rawMaterialsArrayToView, { ...newDataToView, precioDelCorte: '', cantidadDeCortes: '', precioTotalSobreEsaMateriaPrima: '', tamañoDelCorte: '' }]);
    // También actualiza el array de datos a enviar si es necesario
  };

  useEffect(() => {
    console.log(rawMaterialsArrayToView);
  }, [rawMaterialsArrayToView]);

  return (
    <div>
      <h3>Materias primas:</h3>
      {rawMaterialsArrayToView && rawMaterialsArrayToView.length > 0 ? (
        <div className='rmArray-container'>
          {rawMaterialsArrayToView.map((item, index) => (
            <form key={index} className='rmArray'>
              <div>
                <strong>Tipo</strong> {item.typeMat.TypeMat}
              </div>
              <div>
                <strong>Nombre</strong> {item.material.name}
              </div>
              <div>
                <strong>Diámetro Externo</strong> {item.externalDiameter}
              </div>
              <div>
                <strong>Diámetro Interno</strong> {item.internalDiameter}
              </div>
              <div>
                <strong>Precio por Kg</strong> {item.priceKg}
              </div>
              <div>
                <strong>Peso por Metro(g)</strong> {item.wheightMeter}
              </div>
              <div>
                <strong>Precio por Metro</strong> {item.priceMetro}
              </div>
              <div>
                <strong>Tamaño del corte(mm)</strong>{' '}
                <input
                  type="number"
                  name='tamañoDelCorte'
                  onChange={(e) => handleInputChange(e, index)}
                  value={item.tamañoDelCorte}
                />
              </div>
              <div>
                <strong>Precio por corte</strong>{' '}
                <input
                  type="number"
                  name='precioDelCorte'
                  value={item.precioDelCorte}
                  onChange={(e) => handleInputChange(e, index)}
                  readOnly
                />
              </div>
              <div>
                <strong>Cantidad de cortes</strong>{' '}
                <input
                  type="number"
                  name='cantidadDeCortes'
                  value={item.cantidadDeCortes}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div>
                <strong>Precio sobre esta materia</strong>{' '}
                <input
                  type="number"
                  name='precioTotalSobreEsaMateriaPrima'
                  value={item.precioTotalSobreEsaMateriaPrima}
                  onChange={(e) => handleInputChange(e, index)}
                  readOnly
                />
              </div>
              {/* Agrega otros campos de entrada según sea necesario */}
            </form>
          ))}
        </div>
      ) : null}
      <div>
        {buttonsState.buscar ? (
          <div>
            <SearcherRMS addToArray={addToArray} buttonsState={buttonsState} />
          </div>
        ) : buttonsState.crear ? (
          <div>
            <CreateRawMaterial handleBtnState={handleBtnState} buttonsState={buttonsState} />
          </div>
        ) : null}
        {buttonsState.buscar ? (
          <button onClick={() => handleBtnState('cerrar')}>
            Cerrar
          </button>
        ) : buttonsState.crear ? (
          <button onClick={() => handleBtnState('cerrar')}>
            Cerrar
          </button>
        ) : (
          <div>
            <button onClick={() => handleBtnState('buscar')}>Buscar</button>
            <button onClick={() => handleBtnState('crear')}>
              Crear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRawMaterialsSection;
