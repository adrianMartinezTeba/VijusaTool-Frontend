import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
const AddOnSearcher = ({addToOTFArray,OTFData}) => {
  const handleClick = (data) => {
    addToOTFArray(data)
  }
  return (
    <div>
      <button onClick={() => handleClick(OTFData)}>Añadir</button>
    </div>
  )
}

export default AddOnSearcher
