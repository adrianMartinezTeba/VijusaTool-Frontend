import React, { useEffect, useState } from 'react'
import SearcherContactSection from './SearcherContactSection/SearcherContactSection';
import CreateContact from '../../../CreateContact/CreateContact';
import { useDispatch, useSelector } from "react-redux";
import { addToCreateProductState } from '../../../../../features/Promises/product/productSlice';
const ContactSection = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.product);
  const [buttonsStateContactSection, setButtonsStateContactSection] = useState({
    buscar: false,
    crear: false,
    cerrar: true,
  });
  const [contactToView, setContactToView] = useState({});

  const handleBtnStateContactSection = (action) => {
    setButtonsStateContactSection({
      buscar: action === 'buscar',
      crear: action === 'crear',
      cerrar: action === 'cerrar',
    });
  };
  const handleAddCustToView = (contactName, contactId) => {
    setContactToView({ name: contactName });
    dispatch(addToCreateProductState({ functionName: 'addContactId', data: contactId }));
  }
  useEffect(() => {
    // console.log(contactToView);
  }, [contactToView]);
  useEffect(() => {
    if (isSuccess) {
      setContactToView({});
    }
  }, [isSuccess]);
  return (
    <>
      Cliente: {contactToView.name}
      {
        buttonsStateContactSection.buscar ? (
          <div>
            <SearcherContactSection handleAddCustToView={handleAddCustToView} />
            <button onClick={() => handleBtnStateContactSection('cerrar')}>Cerrar</button>
          </div>
        ) : buttonsStateContactSection.crear ? (
          <div>
            <CreateContact />
            <button onClick={() => handleBtnStateContactSection('cerrar')}>Cerrar</button>
          </div>
        ) : buttonsStateContactSection.cerrar ? (
          <div>
            <button onClick={() => handleBtnStateContactSection('buscar')}>Buscar</button>
            <button onClick={() => handleBtnStateContactSection('crear')}>Crear</button>
          </div>
        ) : null
      }
    </>
  )
}

export default ContactSection
