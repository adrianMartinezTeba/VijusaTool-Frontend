import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createOTF} from "../../../features/Promises/operationToFollow/operationToFollowSlice"; // Asegúrate de importar el slice correcto
import './CreateOTFDispatch.scss'
const CreateOTFDispatch = () => {
    const dispatch = useDispatch()
    const {operationToFollow} = useSelector(
        (state) => state.operationToFollow
      );
    useEffect(() => {
       console.log(operationToFollow);
    }, [operationToFollow]);
  return (
    <div>
      <button className='btnCreateOTF' onClick={() => dispatch(createOTF(operationToFollow))}>Crear</button>
    </div>
  )
}

export default CreateOTFDispatch
