import { configureStore } from '@reduxjs/toolkit'
import contact from '../features/Promises/contact/contactSlice'
import operationToFollow  from '../features/Promises/operationToFollow/operationToFollowSlice'
import order from '../features/Promises/order/orderSlice'
import product from '../features/Promises/product/productSlice'
import rawMaterial from '../features/Promises/rawMaterial/rawMaterialSlice'
import material from '../features/Promises/material/materialSlice'
import shape from '../features/Promises/shape/shapeSlice'
export const store = configureStore({
  reducer: {
    contact,
    operationToFollow,
    order,
    product,
    rawMaterial,
    material,
    shape
  },
})