import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss'
import Home from "./components/Home/Home";
import CreateOrder from "./components/CreateComponents/CreateOrder/CreateOrder";
import CreateProduct from "./components/CreateComponents/CreateProduct/CreateProduct";
import CreateRawMaterial from "./components/CreateComponents/CreateRawMaterial/CreateRawMaterial";
import CreateOperationToFollow from "./components/CreateComponents/CreateOperationToFollow/CreateOperationToFollow";
import NavBar from "./components/NavBar/NavBar";
import CreateMaterial from "./components/CreateComponents/CreateMaterial/CreateMaterial";
import CreateTypeMat from "./components/CreateComponents/CreateTypeMat/CreateTypeMat";
import CreateContact from "./components/CreateComponents/CreateContact/CreateContact";

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create/order" element={<CreateOrder />} />
            <Route path="/create/product" element={<CreateProduct />} />
            <Route path="/create/rawMaterial" element={<CreateRawMaterial />} />
            <Route path="/create/operationToFollow" element={<CreateOperationToFollow />} />
            <Route path="/create/material" element={<CreateMaterial />} />
            <Route path="/create/typeMat" element={<CreateTypeMat />} />
            <Route path="/create/contact" element={<CreateContact />} />
          </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;