import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOTFById, updateOTF, deleteOTF, reset } from '../../../../features/Promises/operationToFollow/operationToFollowSlice';

const OperationInd = () => {
    const dispatch = useDispatch();
    const { operationToFollow, isSuccess, isError } = useSelector((state) => state.operationToFollow);
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [editedOperation, setEditedOperation] = useState({
        name: '',
        codeOperation: '',
        priceHourEur: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        codeOperation: '',
        priceHourEur: ''
    });

    useEffect(() => {
        dispatch(getOTFById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (operationToFollow) {
            setEditedOperation({
                name: operationToFollow.name || '',
                codeOperation: operationToFollow.codeOperation || '',
                priceHourEur: operationToFollow.priceHourEur || ''
            });
        }
    }, [operationToFollow]);

    const validateInputs = () => {
        const newErrors = {
            name: '',
            codeOperation: '',
            priceHourEur: ''
        };
        let isValid = true;

        if (!editedOperation.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
            isValid = false;
        }

        if (!/^\d+$/.test(editedOperation.codeOperation)) {
            newErrors.codeOperation = 'El código de la operación debe ser un número';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editedOperation.priceHourEur)) {
            newErrors.priceHourEur = 'El precio por hora debe ser un número (hasta dos decimales)';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedOperation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            dispatch(updateOTF({ id, updOTF: editedOperation }));
            setEditMode(false);
            dispatch(reset());
        }
    };

    const handleDelete = () => {
        dispatch(deleteOTF(id));
        navigate('/see/operations');
    };

    return (
        <div className="container mt-5 mb-5">
            {operationToFollow ? (
                <div className="container card p-4 border border-dark">
                    <div className="card-body border border-dark-subtle p-0">
                        <h1 className="card-header">{operationToFollow.name}</h1>
                        {editMode ? (
                            <form onSubmit={handleEditSubmit} autoComplete='false' className="m-3">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedOperation.name}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Código de la operación</label>
                                    <input
                                        type="text"
                                        name="codeOperation"
                                        value={editedOperation.codeOperation}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.codeOperation && <small className="text-danger">{errors.codeOperation}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Precio por hora (€/hora)</label>
                                    <input
                                        type="text"
                                        name="priceHourEur"
                                        value={editedOperation.priceHourEur}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.priceHourEur && <small className="text-danger">{errors.priceHourEur}</small>}
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Guardar</button>
                                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => setEditMode(false)}>Cancelar</button>
                            </form>
                        ) : (
                            <>
                                <p className="lead m-3">Código de la operación: {operationToFollow.codeOperation}</p>
                                <p className="lead m-3">Precio por hora(€): {operationToFollow.priceHourEur}</p>
                                <button className="btn btn-primary m-3" onClick={() => setEditMode(true)}>Editar</button>
                                <button className="btn btn-danger m-3" onClick={handleDelete}>Eliminar</button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default OperationInd;
