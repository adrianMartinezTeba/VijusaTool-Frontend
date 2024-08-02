import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRM, reset } from '../../../../../../features/Promises/rawMaterial/rawMaterialSlice';
import AddOnSearcherRMS from '../Buttons/AddOnSearcherRMS/AddOnSearcherRMS';

const SearcherRMS = ({ addToRawMaterialsArray }) => {
  const dispatch = useDispatch();
  const { rawMaterials } = useSelector((state) => state.rawMaterial);
  const [loading, setLoading] = useState(true);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const materialsPerPage = 5; // Número de materias primas por página

  useEffect(() => {
    dispatch(getRM())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(reset());
      console.log('Limpieza del estado de materias primas');
    };
  }, [dispatch]);

  // Comprobar que rawMaterials es un array
  const materialsArray = Array.isArray(rawMaterials) ? rawMaterials : [];

  // Calcular los índices de las materias primas a mostrar
  const indexOfLastMaterial = currentPage * materialsPerPage; // Índice del último elemento
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage; // Índice del primer elemento
  const currentMaterials = materialsArray.slice(indexOfFirstMaterial, indexOfLastMaterial); // Materias primas actuales

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(materialsArray.length / materialsPerPage);

  // Calcular los números de páginas a mostrar
  const pageNumbers = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='table-responsive'>
      {loading ? (
        <p>Cargando...</p> // Muestra un spinner de carga mientras se cargan las materias primas
      ) : (
        <>
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
              {currentMaterials && currentMaterials.length > 0 ? (
                currentMaterials.map((material) => (
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
        </>
      )}
    </div>
  );
};

export default SearcherRMS;
