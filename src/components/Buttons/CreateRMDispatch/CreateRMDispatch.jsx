import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createRM } from "../../../features/Promises/rawMaterial/rawMaterialSlice";
const CreateRMDispatch = () => {
    const dispatch = useDispatch()
    const {rawMaterial} = useSelector(
        (state) => state.rawMaterial
      );
    useEffect(() => {
       console.log(rawMaterial);
    }, [rawMaterial]);

  return (
    <div>
      <button className='btnCreateRM' onClick={() => dispatch(createRM(rawMaterial))}>Crear</button>
    </div>
  )
}

export default CreateRMDispatch
