import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { create } from "../../../features/material/materialSlice";

const CreateMaterial = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ name: '' });

    const handleNameChange = (e) => {
        const { name,value } = e.target;
        setFormData((prevData) => 
       ({ ...prevData,
        name: value }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleCreateMaterial = async (e) => {
        e.preventDefault();
        dispatch(create(formData));
    };

    return (
        <div>
            <h2>Crear Material</h2>
            <form onSubmit={handleCreateMaterial}>
                <label>Nombre del Material:</label>
                <input type="text" value={formData.name} onChange={handleNameChange} />
                <button type='submit'>Crear Material</button>
            </form>
        </div>
    );
};

export default CreateMaterial;
