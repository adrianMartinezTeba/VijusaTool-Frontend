import React, { useEffect, useState } from 'react';
import CreateRawMaterialsSection from './Sections/CreateRawMaterialsSection/CreateRawMaterialsSection';
import CreateOperationsSection from './Sections/CreateOperationsSection/CreateOperationsSection';
import { useDispatch, useSelector } from 'react-redux';

const CreateProduct = () => {
  const { createProductState } = useSelector((state) => state.product);
  const [productComponente, setProductComponent] = useState({
    modelName: '',
    rawMaterials: [],
    operationToFollow: [],
    customerId: '',
    totalPrice: '',
    notes: ''
  });
  useEffect(() => {
    // Calcular totalPrice sumando precios de rawMaterials y operationToFollow
    let rawMaterialsTotal = 0;
    let operationsTotal = 0;
  
    // Sumar precios de rawMaterials
    for (const rawMaterial of productComponente.rawMaterials) {
      rawMaterialsTotal += parseFloat(rawMaterial.precioTotalSobreEsaMateriaPrima) || 0;
    }
  
    // Sumar precios de operationToFollow
    for (const operation of productComponente.operationToFollow) {
      operationsTotal += parseFloat(operation.priceOperation) || 0;
    }
  
    // Calcular el total final
    const totalPrice = rawMaterialsTotal + operationsTotal;
  
    // Actualizar el estado con el nuevo totalPrice
    setProductComponent({
      ...productComponente,
      totalPrice: totalPrice, // Convertir a cadena si es necesario
    });
  
    // Lógica adicional cuando productComponente cambia
    console.log(createProductState);
  }, [productComponente.rawMaterials, productComponente.operationToFollow, createProductState]);
  
  return (
    <>
      <h2>Crear Producto</h2>
      <div>
        <CreateRawMaterialsSection />
      </div>
      <div>
        <CreateOperationsSection />
      </div>
      <div>
        <p>
          Total del producto: {productComponente.totalPrice}
        </p>
      </div>
    </>
  );
}

export default CreateProduct;
