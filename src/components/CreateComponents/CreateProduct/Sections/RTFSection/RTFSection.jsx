import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRTF } from '../../../../../features/Promises/ruteToFollow/ruteToFollowSlice';
import { addToCreateProductState } from '../../../../../features/Promises/product/productSlice';
const RTFSection = () => {
  const [rawMaterialsRTF, setRawMaterialsRTF] = useState([]);
  const [operationsRTF, setOperationsRTF] = useState([]);
  const [rtfData, setRtfData] = useState([]);

  const dispatch = useDispatch();
  const { isSuccess, createProductState } = useSelector((state) => state.product);

  useEffect(() => {
    setRawMaterialsRTF(createProductState.rawMaterials);
    setRtfData(createProductState.rawMaterials.map(rawMaterial => ({
      rawMaterialId: rawMaterial.rawMaterialId,
      cantidadDeCortes: rawMaterial.cantidadDeCortes,
      operationsToFollow: []
    })));
  }, [createProductState.rawMaterials]);

  useEffect(() => {
    setOperationsRTF(createProductState.operationToFollow);
  }, [createProductState.operationToFollow]);

  useEffect(() => {
    console.log(rawMaterialsRTF);
    console.log(operationsRTF);
  }, [rawMaterialsRTF, operationsRTF]);

  const handleAddOTFToRM = (operation, index) => {
    const updatedRawMaterials = [...rtfData];
    updatedRawMaterials[index].operationsToFollow.push({
      operationId: operation.operationId,
      name: operation.name,  // Incluyendo el nombre de la operación
      notes: ''
    });
    setRtfData(updatedRawMaterials);
  };

  const handleNoteChange = (event, rmIndex, opIndex) => {
    const updatedRawMaterials = [...rtfData];
    updatedRawMaterials[rmIndex].operationsToFollow[opIndex].notes = event.target.value;
    setRtfData(updatedRawMaterials);
  };

  const handleRemoveOperation = (rmIndex, opIndex) => {
    const updatedRawMaterials = [...rtfData];
    updatedRawMaterials[rmIndex].operationsToFollow.splice(opIndex, 1);
    setRtfData(updatedRawMaterials);
  };

  const handleCreate = async () => {
    const formattedData = {
        rawMaterials: rtfData.map(rawMaterial => ({
            rawMaterialId: rawMaterial.rawMaterialId,
            cantidadDeCortes: rawMaterial.cantidadDeCortes,
            operationsToFollow: rawMaterial.operationsToFollow.map(operation => ({
                operationId: operation.operationId,
                notes: operation.notes
            }))
        }))
    };
    
    // Dispatch para crear la ruta
    const ruteResponse = await dispatch(createRTF(formattedData));

    // Verifica si la ruta se creó con éxito y obtiene el ID
    if (ruteResponse.payload && ruteResponse.payload.ruteToFollowId) {
        // Almacenar el ID de la ruta creada en el estado del producto
        dispatch(addToCreateProductState({ functionName: 'setRuteToFollow', data: ruteResponse.payload.ruteToFollowId }));
    }
};


  useEffect(() => {
    console.log(rtfData);
  }, [rtfData]);

  return (
    <div className="container-md--rtf mt-3 border p-3 border-dark">
      <h3>Ruta a seguir</h3>
      {
        createProductState.rawMaterials.length > 0 ? (
          <div className='container-md--rawMaterialsRTF card'>
            <h5 className='card-header'>Materias primas</h5>
            {
              rawMaterialsRTF.map((rawMaterial, index) => (
                <div className='card p-2' key={index}>
                  <div className='card-header'>
                    {`${rawMaterial.shape} - ${rawMaterial.material} - diámetro externo: ${rawMaterial.externalDiameter || 'no' } - diámetro interno: ${rawMaterial.internalDiameter || 'no' }`}
                  </div>
                  <div className='card-body'>
                    <div className='container'>
                      <div className='card-text'>Seleccione las operaciones a realizar sobre esta materia prima</div>
                      <div className='d-flex justify-content-start flex-wrap'>
                        {
                          operationsRTF.map((operation, opIndex) => (
                            <div className='m-1' key={opIndex}>
                              <div onClick={() => handleAddOTFToRM(operation, index)} className='btn btn-info mt-2'>{operation.name}</div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className='container'>
                      {
                        rtfData[index]?.operationsToFollow.map((operation, opIndex) => (
                          <div key={opIndex} className='card mt-2'>
                            <div className='card-body'>
                              <div className='card-text'>{operation.name}</div>
                              <input 
                                type="text" 
                                className='form-control mt-2' 
                                value={operation.notes}
                                onChange={(event) => handleNoteChange(event, index, opIndex)} 
                                placeholder='Notas' 
                              />
                              <button 
                                onClick={() => handleRemoveOperation(index, opIndex)} 
                                className='btn btn-danger mt-2'>
                                Eliminar
                              </button>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              ))
            }
            <div className='container m-2'>
              <button onClick={handleCreate} className='btn btn-primary m-2'>Crear</button>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default RTFSection;
