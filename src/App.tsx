import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Product from "./Components/Product";
import Installation from "./Components/Installation";
import UserTable from "./Components/UserTable";
import Customer from "./Components/Customer";
import LocationList from "./Components/LocationList";
import ComplainInfoSetup from "./Components/ComplainInfoSetup";
import PointList from "./Components/PointList";
import Login from "./Components/Login";
import { AuthProvider, useAuth } from "./Components/AuthContext";
import type { JSX } from "react";
import SignUpForm from "./Components/SignUpForm";
import MainCableMap from "./Components/MainCableMap";

// ProtectedRoute wrapper
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/products/web" element={<ProtectedRoute element={<Product />} />} />
          <Route path="/services/Installination" element={<ProtectedRoute element={<Installation />} />} />
          <Route path="/user-list" element={<ProtectedRoute element={<UserTable />} />} />
          <Route path="/customer-list" element={<ProtectedRoute element={<Customer />} />} />
          <Route path="/location-list" element={<ProtectedRoute element={<LocationList />} />} />
          <Route path="/location-info-setup" element={<ProtectedRoute element={<ComplainInfoSetup />} />} />
          <Route path="/point-list" element={<ProtectedRoute element={<PointList />} />} />
          <Route path="/map" element={<ProtectedRoute element={<MainCableMap />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
