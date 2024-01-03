import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getContactById } from '../../../../features/Promises/contact/contactSlice';
const ContactInd = () => {
  const dispatch = useDispatch();
  const { contact } = useSelector((state) => state.contact);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getContactById(id));
  }, [id]);
  useEffect(() => {
    console.log(contact);
  }, [contact]);
  return (
    <div className="container mt-5">
      {contact ? (
        <div>
          <h1>{contact.name}</h1>
          <p className="lead">Teléfono: {contact.tlfn}</p>
          <p className="lead">Dirección: {contact.address ? contact.address : 'No disponible'}</p>
          <p className="lead">Tipo: {contact.type}</p>
          <p className="lead">
            Notas: {contact.notes.length > 0 ? contact.notes.join(', ') : 'Sin notas'}
          </p>
          {/* Si deseas mostrar información adicional, puedes agregar más elementos aquí */}
          {contact.ordersIds.length > 0 && (
            <div>
              <h2>Órdenes:</h2>
              <ul className="list-group">
                {contact.ordersIds.map((orderId) => (
                  <li key={orderId} className="list-group-item">
                    Orden ID: {orderId}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {contact.productsIds.length > 0 && (
            <div>
              <h2>Productos:</h2>
              <ul className="list-group">
                {contact.productsIds.map((productId) => (
                  <li key={productId} className="list-group-item">
                    Producto ID: {productId}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {contact.productsProvided && (
            <p className="lead">Productos proporcionados: {contact.productsProvided}</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ContactInd;
