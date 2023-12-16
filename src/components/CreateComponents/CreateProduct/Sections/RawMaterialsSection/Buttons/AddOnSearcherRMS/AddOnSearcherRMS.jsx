import React from 'react'
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
