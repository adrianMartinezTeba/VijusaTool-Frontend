import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reset, getLastProduct } from '../../../../../features/Promises/product/productSlice'
const RuteToFollow = () => {
  const dispatch = useDispatch();
  const [loadingLastProduct, setLoadingLastProduct] = useState(true);
  const { isSuccess, product } = useSelector((state) => state.product);
  const { createRTF } = useSelector((state) => state.ruteToFollow);
  const [RTFToDo, setRTFToDo] = useState({
    rawMaterials: [{
      productId: '',
      contactId: '',
      modelName: '',
      rawMaterialId: '',
      cantidadDeCortes: '',
      rawMaterialMaterial: '',
      rawMaterialShape: '',
      rawMaterialExtDiameter: '',
      rawMaterialIntDiameter: '',
      operationsToFollow: [{
        operationId: '',
        notes: '',
      }]
    }],
    state: [{
      toDo: true,
      doing: false,
      done: false
    }]
  });
  useEffect(() => {
    setTimeout(() => {
      dispatch(getLastProduct());
      setLoadingLastProduct(false)
    }, 1000)
  }, [])
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
          operationsToFollow: [{
            operationId: '',
            notes: '',
          }]
        })),
          operationsToFollow: product.operationsToFollow.map((operation) => ({
            operationId: operation.operationId._id,
            codeOperation: operation.operationId.codeOperation,
            operationName: operation.operationId.name,
            notes: '',
          })),
      });
    }
  }, [product]);
  useEffect(() => {
    console.log(product);
    console.log(RTFToDo);
  }, [RTFToDo]);
  return (
    <div>
      {
        loadingLastProduct ? (
          <div>
            <h1>Cargando último pedido creado</h1>
          </div>
        ) : (
          <div>
            <div>
              Materias primas:
              {RTFToDo.rawMaterials && RTFToDo.rawMaterials.map((rawMaterial) => (
                <div key={rawMaterial.rawMaterialId}>
                  <p>Modelo: {rawMaterial.modelName}</p>
                  <p>cliente: {rawMaterial.contactName}</p>
                  <p>n.cortes:{rawMaterial.cantidadDeCortes}</p>
                </div>
              ))}
            </div>
            Operaciones:
            {
              RTFToDo.operationsToFollow && RTFToDo.operationsToFollow.map((operation) => (
                <div key={operation._id}>
                  <p>id:{operation.operationId}</p>
                  <p>NºOp:{operation.codeOperation}</p>
                  <p>nombreOp:{operation.operationName}</p>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}
export default RuteToFollow