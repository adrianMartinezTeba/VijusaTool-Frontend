import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, reset } from '../../../../../../features/Promises/contact/contactSlice';

const SearcherCustomerSection = ({ handleAddCustToView }) => {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contact);
  
  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  useEffect(() => {
    dispatch(getContacts());

    // Limpiar el estado cuando el componente se desmonta
    return () => {
      dispatch(reset());
      console.log('Limpieza del estado de contactos');
    };
  }, [dispatch]);

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);

  // Calcular los índices de los contactos a mostrar
  const indexOfLastContact = currentPage * contactsPerPage; // Índice del último contacto
  const indexOfFirstContact = indexOfLastContact - contactsPerPage; // Índice del primer contacto
  const currentContacts = contacts ? contacts.slice(indexOfFirstContact, indexOfLastContact) : [];

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil((contacts && contacts.length) / contactsPerPage);

  // Calcular los números de páginas a mostrar
  const pageNumbers = [];
  const maxVisiblePages = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Dirección</th>
              <th scope="col">Tipo</th>
              <th scope="col">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <tr
                  onClick={() => handleAddCustToView(contact.name, contact._id)}
                  key={contact._id}
                  className="cursor-pointer"
                >
                  <td>{contact.name}</td>
                  <td>{contact.address ? contact.address : 'Sin dirección'}</td>
                  <td>{contact.type}</td>
                  <td>{contact.tlfn}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Cargando...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Controles de paginación */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
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
  );
};

export default SearcherCustomerSection;
