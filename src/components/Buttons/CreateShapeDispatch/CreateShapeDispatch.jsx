import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createShape } from "../../../features/Promises/shape/shapeSlice"; // Asegúrate de importar el slice correcto
import './CreateShapeDispatch.scss'
const CreateShapeDispatch = () => {
    const dispatch = useDispatch()
    const {shape} = useSelector(
        (state) => state.shape
      );
    useEffect(() => {
       console.log(shape);
    }, [shape]);

  return (
    <div>
     <button className='btnCreateShape' onClick={() => dispatch(createShape(shape))}>Crear</button>
    </div>
  )
}

export default CreateShapeDispatch
