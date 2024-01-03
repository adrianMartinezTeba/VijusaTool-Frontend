import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCreateProductState } from '../../../../../../../features/Promises/product/productSlice.js';
import './DeleteOTF.scss';

const DeleteOTF = ({ index, deleteOTFFromArray }) => {
  const dispatch = useDispatch();

  const onDelete = (data) => {
    console.log(data);
    deleteOTFFromArray(data);
    dispatch(addToCreateProductState({ functionName: 'deleteOperation', data: data }));
  };

  return (
    <div className="mb-3">
      <button className="btn btn-danger" onClick={() => onDelete(index)}>
        Eliminar
      </button>
    </div>
  );
};

export default DeleteOTF;
