import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss'
import Home from "./components/Home/Home";
import CreateOrder from "./components/CreateComponents/CreateOrder/CreateOrder";
import CreateProduct from "./components/CreateComponents/CreateProduct/CreateProduct";
import CreateRawMaterial from "./components/CreateComponents/CreateRawMaterial/CreateRawMaterial";
import CreateOperationToFollow from "./components/CreateComponents/CreateOperationToFollow/CreateOperationToFollow";
import NavBar from "./components/NavBar/NavBar";
import CreateContact from "./components/CreateComponents/CreateContact/CreateContact";
import RuteToFollow from "./components/CreateComponents/CreateProduct/Sections/RuteToFollow/RuteToFollow";
import ContactInd from "./components/ToSee/Contacts/ContactInd/ContactInd";
import Contacts from "./components/ToSee/Contacts/Contacts";
import Operations from "./components/ToSee/Operations/Operations";
import OperationInd from "./components/ToSee/Operations/OperationInd/OperationInd";

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
            <Route path="/create/contact" element={<CreateContact />} />
            <Route path="/ruteToFollow" element={<RuteToFollow />} />
            <Route path="/see/contacts" element={<Contacts />} />
            <Route path="/see/operations" element={<Operations />} />
            <Route path="/contactInd/:id" element={<ContactInd />} />
            <Route path="/operationInd/:id" element={<OperationInd />} />
          </Routes>
        
      </BrowserRouter>
    </>
  )
}

export default App;