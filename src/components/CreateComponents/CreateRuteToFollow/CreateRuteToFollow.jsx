import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset, getProductsWithOutRTF,getProducts } from '../../../features/Promises/product/productSlice';
import { createRTF } from '../../../features/Promises/ruteToFollow/ruteToFollowSlice';
const CreateRuteToFollow = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess, products } = useSelector((state) => state.product);
    const [RTFToDo, setRTFToDo] = useState({
        rawMaterials: [],
        operationsToFollow: [],
        state: [{ toDo: true, doing: false, done: false }],
    });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedRawMaterialIndex, setSelectedRawMaterialIndex] = useState(null);
    useEffect(() => {
        dispatch(getProductsWithOutRTF());
    }, []);
    useEffect(() => {
        console.log(products);
        
    },[products])
    useEffect(() => {
        console.log(selectedProduct);
    }, [selectedProduct]);
    useEffect(() => {
        console.log(RTFToDo);
    }, [RTFToDo])
    const onClickAddToSelectedProduct = (product) => {
        setSelectedProduct(product);
    }
    useEffect(() => {
        if (selectedProduct) {
            const productId = selectedProduct._id;
            const updatedRawMaterials = selectedProduct.rawMaterials.map((rawMaterial) => ({
                modelName: selectedProduct.modelName,
                contactId: selectedProduct.contactId._id,
                contactName: selectedProduct.contactId.name,
                rawMaterialId: rawMaterial.rawMaterialId._id,
                cantidadDeCortes: rawMaterial.cantidadDeCortes,
                rawMaterialMaterial: rawMaterial.rawMaterialId.material,
                rawMaterialShape: rawMaterial.rawMaterialId.shape,
                rawMaterialExtDiameter: rawMaterial.rawMaterialId.externalDiameter,
                rawMaterialIntDiameter: rawMaterial.rawMaterialId.internalDiameter,
                operationsToFollow: [],
            }));

            const updatedOperationsToFollow = selectedProduct.operationsToFollow.map((operation) => ({
                operationId: operation.operationId._id,
                codeOperation: operation.operationId.codeOperation,
                operationName: operation.operationId.name,
            }));

            setRTFToDo({
                productId: productId,
                rawMaterials: updatedRawMaterials,
                operationsToFollow: updatedOperationsToFollow,
                state: [
                    {
                        toDo: true,
                        doing: false,
                        done: false,
                    },
                ],
            });
        }
    }, [selectedProduct]);
    const onClickAddRmOTF = (indexRM, operation) => {
        const updatedRawMaterials = [...RTFToDo.rawMaterials];
        const selectedRawMaterial = updatedRawMaterials[indexRM];
        const updatedOperationsToFollow = [
            ...selectedRawMaterial.operationsToFollow,
            operation,
        ];

        updatedRawMaterials[selectedRawMaterialIndex] = {
            ...selectedRawMaterial,
            operationsToFollow: updatedOperationsToFollow,
        };

        const updatedRTFToDo = {
            ...RTFToDo,
            rawMaterials: updatedRawMaterials,
        };

        setRTFToDo(updatedRTFToDo);
    };
    const handleNotesChange = (event, indexRM, indexOperation) => {
        const updatedRawMaterials = [...RTFToDo.rawMaterials];
        const selectedRawMaterial = updatedRawMaterials[indexRM];

        const updatedOperationsToFollow = selectedRawMaterial.operationsToFollow.map(
            (operation, operationIndex) => {
                if (operationIndex === indexOperation) {
                    return { ...operation, notes: event.target.value };
                }
                return operation;
            }
        );
        updatedRawMaterials[indexRM] = {
            ...selectedRawMaterial,
            operationsToFollow: updatedOperationsToFollow,
        };
        const updatedRTFToDo = {
            ...RTFToDo,
            rawMaterials: updatedRawMaterials,
        };

        setRTFToDo(updatedRTFToDo);
    };
    const handleSubmit = () => {
        const ItemToSend = {
            productId: RTFToDo.productId,
            rawMaterials: RTFToDo.rawMaterials.map((rawMaterial) => ({
                contactId: rawMaterial.contactId,
                rawMaterialId: rawMaterial.rawMaterialId,
                cantidadDeCortes: rawMaterial.cantidadDeCortes,
                operationsToFollow: rawMaterial.operationsToFollow.map((operation) => ({
                    operationId: operation.operationId,
                    notes: operation.notes,
                })),
            })),
        };
        setRTFToDo({
            rawMaterials: [],
            operationsToFollow: [],
            state: [
                {
                    toDo: true,
                    doing: false,
                    done: false,
                },
            ],
        });

        dispatch(createRTF(ItemToSend));
        navigate('/')
        dispatch(reset());
    };
