import React, { useEffect, useState } from 'react';
import SearcherContactSection from './SearcherContactSection/SearcherContactSection';
import CreateContact from '../../../CreateContact/CreateContact';
import { useDispatch, useSelector } from 'react-redux';
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
  };

  useEffect(() => {
    // console.log(contactToView);
  }, [contactToView]);

  useEffect(() => {
    if (isSuccess) {
      setContactToView({});
    }
  }, [isSuccess]);

  return (
    <div className="container">
      <h2 >Cliente: {contactToView.name}</h2>
      {buttonsStateContactSection.buscar ? (
        <div>
          <SearcherContactSection handleAddCustToView={handleAddCustToView} />
          <button className="btn btn-secondary" onClick={() => handleBtnStateContactSection('cerrar')}>
            Cerrar
          </button>
        </div>
      ) : buttonsStateContactSection.crear ? (
        <div>
          <CreateContact />
          <button className="btn btn-secondary me-2" onClick={() => handleBtnStateContactSection('cerrar')}>
            Cerrar
          </button>
        </div>
      ) : buttonsStateContactSection.cerrar ? (
        <>
          <button className="btn btn-primary  me-2" onClick={() => handleBtnStateContactSection('buscar')}>
            Buscar
          </button>
          <button className="btn btn-success  me-2" onClick={() => handleBtnStateContactSection('crear')}>
            Crear
          </button>
        </>
      ) : null}
    </div>
  );
};

export default ContactSection;
