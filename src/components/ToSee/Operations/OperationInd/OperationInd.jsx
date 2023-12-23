import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOTFById } from '../../../../features/Promises/operationToFollow/operationToFollowSlice';

const OperationInd = () => {
  const dispatch = useDispatch();
  const { operationToFollow } = useSelector((state) => state.operationToFollow);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOTFById(id));
  }, [id]);

  useEffect(() => {
    console.log(operationToFollow);
  }, [operationToFollow]);

  return (
    <div className="container mt-5">
      {operationToFollow ? (
        <div>
          <h1>{operationToFollow.name}</h1>
          <p className="lead">Codigo de la operación: {operationToFollow.codeOperation}</p>
          <p className="lead">Precio por hora(€): {operationToFollow.priceHourEur}</p>
        </div>
      ) : null}
    </div>
  );
};

export default OperationInd;
