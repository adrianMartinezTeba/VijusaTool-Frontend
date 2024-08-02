import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getContactById, updateContact, deleteContact, reset } from '../../../../features/Promises/contact/contactSlice';

const ContactInd = () => {
    const dispatch = useDispatch();
    const { contact, isSuccess, isError } = useSelector((state) => state.contact);
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [editedContact, setEditedContact] = useState({
        name: '',
        tlfn: '',
        address: '',
        productsIds: []
    });
    const [errors, setErrors] = useState({
        name: '',
        tlfn: '',
        address: ''
    });

    useEffect(() => {
        dispatch(getContactById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (contact) {
            console.log('Contact fetched:', contact);
            setEditedContact({
                name: contact.name || '',
                tlfn: contact.tlfn || '',
                address: contact.address || '',
                productsIds: contact.productsIds || []
            });
        }
    }, [contact]);

    const validateInputs = () => {
        const newErrors = {
            name: '',
            tlfn: '',
            address: ''
        };
        let isValid = true;

        // Validar el nombre
        if (!editedContact.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
            isValid = false;
        }

        // Validar el teléfono (solo números)
        if (!/^\d+$/.test(editedContact.tlfn)) {
            newErrors.tlfn = 'Solo se aceptan números';
            isValid = false;
        }

        // Validar la dirección (opcional)
        if (editedContact.address.trim() && editedContact.address.length < 5) {
            newErrors.address = 'La dirección debe tener al menos 5 caracteres';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedContact((prev) => ({
            ...prev,
            [name]: value,
        }));
        console.log('Edited contact state:', editedContact);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            console.log('Submitting edited contact:', editedContact);
            dispatch(updateContact({ id, updContact: editedContact }));
            setEditMode(false); // Desactivar modo de edición después de enviar
            dispatch(reset()); // Reiniciar el estado del contacto
        }
    };

    const handleDelete = () => {
        dispatch(deleteContact(id));
        navigate('/see/contacts'); // Redirigir después de eliminar
    };

    return (
        <div className="container mt-5 mb-5">
            {contact ? (
                <div className="container card p-4 border border-dark">
                    <div className="card-body border border-dark-subtle p-0">
                        <h1 className="card-header">{contact.name}</h1>
                        {editMode ? (
                            <form onSubmit={handleEditSubmit} autoComplete='off' className="m-3">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editedContact.name} 
                                        onChange={handleEditChange} 
                                        className="form-control" 
                                        required 
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input 
                                        type="text" 
                                        name="tlfn" 
                                        value={editedContact.tlfn} 
                                        onChange={handleEditChange} 
                                        className="form-control" 
                                        required 
                                    />
                                    {errors.tlfn && <small className="text-danger">{errors.tlfn}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input 
                                        type="text" 
                                        name="address" 
                                        value={editedContact.address} 
                                        onChange={handleEditChange} 
                                        className="form-control" 
                                    />
                                    {errors.address && <small className="text-danger">{errors.address}</small>}
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Guardar</button>
                                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => {
                                    setEditMode(false);
                                    console.log('Edit cancelled, going back to view mode.');
                                }}>Cancelar</button>
                            </form>
                        ) : (
                            <>
                                <p className="lead m-3">Teléfono: {contact.tlfn}</p>
                                <p className="lead m-3">Dirección: {contact.address ? contact.address : 'No disponible'}</p>
                                <button className="btn btn-primary m-3" onClick={() => setEditMode(true)}>Editar</button>
                                <button className="btn btn-danger m-3" onClick={handleDelete}>Eliminar</button>
                            </>
                        )}
                        <h2 className="m-3">Productos:</h2>
                        {contact.productsIds && contact.productsIds.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {contact.productsIds.map((product) => (
                                    <li onClick={() => navigate(`/productInd/${product._id}`)} key={product._id} className="list-group-item border border-dark-subtle m-2 card">
                                        <p>Nombre del modelo: {product.modelName}</p>
                                        <p>Precio total: {product.totalPrice}</p>
                                        <p>Número del producto: {product.number}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="lead m-3">No hay productos</p>
                        )}
                        {contact.productsProvided && (
                            <p className="lead m-3">Productos proporcionados: {contact.productsProvided}</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default ContactInd;
