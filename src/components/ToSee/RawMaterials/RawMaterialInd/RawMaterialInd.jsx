import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getRMById, updateRM, deleteRM, reset } from '../../../../features/Promises/rawMaterial/rawMaterialSlice';
import { calculatePriceMetro } from '../../../../features/NoPromises/operationsCreateRawMaterial/operations';

const RawMaterialInd = () => {
    const dispatch = useDispatch();
    const { rawMaterial, isSuccess, isError } = useSelector((state) => state.rawMaterial);
    const { id } = useParams();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [editedRawMaterial, setEditedRawMaterial] = useState({
        material: '',
        shape: '',
        priceKg: '',
        priceMeter: '',
        wheightMeter: '', // Asegúrate de que esta propiedad sea "weightMeter" en lugar de "wheightMeter"
        externalDiameter: '',
        internalDiameter: ''
    });
    const [errors, setErrors] = useState({
        material: '',
        shape: '',
        priceKg: '',
        wheightMeter: '' // Cambié a "weightMeter"
    });

    useEffect(() => {
        dispatch(getRMById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (rawMaterial) {
            setEditedRawMaterial({
                material: rawMaterial.material || '',
                shape: rawMaterial.shape || '',
                priceKg: rawMaterial.priceKg || '',
                priceMeter: rawMaterial.priceMeter || '',
                wheightMeter: rawMaterial.wheightMeter || '', // Cambié aquí también
                externalDiameter: rawMaterial.externalDiameter || '',
                internalDiameter: rawMaterial.internalDiameter || ''
            });
        }
    }, [rawMaterial]);

    const validateInputs = () => {
        const newErrors = {
            material: '',
            shape: '',
            priceKg: '',
            wheightMeter: '' // Cambié a "weightMeter"
        };
        let isValid = true;

        if (!editedRawMaterial.material.trim()) {
            newErrors.material = 'El material es obligatorio';
            isValid = false;
        }

        if (!editedRawMaterial.shape.trim()) {
            newErrors.shape = 'La forma es obligatoria';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editedRawMaterial.priceKg)) {
            newErrors.priceKg = 'El precio por Kg debe ser un número (hasta dos decimales)';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editedRawMaterial.wheightMeter)) {
            newErrors.wheightMeter = 'El peso por metro debe ser un número (hasta dos decimales)';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedRawMaterial((prev) => {
            const updatedValues = { ...prev, [name]: value };
            if (name === 'priceKg' || name === 'weightMeter') {
                updatedValues.priceMeter = calculatePriceMetro(
                    updatedValues.priceKg,
                    updatedValues.wheightMeter
                );
            }
            return updatedValues;
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            dispatch(updateRM({ id, updRM: editedRawMaterial })); // Asegúrate de que "updRM" esté correctamente escrito
            setEditMode(false);
            dispatch(reset());
        }
    };

    const handleDelete = () => {
        dispatch(deleteRM(id));
        navigate('/see/rawMaterials');
    };

    return (
        <div className="container mt-5 mb-5">
            {rawMaterial ? (
                <div className="container card p-4 border border-dark">
                    <div className="card-body border border-dark-subtle p-0">
                        <h1 className="card-header">{`${rawMaterial.shape} de ${rawMaterial.material}, Diámetro externo: ${rawMaterial.externalDiameter}, Diámetro interno: ${rawMaterial.internalDiameter}`}</h1>
                        {editMode ? (
                            <form onSubmit={handleEditSubmit} autoComplete='off' className="m-3">
                                <div className="form-group">
                                    <label>Material</label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={editedRawMaterial.material}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.material && <small className="text-danger">{errors.material}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Forma</label>
                                    <input
                                        type="text"
                                        name="shape"
                                        value={editedRawMaterial.shape}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.shape && <small className="text-danger">{errors.shape}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Precio por Kg</label>
                                    <input
                                        type="text"
                                        name="priceKg"
                                        value={editedRawMaterial.priceKg}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.priceKg && <small className="text-danger">{errors.priceKg}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Peso por metro</label>
                                    <input
                                        type="text"
                                        name="wheightMeter" // Cambié a "weightMeter"
                                        value={editedRawMaterial.wheightMeter}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        required
                                    />
                                    {errors.wheightMeter && <small className="text-danger">{errors.wheightMeter}</small>}
                                </div>
                                <div className="form-group">
                                    <label>Diámetro Externo</label>
                                    <input
                                        type="text"
                                        name="externalDiameter"
                                        value={editedRawMaterial.externalDiameter}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Diámetro Interno</label>
                                    <input
                                        type="text"
                                        name="internalDiameter"
                                        value={editedRawMaterial.internalDiameter}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio por metro</label>
                                    <input
                                        type="text"
                                        name="priceMeter"
                                        value={editedRawMaterial.priceMeter}
                                        readOnly
                                        className="form-control"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Guardar</button>
                                <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={() => setEditMode(false)}>Cancelar</button>
                            </form>
                        ) : (
                            <>
                                <p className="lead m-3">Forma: {rawMaterial.shape}</p>
                                <p className="lead m-3">Material: {rawMaterial.material}</p>
                                <p className="lead m-3">Diámetro Externo: {rawMaterial.externalDiameter}</p>
                                <p className="lead m-3">Diámetro Interno: {rawMaterial.internalDiameter}</p>
                                <p className="lead m-3">Precio por Kg: {rawMaterial.priceKg}</p>
                                <p className="lead m-3">Peso por metro: {rawMaterial.wheightMeter}</p>
                                <p className="lead m-3">Precio por metro: {rawMaterial.priceMeter}</p>
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

export default RawMaterialInd;
