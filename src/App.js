import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import RegistrationPage from "./components/RegistrationPage";
import UserPage from "./components/UserPage";
import OwnerPage from "./components/OwnerPage";
import DecorationPage from "./components/DecorationPage"; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/DecorationPage" element={<DecorationPage />} /> 
    </Routes>
  );
}
