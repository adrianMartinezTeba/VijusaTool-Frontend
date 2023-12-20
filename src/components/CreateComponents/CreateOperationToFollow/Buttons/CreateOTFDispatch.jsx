import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createOTF} from "../../../../features/Promises/operationToFollow/operationToFollowSlice"; // Asegúrate de importar el slice correcto
import './CreateOTFDispatch.scss'
const CreateOTFDispatch = ({resetCrOTF}) => {
    const dispatch = useDispatch()
    const handleClick = (data) =>{
        dispatch(createOTF(data))
        resetCrOTF()
    }
    const {operationToFollow} = useSelector(
        (state) => state.operationToFollow
      );
    useEffect(() => {
       console.log(operationToFollow);
    }, [operationToFollow]);
  return (
    <div>
      <button className='btnCreateOTF' onClick={() => handleClick(operationToFollow)}>Crear</button>
    </div>
  )
}

export default CreateOTFDispatch
