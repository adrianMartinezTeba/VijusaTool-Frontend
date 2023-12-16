import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOTF } from '../../../../../../features/Promises/operationToFollow/operationToFollowSlice.js';
import './SearcherOTF.scss';
import AddOnSearcherOTF from '../Buttons/AddOnSearcherOTF/AddOnSearcherOTF.jsx';

const SearcherOTF = ({ addToOTFArray }) => {
  const dispatch = useDispatch();
  const { operationsTF } = useSelector((state) => state.operationToFollow);

  useEffect(() => {
    dispatch(getOTF());
  }, []);

  useEffect(() => {
    // Lógica adicional cuando operationsTF cambia
    console.log(operationsTF);
  }, [operationsTF]);

  return (
    <>
      {operationsTF && operationsTF.length > 0 ? (
        <div className='table-responsive'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Nombre</th>
                <th scope='col'>Nº operación</th>
                <th scope='col'>Precio/hora</th>
                <th scope='col'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {operationsTF.map((operation) => (
                <tr key={operation._id}>
                  <td>{operation.name}</td>
                  <td>{operation.codeOperation}</td>
                  <td>{operation.priceHourEur}</td>
                  <td>
                   <AddOnSearcherOTF addToOTFArray={addToOTFArray} OTFData={operation}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay operaciones para mostrar</p>
      )}
    </>
  );
};

export default SearcherOTF;
