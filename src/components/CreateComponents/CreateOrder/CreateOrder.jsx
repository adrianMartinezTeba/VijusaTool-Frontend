import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { create} from "../../../features/Promises/order/orderSlice";
import ProductsSection from './Sections/ProductsSetion/ProductsSection';
const CreateOrder = () => {
  const dispatch = useDispatch();
  const { createOrder,isLoading, isError, message } = useSelector((state) => state.order);
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
useEffect(() => {
  setOrderData(createOrder);
  console.log(orderData);
}, [createOrder]);
  return (
    <div>
      <h2>Crear pedido</h2>
      <div>
        <ProductsSection/>
      </div>
    </div>
  );
};

export default CreateOrder;
