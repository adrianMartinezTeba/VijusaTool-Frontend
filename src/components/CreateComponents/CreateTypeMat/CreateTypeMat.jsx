import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { create } from "../../../features/typeMat/typeMatSlice"; // Asegúrate de importar el slice correcto

const CreateTypeMat = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ TypeMat: '' });

    const handleTypeMatChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleCreateTypeMat = async (e) => {
        e.preventDefault();
        dispatch(create(formData));
    };

    return (
        <div>
            <h2>Crear Tipo de Material</h2>
            <form onSubmit={handleCreateTypeMat}>
                <label>Nombre del Tipo de Material:</label>
                <input type="text" name="TypeMat" value={formData.TypeMat} onChange={handleTypeMatChange} />
                <button type='submit'>Crear Tipo de Material</button>
            </form>
        </div>
    );
};

export default CreateTypeMat;
