import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import LogoutModal from "../../auth/logout/Logout";
import useAuthStore from "../../../store/authStore";
import { faHamburger } from "@fortawesome/free-solid-svg-icons";
const Header = ({ onToggleSidebar }) => {
  const firstName = useAuthStore((state) => state.user.firstName);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (firstName) {
      setUsername(firstName || "");
    }
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="toggle-sidebar" onClick={onToggleSidebar}>
          <FontAwesomeIcon icon={faHamburger} size="2xl" color="#3498db" />
        </button>
        <h1 className="header-logo">TapTask</h1>
      </div>

      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="search" placeholder="Search..." className="search-input" />
      </div>

      <div className="header-right">
        <div className="header-actions">
          <button className="icon-button">
            <FontAwesomeIcon icon={faBell} />
          </button>
          {username && <p>{username}</p>}
          <div className="user-profile">
            <button
              className="profile-button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FontAwesomeIcon icon={faUser} />
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="dropdown-item"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;
