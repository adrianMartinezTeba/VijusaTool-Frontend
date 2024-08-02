import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById, deleteProduct } from '../../../../features/Promises/product/productSlice';
import ProductEdit from './ProductEdit';
import { PDFViewer } from '@react-pdf/renderer';
import ProductPDF from '../../../../components/ProductPDF/ProductPDF';
import EditRuteToFollow from './EditRuteToFollow';

const ProductInd = () => {
  const dispatch = useDispatch();
  const { product, isError, isLoading } = useSelector((state) => state.product);
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingRute, setIsEditingRute] = useState(false);
  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  const handleEditProduct = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditRute = () => {
    setIsEditingRute(true);
  };

  const handleCloseEditRute = () => {
    setIsEditingRute(false);
  };

  const handleDeleteProduct = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      dispatch(deleteProduct(id));
      // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
    }
  };

  const handleShowPDF = () => {
    setShowPDF(true);
  };

  const handleClosePDF = () => {
    setShowPDF(false);
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (isError) {
    return <p>Ocurrió un error al cargar el producto.</p>;
  }

  return (
    <div className="container mt-5 mb-5">
      {product ? (
        <div className="card">
          <div className="card-body">
            {isEditing ? (
              <ProductEdit product={product} handleCancelEdit={handleCancelEdit} />
            ) : (
              <div>
                <div className="m-4 p-4 border border-dark">
                  <p className="lead">Nombre del modelo: {product.modelName}</p>
                  <p className="lead">Modelo número: {product.number}</p>
                  <p className="lead">Precio total: {product.totalPrice} €</p>
                  <p className="lead">Notas: {product.notes || 'Sin notas'}</p>
                </div>
                {product.contactId && (
                  <div className="m-4 p-4 border border-black">
                    <h5 className="card-header">Información de Contacto:</h5>
                    <div className="m-4 p-4 border border-black-subtle">
                      <p className="lead">Nombre: {product.contactId.name}</p>
                      <p className="lead">Teléfono: {product.contactId.tlfn}</p>
                    </div>
                  </div>
                )}
                {product.ruteToFollow && (
                  <div className="m-4 p-4 border border-black">
                    <h5 className="card-header">Ruta a seguir:</h5>
                    {isEditingRute ? (
                      <EditRuteToFollow 
                        ruteId={product.ruteToFollow._id} 
                        productId={product._id} // Pasa el ID del producto aquí
                        handleClose={handleCloseEditRute} 
                      />
                    ) : (
                      product.ruteToFollow.rawMaterials?.map((rawMaterial) => (
                        <div className="card m-2" key={rawMaterial.rawMaterialId._id}>
                          <h6 className="card-header">
                            {`${rawMaterial.rawMaterialId.shape} - ${rawMaterial.rawMaterialId.material} - diámetro externo: ${rawMaterial.rawMaterialId.externalDiameter || 'no'} - diámetro interno: ${rawMaterial.rawMaterialId.internalDiameter || 'no'} - Nº cortes: ${rawMaterial.cantidadDeCortes || 'no'}`}
                          </h6>
                          <ul className="list-group list-group-flush">
                            {rawMaterial.operationsToFollow?.map((operation) => (
                              <li className="list-group-item" key={operation.operationId._id}>
                                <p>Operación: {operation.operationId.name}</p>
                                <p>Notas: {operation.notes}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    )}
                    <div className="text-center mt-4">
                      <button className="btn btn-warning" onClick={handleEditRute}>
                        Editar Ruta a Seguir
                      </button>
                      <button className="btn btn-primary" onClick={handleShowPDF}>
                        Ver PDF de la Ruta a Seguir
                      </button>
                    </div>
                    {showPDF && (
                      <div className="pdf-viewer mt-4">
                        <div className="d-flex justify-content-end mb-2">
                          <button className="btn btn-secondary" onClick={handleClosePDF}>
                            Cerrar PDF
                          </button>
                        </div>
                        <PDFViewer width="100%" height="600">
                          <ProductPDF product={product} />
                        </PDFViewer>
                      </div>
                    )}
                  </div>
                )}
                {product.rawMaterials && (
                  <div className="m-4 p-4 border border-black">
                    <h5 className="card-header">Información de las materias primas:</h5>
                    <ul className="list-group list-group-flush">
                      {product.rawMaterials.map((rawMaterial) => (
                        <li className="list-group-item d-flex justify-content-center border m-3" key={rawMaterial._id}>
                          <div className="card m-4 p-4">
                            <p>Forma: {rawMaterial.rawMaterialId.shape}</p>
                            <p>Material: {rawMaterial.rawMaterialId.material}</p>
                            <p>Diámetro externo: {rawMaterial.rawMaterialId.externalDiameter}</p>
                            <p>Diámetro interno: {rawMaterial.rawMaterialId.internalDiameter}</p>
                            <p>Tamaño del corte(mm): {rawMaterial.tamañoDelCorte}</p>
                            <p>Cantidad de cortes: {rawMaterial.cantidadDeCortes}</p>
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
                {product.operationsToFollow && (
                  <div className="m-4 p-4 border border-black">
                    <h5 className="card-header">Información de las Operaciones a Seguir:</h5>
                    <ul className="list-group list-group-flush">
                      {product.operationsToFollow.map((operation) => (
                        <li className="list-group-item d-flex justify-content-center border m-3" key={operation._id}>
                          <div className="card m-4 p-4">
                            <p>Nombre de la Operación: {operation.operationId.name}</p>
                            <p>Código de la Operación: {operation.operationId.codeOperation}</p>
                            <p>Precio por Hora (€): {operation.priceOperation}</p>
                            <p>Tiempo Esperado (segundos): {operation.expectedTime}</p>
                            <p>Precio de la Operación (€): {operation.priceOperation}</p>
                            <p>Notas: {operation.notes}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            <div className="text-center mt-4">
              <button className="btn btn-warning" onClick={handleEditProduct}>
                Editar Producto
              </button>
              <button className="btn btn-danger" onClick={handleDeleteProduct}>
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProductInd;
