// CreateOperationsSection.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRM } from '../../../../../features/Promises/rawMaterial/rawMaterialSlice';

const CreateOperationsSection = ( {addRawMaterial} ) => {
  const dispatch = useDispatch();
  const { rawMaterials, isSuccessRawMaterial, isErrorRawMaterial, messageRawMaterial } = useSelector((state) => state.rawMaterial);

  useEffect(() => {
    dispatch(getRM());
  }, []);
useEffect(()=>{
console.log(rawMaterials);
console.log(typeof(addRawMaterial));
},[isSuccessRawMaterial])
  return (
    <div>
      {/* {rawMaterials ? rawMaterials.map((material) => (
            <div onClick={()=>addRawMaterial(material)} key={material._id}>
              <h1>{material.material.name}</h1>
              <p>{material.typeMat.TypeMat}</p>
            </div>
          ))
        : null} */}
    </div>
  );
}

export default CreateOperationsSection;