import React, { useEffect } from 'react'; // Agrega el import de useEffect
import { useSelector, useDispatch } from 'react-redux';
import { getRM } from '../../../../../../features/Promises/rawMaterial/rawMaterialSlice';

const SearcherRMS = ({ buttonsState, addToArray }) => {
    const dispatch = useDispatch();
    const { rawMaterials, isSuccessRawMaterial, isErrorRawMaterial, messageRawMaterial } = useSelector((state) => state.rawMaterial);

    useEffect(() => {
        dispatch(getRM());
  
    }, []); // Asegúrate de que useEffect tenga la dependencia de []
    useEffect(() => {
     
        console.log(rawMaterials);
    }, [rawMaterials])
    return (
        <div>
            {
                rawMaterials ? (
                    <div>
                        {
                            rawMaterials.map((material) => (
                                <div key={material._id} className="table-container">
                                    <div>
                                        <strong>Tipo</strong> {material.typeMat.TypeMat}
                                    </div>
                                    <div>
                                        <strong>Nombre</strong> {material.material.name}
                                    </div>
                                    <div>
                                        <strong>Diámetro Externo</strong> {material.externalDiameter}
                                    </div>
                                    <div>
                                        <strong>Diámetro Interno</strong> {material.internalDiameter}
                                    </div>
                                    <div>
                                        <strong>Precio por Kg</strong> {material.priceKg}
                                    </div>
                                    <div>
                                        <strong>Peso por Metro</strong> {material.wheightMeter}
                                    </div>
                                    <div>
                                        <strong>Precio por Metro</strong> {material.priceMetro}
                                    </div>
                                    <button onClick={(e) => addToArray(material, e)}>Añadir</button>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        <p>Cargando...</p>
                    </div>
                )
            }
        </div>
    )
}

export default SearcherRMS;
