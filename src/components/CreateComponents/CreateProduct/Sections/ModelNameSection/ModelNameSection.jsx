import React, { useState, useEffect } from 'react';
import { addToCreateProductState } from '../../../../../features/Promises/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const ModelNameSection = () => {
  const dispatch = useDispatch();
  const [modelName, setModelName] = useState('');
  const { isSuccess } = useSelector((state) => state.product);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setModelName(value);
  };

  useEffect(() => {
    // Actualiza el estado global usando addToCreateProductState.addCustomerId
    dispatch(addToCreateProductState({ functionName: 'addModelName', data: modelName }));
  }, [modelName]);

  useEffect(() => {
    if (isSuccess) {
      setModelName('');
    }
  }, [isSuccess]);

  return (
    <div className="mb-3">
      <label htmlFor="modelName" className="form-label">
        Nombre del modelo:
      </label>
      <input
        type="text"
        className="form-control"
        id="modelName"
        name="modelName"
        onChange={handleInputChange}
        value={modelName}
      />
    </div>
  );
};

export default ModelNameSection;
