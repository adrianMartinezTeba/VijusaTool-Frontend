import React, { useEffect } from 'react'
import { useDispatch,useSelector } from "react-redux";
import { createRM,reset} from "../../../../features/Promises/rawMaterial/rawMaterialSlice";
const CreateRMDispatch = ({resetInputs}) => {
    const dispatch = useDispatch()
    const {rawMaterial} = useSelector(
        (state) => state.rawMaterial
      );
const handleClick = (data) =>{
  dispatch(createRM(data))
  dispatch(reset())
  resetInputs()
}
    useEffect(() => {
       console.log(rawMaterial);
    }, [rawMaterial]);

  return (
    <div>
      <button  className="btn btn-primary" onClick={() => handleClick(rawMaterial)}>Crear</button>
    </div>
  )
}

export default CreateRMDispatch
