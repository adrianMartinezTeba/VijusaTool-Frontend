import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { create} from "../../../features/order/orderSlice";
const CreateOrder = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState({
    products: [],
    description: '',
    customerId: '', // Debe ser el ID de un cliente existente
    customerName: '', // Puedes llenar esto en el backend a partir del customerId
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(create(orderData));
    // Aquí puedes enviar los datos del formulario al servidor
  };

  return (
    <div>
      <h2>Crear pedido</h2>
      <form onSubmit={handleSubmit}>
        {/* Agrega campos para seleccionar productos y otros detalles de la orden */}
        <div className="form-group">
          <label htmlFor="description">Descripción de la Orden:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={orderData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerId">ID del Cliente:</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={orderData.customerId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={orderData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Crear Orden</button>
      </form>
    </div>
  );
};

export default CreateOrder;
