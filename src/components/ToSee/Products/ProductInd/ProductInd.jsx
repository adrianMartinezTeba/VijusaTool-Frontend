import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../../features/Promises/product/productSlice';

const ProductInd = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <div className="container mt-4">
      {product && (
        <div>
          <h2 className="mb-3">Detalles del Producto</h2>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Información General</h5>
              <p className="card-text">Número: {product.number}</p>
              <p className="card-text">Modelo: {product.modelName}</p>
              <p className="card-text">Precio Total: {product.totalPrice}</p>
              <p className="card-text">Notas: {product.notes}</p>
            </div>
          </div>

          {/* Referencia a Contact */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Contacto</h5>
              <p className="card-text">Nombre del Contacto: {product.contactId.name}</p>
              <p className="card-text">Dirección del Contacto: {product.contactId.address}</p>
              {/* Agrega más campos según sea necesario */}
            </div>
          </div>

          {/* Referencia a RawMaterials */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Materias Primas</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Tamaño del Corte</th>
                    <th>Precio del Corte</th>
                    {/* Agrega más columnas según sea necesario */}
                  </tr>
                </thead>
                <tbody>
                  {product.rawMaterials.map((rawMaterial, index) => (
                    <tr key={index}>
                      <td>{rawMaterial.rawMaterialId.material}</td>
                      <td>{rawMaterial.tamañoDelCorte}</td>
                      <td>{rawMaterial.precioDelCorte}</td>
                      {/* Agrega más campos según sea necesario */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Referencia a OperationsToFollow */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Operaciones a Seguir</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre de la Operación</th>
                    <th>Notas</th>
                    <th>Tiempo Esperado</th>
                    <th>Precio de la Operación</th>
                    {/* Agrega más columnas según sea necesario */}
                  </tr>
                </thead>
                <tbody>
                  {product.operationsToFollow.map((operation, index) => (
                    <tr key={index}>
                      <td>{operation.operationId.name}</td>
                      <td>{operation.notes}</td>
                      <td>{operation.expectedTime}</td>
                      <td>{operation.priceOperation}</td>
                      {/* Agrega más campos según sea necesario */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

   

  {/* {product.ruteToFollow && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Rutas a Seguir</h5>
                <p>Estado:</p>
                <ul>
                  {product.ruteToFollow.state.map((state, index) => (
                    <li key={index}>
                      {state.toDo && <span className="text-warning">Por Hacer</span>}
                      {state.doing && <span className="text-primary">En Proceso</span>}
                      {state.done && <span className="text-success">Hecho</span>}
                    </li>
                  ))}
                </ul>

                <p>Materias Primas:</p>
                <ul>
                  {product.ruteToFollow.rawMaterials.map((rawMaterial, index) => (
                    <li key={index}>
                      <p>Contacto: {rawMaterial.contactId.name}</p>
                      <p>Material: {rawMaterial.rawMaterialId.material}</p>
                      <p>Cantidad de Cortes: {rawMaterial.cantidadDeCortes}</p>
                    </li>
                  ))}
                </ul>

                <p>Operaciones a Seguir:</p>
                <ul>
                  {product.ruteToFollow.rawMaterials.map((rawMaterial, index) => (
                    <li key={index}>
                      <p>Operación: {rawMaterial.operationsToFollow[0].operationId.name}</p>
                      <p>Notas: {rawMaterial.operationsToFollow[0].notes}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )} */}

          {/* Agrega más referencias según sea necesario */}
        </div>
      )}
    </div>
  );
};

export default ProductInd;
