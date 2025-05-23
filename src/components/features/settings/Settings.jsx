import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuthStore from "../../../store/authStore";
import { useSettings } from "../../../hooks/useSettings";
import "./Settings.css";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

const Settings = () => {
  const userId = useAuthStore((s) => s.user?._id);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const passwordsMatch =
    newPassword.length > 0 && newPassword === verifyPassword;

  const {
    changePasswordMutation: { mutate, isLoading, isSuccess, isError, error },
  } = useSettings(userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    mutate({ currentPassword, newPassword });
  };

  return (
    <main className="settings-overview">
      <div className="settings-header">
        <h2 className="settings-title">Settings</h2>
      </div>

      <div className="settings-form-container">
        <form onSubmit={handleSubmit} className="settings-form">
          {/* CURRENT PASSWORD */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="current-password" className="required">
                Current Password
              </label>

              <div className="input-wrapper">
                <input
                  type="password"
                  id="current-password"
                  name="current-password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* NEW PASSWORD */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="new-password" className="required">
                New Password
              </label>

              <div className="input-wrapper">
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                {passwordsMatch && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="icon-success"
                    aria-label="passwords match"
                  />
                )}
              </div>
            </div>
          </div>

          {/* VERIFY PASSWORD */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="verify-new-password" className="required">
                Verify New Password
              </label>

              <div className="input-wrapper">
                <input
                  type="password"
                  id="verify-new-password"
                  name="verify-new-password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  required
                />

                {verifyPassword.length > 0 &&
                  (passwordsMatch ? (
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="icon-success"
                      aria-label="passwords match"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className="icon-error"
                      aria-label="passwords do not match"
                    />
                  ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading || !passwordsMatch}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>

          {isSuccess && (
            <p className="feedback success">Password updated successfully.</p>
          )}
          {isError && <p className="feedback error">{error.message}</p>}
        </form>
      </div>
    </main>
  );
};

export default Settings;
