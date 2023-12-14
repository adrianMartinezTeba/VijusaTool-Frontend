import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, reset } from '../../../../../../features/Promises/contact/contactSlice';

const SearcherCustomerSection = ({handleAddCustToView}) => {
    const dispatch = useDispatch();
    const { contacts } = useSelector((state) => state.contact);

    useEffect(() => {
        dispatch(getContacts());

        // Limpiar el estado cuando el componente se desmonta
        return () => {
            dispatch(reset());
            console.log('Limpieza del estado de contactos');
        };
    }, []);

    useEffect(() => {
        console.log(contacts);
    }, [contacts]);

    return (
        <div className='table-responsive'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='col'>Dirección</th>
                        <th scope='col'>Tipo</th>
                        <th scope='col'>Teléfono</th>
                        <th scope='col'>Notas</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts ? (
                        contacts.map((contact) => (
                            <tr onClick={() => handleAddCustToView(contact.name, contact._id)}  key={contact._id}>
                                <td>{contact.name}</td>
                                <td>{contact.address}</td>
                                <td>{contact.type}</td>
                                <td>{contact.tlfn}</td>
                                <td>{contact.notes && contact.notes.join(', ')}</td>
                                <td>{/* Agrega las acciones necesarias aquí */}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='6'>Cargando...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SearcherCustomerSection;
