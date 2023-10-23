import { configureStore } from '@reduxjs/toolkit'
import contact from '../features/contact/contactSlice'
import operationToFollow  from '../features/operationToFollow/operationToFollowSlice'
import order from '../features/order/orderSlice'
import product from '../features/product/productSlice'
import rawMaterial from '../features/rawMaterial/rawMaterialSlice'
import material from '../features/material/materialSlice'
import typeMat from '../features/typeMat/typeMatSlice'
export const store = configureStore({
  reducer: {
    contact,
    operationToFollow,
    order,
    product,
    rawMaterial,
    material,
    typeMat
  },
})