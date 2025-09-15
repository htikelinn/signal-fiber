import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Product from "./Components/Product";
import Installation from "./Components/Installation";

export default function App() {
  return (
    <div>
        <BrowserRouter>
          <Navbar />
         <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/products/web" element={<Product />} />
             <Route path="/services/Installination" element={<Installation />}  />
         </Routes>
        </BrowserRouter>
    </div>
  )
}
