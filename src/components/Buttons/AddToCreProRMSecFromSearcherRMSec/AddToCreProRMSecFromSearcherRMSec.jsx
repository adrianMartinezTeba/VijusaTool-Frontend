import React from 'react'
import { useDispatch } from "react-redux";
import { addToRMSectToSend, addToRMSectToView } from '../../../features/Promises/product/productSlice';
const AddToCreProRMSecFromSearcherRMSec = ({ RMData }) => {
  const dispatch = useDispatch();
  const handleClick = (data) => {
    dispatch(addToRMSectToSend(data))
    dispatch(addToRMSectToView(data))
  }
  return (
    <div>
      <button onClick={() => handleClick(RMData)}>Añadir</button>
    </div>
  )
}

export default AddToCreProRMSecFromSearcherRMSec
