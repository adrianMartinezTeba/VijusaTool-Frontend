import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOTF } from '../../../../../../features/Promises/operationToFollow/operationToFollowSlice.js';
import './SearcherOTF.scss';
import AddOnSearcherOTF from '../Buttons/AddOnSearcherOTF/AddOnSearcherOTF.jsx';

const SearcherOTF = ({ addToOTFArray }) => {
  const dispatch = useDispatch();
  const { operationsTF } = useSelector((state) => state.operationToFollow);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const operationsPerPage = 5; // Número de operaciones por página

  useEffect(() => {
    dispatch(getOTF());
  }, [dispatch]);

  // Calcular los índices de las operaciones a mostrar
  const indexOfLastOperation = currentPage * operationsPerPage; // Índice del último elemento
  const indexOfFirstOperation = indexOfLastOperation - operationsPerPage; // Índice del primer elemento
  const currentOperations = operationsTF.slice(indexOfFirstOperation, indexOfLastOperation); // Operaciones actuales

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(operationsTF.length / operationsPerPage);

  // Calcular los números de páginas a mostrar
  const pageNumbers = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {operationsTF && operationsTF.length > 0 ? (
        <div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Nº operación</th>
                  <th scope="col">Precio/hora</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentOperations.map((operation) => (
                  <tr key={operation._id}>
                    <td>{operation.name}</td>
                    <td>{operation.codeOperation}</td>
                    <td>{operation.priceHourEur}</td>
                    <td>
                      <AddOnSearcherOTF addToOTFArray={addToOTFArray} OTFData={operation} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de paginación */}
          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center mt-3">
                {/* Flecha izquierda */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                  >
                    &laquo; Anterior
                  </button>
                </li>

                {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <button onClick={() => paginate(number)} className="page-link">
                      {number}
                    </button>
                  </li>
                ))}

                {/* Flecha derecha */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                  >
                    Siguiente &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      ) : (
        <p>No hay operaciones para mostrar</p>
      )}
    </>
  );
};

export default SearcherOTF;
