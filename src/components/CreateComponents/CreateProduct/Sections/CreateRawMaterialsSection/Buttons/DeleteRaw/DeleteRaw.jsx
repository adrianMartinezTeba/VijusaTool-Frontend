import React from 'react';

const DeleteRaw = ({ onDelete }) => {
  return (
    <div>
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default DeleteRaw;