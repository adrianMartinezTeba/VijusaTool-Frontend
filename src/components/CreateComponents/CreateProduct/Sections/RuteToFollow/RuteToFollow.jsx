import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, getLastProduct } from '../../../../../features/Promises/product/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import { createRTF } from '../../../../../features/Promises/ruteToFollow/ruteToFollowSlice';
const RuteToFollow = () => {
  const dispatch = useDispatch();
  const [loadingLastProduct, setLoadingLastProduct] = useState(true);
  const { isSuccess, product } = useSelector((state) => state.product);
  const [RTFToDo, setRTFToDo] = useState({
    rawMaterials: [
      {
        productId: '',
        contactId: '',
        modelName: '',
        rawMaterialId: '',
        cantidadDeCortes: '',
        rawMaterialMaterial: '',
        rawMaterialShape: '',
        rawMaterialExtDiameter: '',
        rawMaterialIntDiameter: '',
        operationsToFollow: [
          {
            operationId: '',
            notes: '',
          },
        ],
      },
    ],
    operationsToFollow: [],
    state: [
      {
        toDo: true,
        doing: false,
        done: false,
      },
    ],
  });
  useEffect(() => {
    setTimeout(() => {
      dispatch(getLastProduct());
      setLoadingLastProduct(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (product) {
      setRTFToDo({
        rawMaterials: product.rawMaterials.map((rawMaterial) => ({
          productId: product._id,
          modelName: product.modelName,
          contactId: product.contactId._id,
          contactName: product.contactId.name,
          rawMaterialId: rawMaterial.rawMaterialId._id,
          cantidadDeCortes: rawMaterial.cantidadDeCortes,
          rawMaterialMaterial: rawMaterial.rawMaterialId.material,
          rawMaterialShape: rawMaterial.rawMaterialId.shape,
          rawMaterialExtDiameter: rawMaterial.rawMaterialId.externalDiameter,
          rawMaterialIntDiameter: rawMaterial.rawMaterialId.internalDiameter,
          operationsToFollow: [],
        })),
        operationsToFollow: product.operationsToFollow.map((operation) => ({
          operationId: operation.operationId._id,
          codeOperation: operation.operationId.codeOperation,
          operationName: operation.operationId.name,
        })),
        state: [
          {
            toDo: true,
            doing: false,
            done: false,
          },
        ],
      });
    }
  }, [product]);
  const [selectedRawMaterialIndex, setSelectedRawMaterialIndex] = useState(null);
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

    const updatedOperationsToFollow = selectedRawMaterial.operationsToFollow.map((operation, operationIndex) => {
      if (operationIndex === indexOperation) {
        // Actualiza solo la nota de la operación específica
        return { ...operation, notes: event.target.value };
      }
      return operation;
    });

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
const handleSubmit = (data) => {
  const ItemToSend = {
    rawMaterials: RTFToDo.rawMaterials.map((rawMaterial) => ({
      productId: rawMaterial.productId,
      contactId: rawMaterial.contactId,
      rawMaterialId: rawMaterial.rawMaterialId,
      cantidadDeCortes: rawMaterial.cantidadDeCortes,
      operationsToFollow: rawMaterial.operationsToFollow.map((operation) => ({
        operationId: operation.operationId,
        notes: operation.notes,
      })),
    })),
  }
  console.log(ItemToSend);
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
  })
  dispatch(createRTF(ItemToSend));
}

  useEffect(() => {
    console.log(selectedRawMaterialIndex);
  }, [selectedRawMaterialIndex]);
  useEffect(() => {
    console.log(RTFToDo);
  }, [RTFToDo]);

  return (
    <div className="container mt-5">
      {loadingLastProduct ? (
        <div>
          <h1>Cargando último pedido creado</h1>
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
                      Pieza: {`${rawMaterial.rawMaterialShape} de ${rawMaterial.rawMaterialMaterial}, diámetro externo ${rawMaterial.rawMaterialExtDiameter}, diámetro interno ${rawMaterial.rawMaterialIntDiameter}`}
                    </p>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Operaciones:</h5>
                        {rawMaterial.operationsToFollow && rawMaterial.operationsToFollow.map((operation,operationIndex) => (
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
                      Añadir a rawMaterial.operationsToFollow
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <button className="btn btn-primary mt-3" onClick={() => handleSubmit()}>Crear ruta/s</button>
    </div>
  );
};

export default RuteToFollow;
