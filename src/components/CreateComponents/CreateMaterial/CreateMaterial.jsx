import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { materialToCreate } from "../../../features/Promises/material/materialSlice";
import CreateMaterialDispatch from '../../Buttons/CreateMaterialDispatch/CreateMaterialDispatch';
const CreateMaterial = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ nameMaterial: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        
    };
    useEffect(() => {
        console.log(formData);
        dispatch(materialToCreate(formData));
    }, [formData]);
    return (
        <div>
            <h2>Crear Material</h2>
            <form>
                <label>Nombre del Material(hierro,bronce,etc):</label>
                <input type="text" name="nameMaterial" value={formData.nameMaterial} onChange={handleInputChange} />
            </form>
            <div>
                <CreateMaterialDispatch />
            </div>
        </div>
    );
};

export default CreateMaterial;
