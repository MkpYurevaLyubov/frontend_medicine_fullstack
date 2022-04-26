import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./pages/Registrashion";
import AuthorizationPage from "./pages/Authorization";
import MainPage from "./pages/Main";
import "./app.scss";

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/authorization" element={<AuthorizationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<Navigate to="/authorization" />} />
      </Routes>
    </div>
  );
};

export default App;
