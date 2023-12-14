import React, { useEffect, useState } from 'react'
import SearcherCustomerSection from './SearcherCustomerSection/SearcherCustomerSection';
import CreateContact from '../../../CreateContact/CreateContact';
import { useDispatch } from "react-redux";
import { addToCreateProductState } from '../../../../../features/Promises/product/productSlice';
const CustomerSection = () => {
  const dispatch = useDispatch();
  const [buttonsStateCustomerSection, setButtonsStateCustomerSection] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });
  const [customerToView, setCustomerToView] = useState({});

  const handleBtnStateCustomerSection = (action) => {
    setButtonsStateCustomerSection({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };
  const handleAddCustToView = (customerName, customerId) => {
    setCustomerToView({ name: customerName });
    dispatch(addToCreateProductState({ functionName: 'addCustomerId', data: customerId }));
  }
  useEffect(() => {
    // console.log(customerToView);
  }, [customerToView]);
  return (
    <>
      Cliente: {customerToView.name}
      {
        buttonsStateCustomerSection.buscar ? (
          <div>
            <SearcherCustomerSection handleAddCustToView={handleAddCustToView} />
            <button onClick={() => handleBtnStateCustomerSection('cerrar')}>Cerrar</button>
          </div>
        ) : buttonsStateCustomerSection.crear ? (
          <div>
            <CreateContact />
            <button onClick={() => handleBtnStateCustomerSection('cerrar')}>Cerrar</button>
          </div>
        ) : buttonsStateCustomerSection.cerrar ? (
          <div>
            <button onClick={() => handleBtnStateCustomerSection('buscar')}>Buscar</button>
            <button onClick={() => handleBtnStateCustomerSection('crear')}>Crear</button>
          </div>
        ) : null
      }
    </>
  )
}

export default CustomerSection
