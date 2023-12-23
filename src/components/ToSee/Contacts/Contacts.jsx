import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts} from '../../../features/Promises/contact/contactSlice';
import Searcher from './Searcher/Searcher';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contacts } = useSelector((state) => state.contact);

  // Configuración de la paginación
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getContacts());
  }, []);

  // Lógica para calcular el índice inicial y final de la lista actual
  const indexOfLastContact = currentPage * itemsPerPage;
  const indexOfFirstContact = indexOfLastContact - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const onClick = (id) => {
    navigate(`/contactInd/${id}`);
  };

  return (
    <div className="container mt-5">
      <div>
        <Searcher />
      </div>
      <h1>Contactos</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Dirección</th>
            {/* Puedes agregar más encabezados según la necesidad */}
          </tr>
        </thead>
        <tbody>
          {currentContacts.map((contact) => (
            <tr onClick={() => onClick(contact._id)} key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.type}</td>
              <td>{contact.tlfn}</td>
              <td>{contact.address}</td>
              {/* Puedes agregar más celdas según la necesidad */}
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(contacts.length / itemsPerPage) }).map((_, index) => (
            <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <a className="page-link" onClick={() => paginate(index + 1)} href="#">
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Contacts;
