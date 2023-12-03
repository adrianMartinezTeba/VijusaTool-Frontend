import React from 'react'
import {useDispatch } from 'react-redux'
import {addToCreateProductRMObj} from '../../../../../../../features/Promises/product/productSlice'
const Confirm = ({rawMaterialsArrayToSend}) => {
  const dispatch = useDispatch();
 const handleConfirm = (newData) => {
  console.log(newData);
   dispatch(addToCreateProductRMObj(newData))
 }
  return (
    <div>
      <button onClick={() => handleConfirm(rawMaterialsArrayToSend)}>Confirmar</button>
    </div>
  )
}

export default Confirm
