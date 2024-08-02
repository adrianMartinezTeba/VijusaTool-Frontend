import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RawMaterialsSection from './Sections/RawMaterialsSection/RawMaterialsSection';
import OperationsSection from './Sections/OperationsSection/OperationsSection';
import { useDispatch, useSelector } from 'react-redux';
import ContactSection from './Sections/ContactSection/ContactSection';
import ModelNameSection from './Sections/ModelNameSection/ModelNameSection';
import { addToCreateProductState, create, reset } from '../../../features/Promises/product/productSlice';
import './CreateProduct.scss';
import RTFSection from './Sections/RTFSection/RTFSection';

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createProductState, isSuccess } = useSelector((state) => state.product);
  const { newRTFId } = useSelector((state) => state.ruteToFollow);
  const [isCrRTF,setIsCrRTF] = useState(false)
  const [productComponente, setProductComponent] = useState({
    modelName: '',
    rawMaterials: [],
    operationToFollow: [],
    ruteToFollow: '',
    contactId: '',
    customerName: '',
    totalPrice: '',
    notes: ''
  });

  // Sincronizar el estado de productComponente con newRTFId
  useEffect(() => {
    setProductComponent((prevState) => ({
      ...prevState,
      ruteToFollow: newRTFId || prevState.ruteToFollow // Actualiza solo si newRTFId está definido
    }));
  }, [newRTFId]);

  useEffect(() => {
    // Calcular totalPrice sumando precios de rawMaterials y operationToFollow
    if (createProductState) {
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
    }
  }, [createProductState]);

  useEffect(() => {
    setProductComponent((prevState) => ({
      ...prevState,
      modelName: createProductState.modelName,
      contactId: createProductState.contactId,
      rawMaterials: createProductState.rawMaterials.map((rawMaterial) => ({
        rawMaterialId: rawMaterial.rawMaterialId,
        tamañoDelCorte: rawMaterial.tamañoDelCorte,
        precioDelCorte: rawMaterial.precioDelCorte,
        cantidadDeCortes: rawMaterial.cantidadDeCortes,
        precioTotalSobreEsaMateriaPrima: rawMaterial.precioTotalSobreEsaMateriaPrima,
      })),
      operationsToFollow: createProductState.operationToFollow.map((operation) => ({
        operationId: operation.operationId,
        notes: operation.notes,
        expectedTime: operation.expectedTime,
        priceOperation: operation.priceOperation,
      })),
      ruteToFollow: createProductState.ruteToFollow || newRTFId, // Prioriza newRTFId si está disponible
      totalPrice: createProductState.totalPrice,
      notes: createProductState.notes,
    }));
  }, [createProductState]);

  const handleCreate = () => {
    // Asegurarse de que productComponente tenga un ruteToFollow válido antes de crear el producto
    if (!productComponente.ruteToFollow) {
      console.error("Crea primero la ruta a seguir,antes de crear el producto");
      return; // Evitar la creación si no hay un ID de ruteToFollow
    }
    // if(!isCrRTF){
    //   console.error('Aun no has creado la ruta a seguir')
    //   return // Evitar la creación si no hay un ID de ruteToFollow
    // }
    // Crear el producto
    dispatch(create(productComponente));

    // Restablecer el estado después de crear
    setProductComponent({
      modelName: '',
      rawMaterials: [],
      operationToFollow: [],
      contactId: '',
      customerName: '',
      ruteToFollow: '',
      totalPrice: '',
      notes: ''
    });

    // Redirigir después de la creación si es necesario
    // navigate('/ruteToFollow');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductComponent((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="create-product ml-3 mt-5 mb-5 p-3 container-sm card">
      <h2>Crear Producto</h2>
      <div className='modelName'>
        <ModelNameSection />
      </div>
      <div className="mb-3">
        <ContactSection />
      </div>
      <div className="mb-3 mainContainerProductData">
        <div className="mb-3">
          <RawMaterialsSection />
        </div>
        <div className="mb-3">
          <OperationsSection />
        </div>
        <div className="mb-3">
        <RTFSection />
        </div>
      </div>
      <div className="mb-3">
        <p>
          Total del producto: {productComponente.totalPrice}
        </p>
      </div>
      <div className="mb-3">
        <label htmlFor="notes">Notas:</label>
        <input
          type="text"
          id="notes"
          name="notes"
          value={productComponente.notes}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" onClick={handleCreate}>Crear</button>
    </div>
  );
}

export default CreateProduct;
