import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateOperationToFollow from '../../../CreateOperationToFollow/CreateOperationToFollow.jsx';
import SearcherOTF from './SearcherOTF/SearcherOTF';
import { priceOnThisOTF } from '../../../../../features/NoPromises/operationsCreateOTFSection/operation.js';
// import {addToProduct} from '../../../../../features/Promises/product/productSlice.js'
const CreateOperationsSection = () => {
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.product);

  const [buttonsState, setButtonsState] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });
  const [OTFView, setOTFView] = useState([]);
  const [OTFSend, setOTFSend] = useState([]);

  const handleBtnState = (action) => {
    setButtonsState({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedArray = {
      toView: [...OTFView],
      toSend: [...OTFSend],
    };
if (name === 'expectedTime') {
  updatedArray.toView[index].expectedTime = value;
  updatedArray.toView[index].priceOperation = priceOnThisOTF(updatedArray.toView[index].priceHourEur,value);
  updatedArray.toSend[index].expectedTime = value;
  updatedArray.toSend[index].priceOperation = priceOnThisOTF(updatedArray.toView[index].priceHourEur,value);
}
    setOTFView(updatedArray.toView);
    setOTFSend(updatedArray.toSend);
    console.log(OTFSend);
  };

  const addToArray = (newData) => {
    setOTFView([...OTFView, { ...newData, notes: '', expectedTime: '', priceOperation:'' }]);
    setOTFSend([...OTFSend, { operationId: newData._id, notes: '', expectedTime: '', priceOperation:'' }]);
  };
  const handleDelete = (index) => {
    setOTFView((prevToView) => {
      const updatedToView = [...prevToView];
      updatedToView.splice(index, 1);
      return updatedToView;
    });

    setOTFSend((prevToSend) => {
      const updatedToSend = [...prevToSend];
      updatedToSend.splice(index, 1);
      return updatedToSend;
    });
  };
  useEffect(() => {
  }, [OTFView]);

  // useEffect(() => {
  //   dispatch(addToProduct(OTFSend));
  //   console.log(OTFSend);
  // }, [OTFSend]);
  useEffect(() => {
    console.log(productData);
  }, [productData]);
  return (
    <div className="container mt-4">
      <h3 className='mt-4'>Operaciones a seguir</h3>
      {OTFView && OTFView.length > 0 ? (
        <div>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>Nombre</th>
                  <th scope='col'>Nº operación</th>
                  <th scope='col'>Notas</th>
                  <th scope='col'>Precio/Hora</th>
                  <th scope='col'>Tiempo esperado(mins)</th>
                  <th scope='col'>Precio sobre esta operación</th>
                  <th scope='col'/>
                </tr>
              </thead>
              <tbody>
                {OTFView.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.codeOperation}</td>
                    <td>
                      <input type='text' name='notes' value={item.notes} onChange={(e) => handleInputChange(e, index)} className='form-control' />
                    </td>
                    <td>{item.priceHourEur}</td>
                    <td>
                      <input type="Number" name='expectedTime' value={item.expectedTime} onChange={(e) => handleInputChange(e, index)} className='form-control' />
                    </td>
                    <td>
                      <input type="Number" name='priceOperation' value={item.priceOperation} onChange={(e) => handleInputChange(e, index)} className='form-control' readOnly/>
                    </td>
                    <td>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
      <div className='mt-3'>
        {buttonsState.buscar ? (
          <SearcherOTF addToArray={addToArray}  buttonsState={buttonsState} />
        ) : buttonsState.crear ? (
          <CreateOperationToFollow handleBtnState={handleBtnState} buttonsState={buttonsState} />
        ) : null}
        <div className='mt-3'>
          {buttonsState.buscar || buttonsState.crear ? (
            <button className='btn btn-secondary me-2' onClick={() => handleBtnState('cerrar')}>
              Cerrar
            </button>
          ) : (
            <>
              <button className='btn btn-primary me-2' onClick={() => handleBtnState('buscar')}>
                Buscar
              </button>
              <button className='btn btn-success' onClick={() => handleBtnState('crear')}>
                Crear
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOperationsSection;
