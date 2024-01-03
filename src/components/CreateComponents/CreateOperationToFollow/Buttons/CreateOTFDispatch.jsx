import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOTF } from '../../../../features/Promises/operationToFollow/operationToFollowSlice';
import './CreateOTFDispatch.scss';

const CreateOTFDispatch = ({ resetCrOTF }) => {
  const dispatch = useDispatch();
  const { operationToFollow } = useSelector((state) => state.operationToFollow);

  const handleClick = (data) => {
    dispatch(createOTF(data));
    resetCrOTF();
  };

  useEffect(() => {
    console.log(operationToFollow);
  }, [operationToFollow]);

  return (
    <div>
      <button className='btn btn-primary' onClick={() => handleClick(operationToFollow)}>
        Crear
      </button>
    </div>
  );
};

export default CreateOTFDispatch;
