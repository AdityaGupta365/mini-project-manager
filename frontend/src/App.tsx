import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route: send to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
