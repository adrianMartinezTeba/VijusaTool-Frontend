import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { shapeToCreate } from "../../../features/Promises/shape/shapeSlice"; // Asegúrate de importar el slice correcto
import CreateShapeDispatch from '../../Buttons/CreateShapeDispatch/CreateShapeDispatch';

const CreateShape = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ nameShape: '' }); // Inicializar el estado con un objeto

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        
    };
    useEffect(() => {
        dispatch(shapeToCreate(formData));
    }, [formData]);
    return (
        <div>
            <h2>Crear forma del material</h2>
            <form >
                <label>Nombre de la forma del material:</label>
                <input
                    type="text"
                    name="nameShape"
                    value={formData.nameShape}
                    onChange={handleInputChange}
                />
            </form>
              <div>
                <CreateShapeDispatch />
              </div>
        </div>
    );
};

export default CreateShape;
