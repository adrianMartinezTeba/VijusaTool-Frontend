import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createShape } from "../../../features/Promises/shape/shapeSlice"; // Asegúrate de importar el slice correcto
import './CreateShapeDispatch.scss'
const CreateShapeDispatch = () => {
    const [shapeSend,setShapeSend] = useState({})
    const dispatch = useDispatch()
    const {shape} = useSelector(
        (state) => state.shape
      );
    useEffect(() => {
       console.log(shape);
       setShapeSend(shape)
    }, [shape]);
    useEffect(() => {
      console.log(shapeSend);
    }, [shapeSend]);
  return (
    <div>
     <button className='btnCreateShape' onClick={() => dispatch(createShape(shapeSend))}>Crear</button>
    </div>
  )
}

export default CreateShapeDispatch
