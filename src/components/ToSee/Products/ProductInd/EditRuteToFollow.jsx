import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updRTF, getRTFById } from '../../../../features/Promises/ruteToFollow/ruteToFollowSlice';
import { getProductById } from '../../../../features/Promises/product/productSlice'; // Importa getProductById

const EditRuteToFollow = ({ ruteId, productId, handleClose }) => { // Añade productId como prop
  const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const { RTF, isLoading, error } = useSelector((state) => state.ruteToFollow);

  // Cargar la ruta a seguir por ID
  useEffect(() => {
    dispatch(getRTFById(ruteId));
  }, [ruteId, dispatch]);

  // Actualizar formData cuando RTF cambie
  useEffect(() => {
    if (RTF && RTF.rawMaterials) {
      setFormData(RTF.rawMaterials.map(rawMaterial => ({
        ...rawMaterial,
        operationsToFollow: rawMaterial.operationsToFollow || [],
      })));
    }
  }, [RTF]);

  // Manejar el cambio de notas
  const handleNoteChange = (event, index, opIndex) => {
    const updatedFormData = [...formData]; // Copia superficial de formData

    // Crear una copia profunda del objeto de operaciones a seguir
    const updatedOperations = [...updatedFormData[index].operationsToFollow];

    // Modifica la propiedad de notas en la copia profunda
    updatedOperations[opIndex] = {
      ...updatedOperations[opIndex],
      notes: event.target.value,
    };

    // Actualiza la copia del objeto del material crudo
    updatedFormData[index] = {
      ...updatedFormData[index],
      operationsToFollow: updatedOperations,
    };

    // Establece el nuevo estado
    setFormData(updatedFormData);
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const updatedData = { 
      id: ruteId, 
      updatedRTF: {
        productId: RTF.productId, // Asegúrate de que estás obteniendo el ID correcto
        rawMaterials: formData.map(rawMaterial => ({
          rawMaterialId: rawMaterial.rawMaterialId._id, // _id del material crudo
          cantidadDeCortes: rawMaterial.cantidadDeCortes,
          operationsToFollow: rawMaterial.operationsToFollow.map(op => ({
            operationId: op.operationId._id, // _id de la operación
            notes: op.notes,
          })),
        })),
        state: [
          { toDo: true, doing: false, done: false } // Ajusta el estado según sea necesario
        ]
      },
    };

    console.log(updatedData); // Verifica la estructura aquí
    dispatch(updRTF(updatedData)).then(() => {
      // Despacha para obtener el producto actualizado
      dispatch(getProductById(productId));
    });
    
    handleClose(); // Cierra el componente después de enviar
  };

  // Mostrar un mensaje si está cargando o si hay un error
  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error al cargar la Ruta a Seguir: {error}</p>;
  }

  // Si RTF no tiene datos, mostrar un mensaje
  if (!formData.length) {
    return <p>No hay datos disponibles para esta Ruta a Seguir.</p>;
  }

  return (
    <div className="edit-rute-to-follow">
      <h3>Editar Ruta a Seguir</h3>
      <div className="m-4 p-4 border border-dark">
        {formData.map((rawMaterial, index) => (
          <div className="card m-2" key={rawMaterial.rawMaterialId._id}>
            <h6 className="card-header">
              {`${rawMaterial.rawMaterialId.shape} - ${rawMaterial.rawMaterialId.material} - diámetro externo: ${rawMaterial.rawMaterialId.externalDiameter || 'no'} - diámetro interno: ${rawMaterial.rawMaterialId.internalDiameter || 'no'} - Nº cortes: ${rawMaterial.cantidadDeCortes || 'no'}`}
            </h6>
            <ul className="list-group list-group-flush">
              {rawMaterial.operationsToFollow.map((operation, opIndex) => (
                <li className="list-group-item" key={operation.operationId._id}>
                  <p>Operación: {operation.operationId.name}</p>
                  <label>Notas:</label>
                  <input
                    type="text"
                    value={operation.notes}
                    onChange={(event) => handleNoteChange(event, index, opIndex)}
                    className="form-control"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="text-center mt-4">
          <button type="submit" className="btn btn-success" onClick={handleSubmit}>
            Guardar Cambios
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRuteToFollow;
