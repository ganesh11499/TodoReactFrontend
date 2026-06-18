import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";




const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;