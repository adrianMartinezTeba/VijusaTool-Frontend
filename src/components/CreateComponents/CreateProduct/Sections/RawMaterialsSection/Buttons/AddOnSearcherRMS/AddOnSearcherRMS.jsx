import React from 'react';
import './AddOnSearcherRMS.scss';

const AddOnSearcherRMS = ({ RMData, addToRawMaterialsArray }) => {
  const handleClick = (data) => {
    addToRawMaterialsArray(data);
  };

  return (
    <div className="mb-3">
      <button className="btn btn-success" onClick={() => handleClick(RMData)}>
        Añadir
      </button>
    </div>
  );
};

export default AddOnSearcherRMS;
