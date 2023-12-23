import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContactByName,reset} from '../../../../features/Promises/contact/contactSlice';
import { useNavigate } from 'react-router-dom';
const Searcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactByName } = useSelector((state) => state.contact);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Ejecutar la acción de Redux para buscar contactos por nombre
      dispatch(getContactByName(searchTerm));
    }else{
      dispatch(reset());
    }
  }, [searchTerm])
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const onClick = (id) => {
    navigate(`/contactInd/${id}`);
  };
  return (
    <div className="container mt-3">
      <h2 className="mb-3">Buscar Contacto</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Nombre del contacto"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="list-group">
        {contactByName.map((contact) => (
          <li
            key={contact._id}
            className="list-group-item cursor-pointer"
            onClick={() => onClick(contact._id)}
          >
            {contact.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Searcher;