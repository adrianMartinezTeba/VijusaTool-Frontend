import React from 'react';
import {useDispatch } from 'react-redux';
import {deleteRMSectToSend,deleteRMSectToView} from '../../../../../../../features/Promises/product/productSlice.js';
const DeleteRaw = ({id }) => {
  const dispatch = useDispatch();
  const onDelete = (itemId) => {
    console.log(itemId);
    dispatch(deleteRMSectToView(itemId));
    dispatch(deleteRMSectToSend(itemId));
  };
  return (
    <div>
      <button onClick={() => onDelete(id)}>Eliminar</button>
    </div>
  );
};

export default DeleteRaw;