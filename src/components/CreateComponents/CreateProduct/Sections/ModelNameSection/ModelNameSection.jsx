import React, { useState, useEffect } from 'react';
import { addToCreateProductState } from '../../../../../features/Promises/product/productSlice';
import { useDispatch } from 'react-redux';

const ModelNameSection = () => {
  const dispatch = useDispatch();
  const [modelName, setModelName] = useState('');

  const handleInputChange = (e) => {
    const { value } = e.target;
    setModelName(value);
  };
  useEffect(() => {
    // Actualiza el estado global usando addToCreateProductState.addCustomerId
    dispatch(addToCreateProductState({ functionName: 'addModelName', data: modelName}));
  }, [modelName]);

  return (
    <div>
      <label htmlFor="modelName">Nombre del modelo:</label>
      <input
        type="text"
        name="modelName"
        id="modelName"
        onChange={handleInputChange}
        value={modelName}
      />
    </div>
  );
};

export default ModelNameSection;