useEffect(() => {
},[selectedRawMaterialIndex])
    return (
        <div className="container mt-5">
            {!selectedProduct ? (
                
                <div className='container'>
                    <div className='text-center'>
                        <h2>Productos sin ruta a seguir creada</h2>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Nombre del modelo</th>
                                    <th scope="col">Seleccionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products ? (products.map((product, index) => (
                                        <tr key={product._id}>
                                            <td>{product.modelName}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => onClickAddToSelectedProduct(product)}>   {product.modelName}</button>
                                            </td>
                                        </tr>
                                    ))) : (null)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <h2>Materias primas:</h2>
                        {RTFToDo.rawMaterials &&
                            RTFToDo.rawMaterials.map((rawMaterial, index) => (
                                <div className="card mb-3" key={rawMaterial.rawMaterialId}>
                                    <div className="card-body">
                                        <h5 className="card-title">Modelo: {rawMaterial.modelName}</h5>
                                        <p className="card-text">Cliente: {rawMaterial.contactName}</p>
                                        <p className="card-text">N. cortes: {rawMaterial.cantidadDeCortes}</p>
                                        <p className="card-text">
                                            Pieza: <strong>{`${rawMaterial.rawMaterialShape} de ${rawMaterial.rawMaterialMaterial}`}</strong>, 
                                            {`diámetro externo ${rawMaterial.
                                            rawMaterialExtDiameter}, diámetro interno ${rawMaterial.rawMaterialIntDiameter}`}
                                        </p>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Operaciones:</h5>
                                                {rawMaterial.operationsToFollow &&
                                                    rawMaterial.operationsToFollow.map((operation, operationIndex) => (
                                                        <div className="card mb-2" key={operation.operationId}>
                                                            <div className="card-body">
                                                                <p className="card-text">ID: {operation.operationId}</p>
                                                                <p className="card-text">Nº Op: {operation.codeOperation}</p>
                                                                <p className="card-text">Nombre Op: {operation.operationName}</p>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={operation.notes}
                                                                    onChange={(event) => handleNotesChange(event, index, operationIndex)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-primary mt-3"
                                            onClick={() => setSelectedRawMaterialIndex(index)}
                                        >
                                            Seleccionar materia prima
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="mt-4">
                        <h2>Operaciones:</h2>
                        {RTFToDo.operationsToFollow &&
                            RTFToDo.operationsToFollow.map((operation) => (
                                <div className="card mb-3" key={operation.operationId}>
                                    <div className="card-body">
                                        <p className="card-text">ID: {operation.operationId}</p>
                                        <p className="card-text">Nº Op: {operation.codeOperation}</p>
                                        <p className="card-text">Nombre Op: {operation.operationName}</p>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => onClickAddRmOTF(selectedRawMaterialIndex, operation)}
                                        >
                                            {selectedRawMaterialIndex !== null ? (
                                                `Añadir a ${RTFToDo.rawMaterials[selectedRawMaterialIndex].rawMaterialShape} de ${RTFToDo.rawMaterials[selectedRawMaterialIndex].rawMaterialMaterial}`
                                            ) : (
                                                <p>Seleccione una materia prima</p>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            <button className="btn btn-primary mt-3" onClick={handleSubmit}>
                Crear ruta/s
            </button>
        </div>
    );
}

export default CreateRuteToFollow
