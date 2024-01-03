import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searcher, getRM, reset } from '../../../../features/Promises/rawMaterial/rawMaterialSlice';
const Searcher = () => {
  const dispatch = useDispatch();
  const { rawMaterials } = useSelector((state) => state.rawMaterial);
  const [searchCriteria, setSearchCriteria] = useState({
    material: '',
    shape: '',
    externalDiameter: '', // Nuevo campo para diámetro externo
    internalDiameter: ''  // Nuevo campo para diámetro interno
  });
  const handleChange = (e) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    if (searchCriteria.material.length > 1 || searchCriteria.shape.length > 1 || searchCriteria.externalDiameter.length > 1 || searchCriteria.internalDiameter.length > 1) {
      console.log(searchCriteria);
      dispatch(searcher(searchCriteria));
    } else {
      dispatch(reset());
    }
  }, [searchCriteria]);
  useEffect(() => {
    console.log(rawMaterials);
  },[rawMaterials])
  // const handleCheckboxChange = (e) => {
  //   setSearchCriteria({
  //     ...searchCriteria,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <label className="form-label">
            Material:
            <input
              type="text"
              className="form-control"
              name="material"
              value={searchCriteria.material}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label className="form-label">
            Forma:
            <input
              type="text"
              className="form-control"
              name="shape"
              value={searchCriteria.shape}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label className="form-label">
            Diámetro Externo:
            <input
              type="text"
              className="form-control"
              name="externalDiameter"
              value={searchCriteria.externalDiameter}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label className="form-label">
            Diámetro Interno:
            <input
              type="text"
              className="form-control"
              name="internalDiameter"
              value={searchCriteria.internalDiameter}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Searcher;