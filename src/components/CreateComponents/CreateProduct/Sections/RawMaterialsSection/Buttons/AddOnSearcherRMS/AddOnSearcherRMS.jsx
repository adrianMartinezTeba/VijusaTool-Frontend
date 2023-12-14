import React from 'react'
import { useDispatch } from "react-redux";
import './AddOnSearcherRMS.scss'
const AddOnSearcherRMS = ({ RMData,addToRawMaterialsArray }) => {
  const handleClick = (data) => {
    addToRawMaterialsArray(data)

  }
  return (
    <div>
      <button onClick={() => handleClick(RMData)}>Añadir</button>
    </div>
  )
}

export default AddOnSearcherRMS
