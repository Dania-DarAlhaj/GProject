// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ForgetPasswordPage from "./components/ForgetPasswordPage";
import RegistrationPage from "./components/RegistrationPage";
import UserPage from "./components/UserPage";
import OwnerPage from "./components/OwnerPage";

import DecorationPage from "./components/DecorationPage"; 
import CheckEmail from "./components/CheckEmail";
 import VerifyPage from "./components/VerifyPage";
 import VenuesPage from "./components/VenuesPage";
import HallRegestration from "./components/HallRegestration";

import AdminPage from "./components/AdminPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/owner" element={<OwnerPage />} />
      <Route path="/decoration" element={<DecorationPage />} /> 
      <Route path="/check-email" element={<CheckEmail />} />
      <Route path="/VerifyPage" element={<VerifyPage />} /> 
      <Route path="/VenuesPage" element={<VenuesPage />} /> 

      <Route path="/AdminPage" element={<AdminPage />} /> 
      <Route path="/HallRegestration" element={<HallRegestration />} /> 
    </Routes>
  );
}
