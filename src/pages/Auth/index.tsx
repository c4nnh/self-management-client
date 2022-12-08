import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants";
import { useAuthStore } from "../../stores";
import { Login } from "./Login";
import { Register } from "./Register";

export const Auth: React.FC = () => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
      <Route path={ROUTES.AUTH.REGISTER} element={<Register />} />
      <Route path="" element={<Navigate to={ROUTES.AUTH.LOGIN} />} />
    </Routes>
  );
};
