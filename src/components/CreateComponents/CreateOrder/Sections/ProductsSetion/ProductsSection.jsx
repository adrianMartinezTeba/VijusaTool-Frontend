import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SearcherProductsSection from './SearcherProductsSection/SearcherProductsSection';
import { addToCreateOrderState } from '../../../../../features/Promises/order/orderSlice';
const ProductsSection = () => {
    const dispatch = useDispatch();
    const [buttonsStateProductsSection, setButtonsStateProductsSection] = useState({
        buscar: false,
        crear: false,
        cerrar: true,
    });
    const [productsToView, setProductsToView] = useState({});
    const handleBtnStateProductsSection = (action) => {
        setButtonsStateProductsSection({
            buscar: action === 'buscar',
            crear: action === 'crear',
            cerrar: action === 'cerrar',
        });
    };
      const handleAddProductToView = (products) => {
        setProductsToView(products);
        dispatch(addToCreateOrderState({ functionName: 'addProduct', data: products }));
      }
    useEffect(() => {
        // console.log(customerToView);
    }, [productsToView]);
    return (
        <div>
            Productos:
            {
                buttonsStateProductsSection.buscar ? (
                    <div>
                        <SearcherProductsSection handleAddProductToView={handleAddProductToView}/>
                        <button onClick={() => handleBtnStateProductsSection('cerrar')}>Cerrar</button>
                    </div>
                ) : buttonsStateProductsSection.crear ? (
                    <div>
                        <button onClick={() => handleBtnStateProductsSection('cerrar')}>Cerrar</button>
                    </div>
                ) : buttonsStateProductsSection.cerrar ? (
                    <div>
                        <button onClick={() => handleBtnStateProductsSection('buscar')}>Buscar</button>
                        <button onClick={() => handleBtnStateProductsSection('crear')}>Crear</button>
                    </div>
                ): null
            }
        </div>
    )
}

export default ProductsSection
