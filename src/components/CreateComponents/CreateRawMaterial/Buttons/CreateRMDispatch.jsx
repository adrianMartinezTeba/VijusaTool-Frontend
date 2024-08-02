import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createRM, reset } from "../../../../features/Promises/rawMaterial/rawMaterialSlice";

const CreateRMDispatch = ({ rawMaterialData, resetInputs }) => {
  const dispatch = useDispatch();
  const { rawMaterial } = useSelector((state) => state.rawMaterial);

  const handleClick = () => {
    console.log(rawMaterialData);
    dispatch(createRM(rawMaterialData)); // Usar rawMaterialData aquí
    resetInputs();
  };

  useEffect(() => {
    console.log(rawMaterial);
  }, [rawMaterial]);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleClick}>Crear</button>
    </div>
  );
};

export default CreateRMDispatch;
