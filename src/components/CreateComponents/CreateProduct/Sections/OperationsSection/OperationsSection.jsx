import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateOperationToFollow from '../../../CreateOperationToFollow/CreateOperationToFollow.jsx';
import SearcherOTF from './SearcherOTF/SearcherOTF';
import { priceOnThisOTF } from '../../../../../features/NoPromises/operationsCreateOTFSection/operation.js';
import { addToCreateProductState } from '../../../../../features/Promises/product/productSlice.js';
import DeleteOTF from './Buttons/DeleteOTF/DeleteOTF.jsx';

const OperationsSection = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.product);
  const [buttonsState, setButtonsState] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });
  const [OTFArray, setOTFArray] = useState([]);

  const handleBtnState = (action) => {
    setButtonsState({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };

  const addToOTFArray = (newData) => {
    setOTFArray([...OTFArray, { ...newData, operationId: newData._id, notes: '', expectedTime: '', priceOperation: '' }]);
  };

  const deleteOTFFromArray = (data) => {
    const newArray = [...OTFArray];
    newArray.splice(data, 1);
    setOTFArray(newArray);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newArray = [...OTFArray];
    if (name === 'expectedTime') {
      newArray[index] = {
        ...newArray[index],
        expectedTime: value,
        priceOperation: priceOnThisOTF(newArray[index].priceHourEur, value),
      };
    }
    setOTFArray(newArray);
    dispatch(addToCreateProductState({ functionName: 'addOperation', data: newArray }));
  };

  useEffect(() => {
    if (isSuccess) {
      setOTFArray([]);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(OTFArray);
  }, [OTFArray]);

  return (
    <div className="container mt-4">
      <h3 className="mt-4">Operaciones a seguir</h3>
      {OTFArray && OTFArray.length > 0 ? (
        <div>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Nº operación</th>
                  <th scope="col">Precio/Hora</th>
                  <th scope="col">Tiempo esperado(mins)</th>
                  <th scope="col">Precio sobre esta operación</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {OTFArray.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.codeOperation}</td>
                    <td>{item.priceHourEur}</td>
                    <td>
                      <input type="Number" name="expectedTime" value={item.expectedTime} onChange={(e) => handleInputChange(e, index)} className="form-control" />
                    </td>
                    <td>
                      <input type="Number" name="priceOperation" value={item.priceOperation} onChange={(e) => handleInputChange(e, index)} className="form-control" readOnly />
                    </td>
                    <td>
                      <DeleteOTF deleteOTFFromArray={deleteOTFFromArray} index={index} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      <div className="mt-3">
        {buttonsState.buscar ? (
          <SearcherOTF addToOTFArray={addToOTFArray} buttonsState={buttonsState} />
        ) : buttonsState.crear ? (
          <CreateOperationToFollow handleBtnState={handleBtnState} buttonsState={buttonsState} />
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

export default OperationsSection;
