import React, { useEffect } from 'react'
import './CreateMaterialDispatch.scss'
import { useDispatch,useSelector } from "react-redux";
import {createMaterial} from '../../../features/Promises/material/materialSlice'
const CreateMaterialDispatch = () => {
    const dispatch = useDispatch()
    const {material} = useSelector(
        (state) => state.material
      );
      useEffect(() => {
        console.log(material);
      }, [material]);
  return (
    <div>
      <button onClick={() => dispatch(createMaterial(material))} className='btnCreateMaterial'>Crear</button>
    </div>
  )
}

export default CreateMaterialDispatch
