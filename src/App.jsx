import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import Layout from "./components/outline/layout/Layout";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import Logout from "./components/auth/logout/Logout";
import useAuthStore from "./store/authStore"; // Zustand store

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const [activeView, setActiveView] = useState("overview");
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Zustand instead of Redux
  }, [checkAuth]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout activeView={activeView} onNavigate={setActiveView} />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
