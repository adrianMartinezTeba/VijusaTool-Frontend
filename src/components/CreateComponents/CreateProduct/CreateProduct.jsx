import React, { useEffect, useState } from 'react';
import RawMaterialsSection from './Sections/RawMaterialsSection/RawMaterialsSection';
import OperationsSection from './Sections/OperationsSection/OperationsSection';
import { useDispatch, useSelector } from 'react-redux';
import CustomerSection from './Sections/CustomerSection/CustomerSection';
import ModelNameSection from './Sections/ModelNameSection/ModelNameSection';
import { addToCreateProductState, create } from '../../../features/Promises/product/productSlice';
const CreateProduct = () => {
  const dispatch = useDispatch();
  const { createProductState } = useSelector((state) => state.product);
  const [productComponente, setProductComponent] = useState({
    modelName: '',
    rawMaterials: [],
    operationToFollow: [],
    customerId: '',
    customerName: '',
    totalPrice: '',
    notes: ''
  });
  useEffect(() => {
    // Calcular totalPrice sumando precios de rawMaterials y operationToFollow
    let rawMaterialsTotal = 0;
    let operationsTotal = 0;
  
    // Sumar precios de rawMaterials
    for (const rawMaterial of createProductState.rawMaterials) {
      rawMaterialsTotal += parseFloat(rawMaterial.precioTotalSobreEsaMateriaPrima) || 0;
    }
  
    // Sumar precios de operationToFollow
    for (const operation of createProductState.operationToFollow) {
      operationsTotal += parseFloat(operation.priceOperation) || 0;
    }
  
    // Calcular el total final
    const totalPrice = rawMaterialsTotal + operationsTotal;
  
    // Actualizar el estado con el nuevo totalPrice
    dispatch(addToCreateProductState({ functionName: 'addTotalPrice', data: totalPrice }));
  
    // Lógica adicional cuando productComponente cambia
    
  }, [ createProductState]);

  useEffect(() => {
    // setProductComponent({
    //   ...productComponente,
    //   customerId: createProductState.customerId,
    // })
  
    setProductComponent({
      modelName: createProductState.modelName,
      customerId: createProductState.customerId,
      rawMaterials: createProductState.rawMaterials.map((rawMaterial) => ({
        rawMaterialId: rawMaterial.rawMaterialId,
        tamañoDelCorte: rawMaterial.tamañoDelCorte,
        precioDelCorte:rawMaterial.precioDelCorte,
        cantidadDeCortes: rawMaterial.cantidadDeCortes,
        precioTotalSobreEsaMateriaPrima: rawMaterial.precioTotalSobreEsaMateriaPrima,
      })),
      operationsToFollow: createProductState.operationToFollow.map((operation) => ({
        operationId: operation.operationId,
        notes: operation.notes,
        expectedTime: operation.expectedTime,
        priceOperation: operation.priceOperation,
      })),
      totalPrice: createProductState.totalPrice,
      notes: createProductState.notes,
    }); 
    console.log(productComponente);
  }, [createProductState]);
  const handleCreate = (data) => {
    dispatch(create(data));
  }
  return (
    <>
      <h2>Crear Producto</h2>
      <div className='modelName'>
       <ModelNameSection/>
      </div>
      <div className="customerData">
       <CustomerSection/>
      </div>
      <div>
        <RawMaterialsSection />
      </div>
      <div>
        <OperationsSection />
      </div>
      <div>
        <p>
          Total del producto: {productComponente.totalPrice}
        </p>
      </div>
      <button onClick={() => handleCreate(productComponente)}>Crear</button>
    </>
  );
}

export default CreateProduct;