import React, { useState } from "react";
import useAuthStore from "../../../store/authStore";
import "./Logout.css";

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout, loading, error } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    onClose(); // Close the modal after logout
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p style={{ marginBottom: "10px" }}>
          Are you sure you want to log out?
        </p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          onClick={handleLogout}
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
        <button onClick={onClose} className="cancel-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
