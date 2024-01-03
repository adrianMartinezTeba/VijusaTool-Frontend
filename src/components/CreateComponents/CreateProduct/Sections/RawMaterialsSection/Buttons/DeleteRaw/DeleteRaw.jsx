import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCreateProductState } from '../../../../../../../features/Promises/product/productSlice.js';
import './DeleteRaw.scss';

const DeleteRaw = ({ index, deleteRawMaterialFromArray }) => {
  const dispatch = useDispatch();

  const onDelete = (data) => {
    console.log(data);
    deleteRawMaterialFromArray(data);
    dispatch(addToCreateProductState({ functionName: 'deleteRawMaterial', data: data }));
  };

  return (
    <div className="mb-3">
      <button className="btn btn-danger" onClick={() => onDelete(index)}>
        Eliminar
      </button>
    </div>
  );
};

export default DeleteRaw;
