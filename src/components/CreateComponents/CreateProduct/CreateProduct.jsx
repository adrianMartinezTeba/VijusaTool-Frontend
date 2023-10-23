import React, { useState } from 'react';

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    numModel: 0,
    customerId: '', // Puedes ajustar el valor inicial según tus necesidades
    sections: [
      {
        name: '',
        items: [
          {
            rawMaterial: '',
            tamañoDelCorte: { value: 0, unitMeasurement: '' },
            precioDelCorte: { value: 0, unitMeasurement: '' },
            cantidadDeCortes: 0,
            precioTotalSobreEsaMateriaPrima: 0,
          },
          {
            operationId: '',
            notes: '',
            expectedTime: '',
            priceOperation: 0,
          },
        ],
      },
    ],
    priceTotal: 0,
    notes: '',
  });
  const [operationData, setOperationData] = useState({
    
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor
    // Puedes realizar una solicitud HTTP (por ejemplo, utilizando fetch o Axios) para enviar los datos al servidor.
    // Por simplicidad, mostraremos los datos en la consola.
    console.log(productData);
  };

  return (
    <div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Número de Modelo:</label>
          <input
            type="number"
            name="numModel"
            value={productData.numModel}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>ID del Cliente:</label>
          <input
            type="text"
            name="customerId"
            value={productData.customerId}
            onChange={handleInputChange}
          />
        </div>
        {/* Agregar secciones y campos según sea necesario */}
        <div>
          <h3>Materias primas:</h3>
          <div>
            <button>Crear</button>
            <button>Buscar</button>
          </div>
        </div>
        <div>
          <h3>Operaciones a seguir:</h3>
          <div>
            <button>Crear</button>
            <button>Buscar</button>
          </div>
        </div>
        <div>
          <label>Precio Total:</label>
          <input
            type="number"
            name="priceTotal"
            value={productData.priceTotal}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Notas:</label>
          <textarea
            name="notes"
            value={productData.notes}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
