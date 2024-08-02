import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct } from '../../../../features/Promises/product/productSlice';
import { getContacts } from '../../../../features/Promises/contact/contactSlice';
import { priceCut, priceOnThisRawMaterial } from '../../../../features/NoPromises/operationsRawMaterialSection/operations';
import { priceOnThisOTF } from '../../../../features/NoPromises/operationsCreateOTFSection/operation';
import { useParams } from 'react-router-dom';
const ProductEdit = ({ product, handleCancelEdit }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [editableProduct, setEditableProduct] = useState(product);
    const contacts = useSelector((state) => state.contact.contacts);
    const [btnStateContact, setBtnStateContact] = useState(false);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    useEffect(() => {
        setEditableProduct(product); // Actualiza el producto editable cuando el producto original cambia
    }, [product]);

    useEffect(() => {
        console.log('Editable Product Updated:', editableProduct); // Log del producto editable
    }, [editableProduct]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleRawMaterialChange = (e, rawMaterialId, field) => {
        const { value } = e.target;
        const numericValue = parseFloat(value);

        if (isNaN(numericValue) && value !== '') return; // Permite entradas vacías

        setEditableProduct((prevProduct) => {
            const updatedRawMaterials = prevProduct.rawMaterials.map((rawMaterial) => {
                if (rawMaterial._id === rawMaterialId) {
                    const updatedRawMaterial = {
                        ...rawMaterial,
                        [field]: numericValue,
                    };
                    const newPricePerCut = parseFloat(priceCut(updatedRawMaterial.tamañoDelCorte, updatedRawMaterial.rawMaterialId.priceMeter)).toFixed(3);
                    const newTotalPrice = parseFloat(priceOnThisRawMaterial(updatedRawMaterial.cantidadDeCortes, newPricePerCut)).toFixed(3);
                    return {
                        ...updatedRawMaterial,
                        precioDelCorte: newPricePerCut,
                        precioTotalSobreEsaMateriaPrima: newTotalPrice,
                    };
                }
                return rawMaterial;
            });
            return {
                ...prevProduct,
                rawMaterials: updatedRawMaterials,
            };
        });
    };

    const handleOperationChange = (e, operationId, field) => {
        const { value } = e.target;
        const numericValue = parseFloat(value);

        if (isNaN(numericValue) && value !== '') return; // Permite entradas vacías

        setEditableProduct((prevProduct) => {
            const updatedOperations = prevProduct.operationsToFollow.map((operation) => {
                if (operation._id === operationId) {
                    const updatedOperation = {
                        ...operation,
                        [field]: numericValue,
                    };

                    // Cálculo del nuevo precio de la operación
                    const priceHour = parseFloat(updatedOperation.operationId.priceHourEur);
                    const expectedTime = updatedOperation.expectedTime;

                    // Verifica que ambos valores sean válidos
                    if (!isNaN(priceHour) && !isNaN(expectedTime)) {
                        const newPrice = parseFloat(priceOnThisOTF(priceHour, expectedTime)).toFixed(3);
                        console.log(`Updated Operation ${operation._id}: New Price = ${newPrice}`); // Log del nuevo precio
                        return {
                            ...updatedOperation,
                            priceOperation: newPrice,
                        };
                    } else {
                        console.log(`Invalid values for priceHour or expectedTime for Operation ${operation._id}`);
                    }
                }
                return operation; // Retorna operación sin cambios
            });
            return {
                ...prevProduct,
                operationsToFollow: updatedOperations,
            };
        });
    };

    const calculateTotalPrice = () => {
        const rawMaterialTotal = editableProduct.rawMaterials.reduce((total, rawMaterial) => {
            return total + parseFloat(rawMaterial.precioTotalSobreEsaMateriaPrima || 0);
        }, 0);

        const operationTotal = editableProduct.operationsToFollow.reduce((total, operation) => {
            return total + parseFloat(operation.priceOperation || 0);
        }, 0);

        return (rawMaterialTotal + operationTotal).toFixed(3); // Retorna el precio total con 3 decimales
    };

    const handleUpdateProduct = () => {
        // Crea un nuevo objeto solo con los datos necesarios
        const productData = {
            number: editableProduct.number,
            modelName: editableProduct.modelName,
            contactId: editableProduct.contactId, // Solo el ID del contacto
            rawMaterials: editableProduct.rawMaterials.map(rawMaterial => ({
                rawMaterialId: rawMaterial.rawMaterialId,
                tamañoDelCorte: rawMaterial.tamañoDelCorte,
                precioDelCorte: rawMaterial.precioDelCorte,
                cantidadDeCortes: rawMaterial.cantidadDeCortes,
                precioTotalSobreEsaMateriaPrima: rawMaterial.precioTotalSobreEsaMateriaPrima,
            })),
            operationsToFollow: editableProduct.operationsToFollow.map(operation => ({
                operationId: operation.operationId,
                notes: operation.notes,
                expectedTime: operation.expectedTime,
                priceOperation: operation.priceOperation,
            })),
            totalPrice: calculateTotalPrice(), // Calcula el precio total actualizado
            notes: editableProduct.notes,
        };
        console.log(productData);
        // Despacha la acción de actualización
        dispatch(updateProduct({id,updProduct: productData}));
        handleCancelEdit(); // Regresar a la vista de detalles
    };
    
    return (
        <div>
            <h5>Editando Producto</h5>
            <div className="m-4 p-4 border border-dark">
                <label htmlFor="modelName">Nombre del modelo:</label>
                <input
                    type="text"
                    name="modelName"
                    value={editableProduct.modelName || ''} // Asegúrate de que nunca sea undefined
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Nombre del modelo"
                />
                <label htmlFor="notes">Notas:</label>
                <textarea
                    name="notes"
                    value={editableProduct.notes || ''} // Asegúrate de que nunca sea undefined
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Notas"
                />

                {/* Información de Contacto */}
                <h5>Información de Contacto</h5>
                <p>Contacto actual: {product.contactId.name}</p>
                {editableProduct.contactName && <p>Nuevo Contacto: {editableProduct.contactName}</p>}
                <button className="btn btn-secondary mb-2" onClick={() => setBtnStateContact(true)}>
                    Buscar contacto
                </button>
                {btnStateContact && (
                    <div>
                        <ul className="list-group">
                            {contacts.map(contact => (
                                <li key={contact._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{contact.name}</strong> - {contact.tlfn}
                                    </div>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => {
                                            setEditableProduct(prevProduct => ({
                                                ...prevProduct,
                                                contactId: contact._id,
                                                contactName: contact.name,
                                            }));
                                            setBtnStateContact(false);
                                        }}
                                    >
                                        Cambiar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Materias Primas */}
                {editableProduct.rawMaterials && (
                  <div className="m-4 p-4 border border-black">
                    <h5 className="card-header">Información de las materias primas:</h5>
                    <ul className="list-group list-group-flush">
                      {editableProduct.rawMaterials.map((rawMaterial) => (
                        <li className="list-group-item d-flex justify-content-center border m-3" key={rawMaterial._id}>
                          <div className="card m-4 p-4">
                            <p>Forma: {rawMaterial.rawMaterialId.shape}</p>
                            <p>Material: {rawMaterial.rawMaterialId.material}</p>
                            <p>Diámetro externo: {rawMaterial.rawMaterialId.externalDiameter}</p>
                            <p>Diámetro interno: {rawMaterial.rawMaterialId.internalDiameter}</p>
                            <label htmlFor={`tamañoDelCorte-${rawMaterial._id}`}>Tamaño del corte(mm):</label>
                            <input
                              type="number"
                              id={`tamañoDelCorte-${rawMaterial._id}`}
                              value={rawMaterial.tamañoDelCorte || ''} // Asegúrate de que nunca sea undefined
                              onChange={(e) => handleRawMaterialChange(e, rawMaterial._id, 'tamañoDelCorte')}
                              className="form-control mb-2"
                            />
                            <label htmlFor={`cantidadDeCortes-${rawMaterial._id}`}>Cantidad de cortes:</label>
                            <input
                              type="number"
                              id={`cantidadDeCortes-${rawMaterial._id}`}
                              value={rawMaterial.cantidadDeCortes || ''} // Asegúrate de que nunca sea undefined
                              onChange={(e) => handleRawMaterialChange(e, rawMaterial._id, 'cantidadDeCortes')}
                              className="form-control mb-2"
                            />
                          </div>
                          <div className="card m-4 p-4">
                            <p>Precio/kg (€): {rawMaterial.rawMaterialId.priceKg}</p>
                            <p>Precio/metro (€): {rawMaterial.rawMaterialId.priceMeter}</p>
                            <p>Peso/metro (g): {rawMaterial.rawMaterialId.wheightMeter}</p>
                            <p>Precio/corte (€): {rawMaterial.precioDelCorte}</p>
                            <p>Precio total (€): {rawMaterial.precioTotalSobreEsaMateriaPrima}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Operaciones a Seguir */}
                {editableProduct.operationsToFollow && (
                  <div className="m-4 p-4 border border-black">
                    <h5 className="card-header">Información de las Operaciones a Seguir:</h5>
                    <ul className="list-group list-group-flush">
                      {editableProduct.operationsToFollow.map((operation) => (
                        <li className="list-group-item d-flex justify-content-center border m-3" key={operation._id}>
                          <div className="card m-4 p-4">
                            <p>Nombre de la Operación: {operation.operationId.name}</p>
                            <p>Código de la Operación: {operation.operationId.codeOperation}</p>
                            <p>Precio por Hora (€): {operation.priceHourEur}</p>
                            <label htmlFor={`expectedTime-${operation._id}`}>Tiempo Esperado (segundos):</label>
                            <input
                              type="number"
                              id={`expectedTime-${operation._id}`}
                              value={operation.expectedTime || ''} // Asegúrate de que nunca sea undefined
                              onChange={(e) => handleOperationChange(e, operation._id, 'expectedTime')}
                              className="form-control mb-2"
                            />
                            <p>Precio de la Operación (€): {operation.priceOperation}</p>
                            <p>Notas: {operation.notes}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Precio Total */}
                <div className="text-center mt-4">
                    <h5>Precio Total (€): {calculateTotalPrice()}</h5>
                </div>

                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleUpdateProduct}>
                        Actualizar Producto
                    </button>
                    <button className="btn btn-secondary ml-2" onClick={handleCancelEdit}>
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductEdit;
