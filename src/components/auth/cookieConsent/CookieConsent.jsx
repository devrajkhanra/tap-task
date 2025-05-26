import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Detect current page
import "./CookieConsent.css";

const CookieConsent = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(true); // Default to hidden
  const location = useLocation(); // Get current route

  useEffect(() => {
    const hasCookies = document.cookie.length > 0;
    const isDashboard = location.pathname === "/"; // Adjust route based on your setup

    if (isDashboard && !hasCookies) {
      setCookiesAccepted(false); // Show modal only if cookies are missing in dashboard
    }
  }, [location]);

  const handleAcceptCookies = () => {
    alert("Please enable third-party cookies in your browser settings.");
    window.location.reload(); // Reload to recheck cookies
  };

  if (cookiesAccepted) {
    return null; // Hide modal if cookies exist or user is not on dashboard
  }

  return (
    <div className="cookie-modal">
      <h2>Cookies Required</h2>
      <p>
        Third-party cookies are required for authentication in the dashboard.
      </p>
      <button className="cookie-btn" onClick={handleAcceptCookies}>
        I Have Enabled Cookies
      </button>
    </div>
  );
};

export default CookieConsent;
