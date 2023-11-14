import React, { useEffect, useState } from 'react';
import CreateRawMaterialsSection from './Sections/CreateRawMaterialsSection/CreateRawMaterialsSection';
import CreateOperationsSection from './Sections/CreateOperationsSection/CreateOperationsSection';

const CreateProduct = () => {
  const [rawMaterialsArray, setRawMaterialsArray] = useState([]);

  const addRawMaterial = (newData) => {
    if (rawMaterialsArray.length === 0) {
      setRawMaterialsArray([newData])
    }else{
      setRawMaterialsArray([...rawMaterialsArray,newData])
    }
  }
useEffect(()=>{
console.log(rawMaterialsArray);
},[rawMaterialsArray])
  return (
    <div>
      <CreateRawMaterialsSection />
      <CreateOperationsSection addRawMaterial={addRawMaterial} />
    </div>
  );
}

export default CreateProduct;