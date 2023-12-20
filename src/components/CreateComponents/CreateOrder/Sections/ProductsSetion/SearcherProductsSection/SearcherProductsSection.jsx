import React , { useEffect } from 'react';
import { getProducts, reset } from '../../../../../../features/Promises/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
const SearcherProductsSection = ({handleAddProductToView}) => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);
useEffect(() => {
    dispatch(getProducts());

    // Limpiar el estado cuando el componente se desmonta
    return () => {
        dispatch(reset());
        console.log('Limpieza del estado de contactos');
    };
}, []);
useEffect(() => {
    console.log(products);
}, [products]);
  return (
    <div>
        <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Precio</th>
            <th>Modelo</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.customerId.name}</td>
              <td>{product.totalPrice}</td>
              <td>{product.modelName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SearcherProductsSection
