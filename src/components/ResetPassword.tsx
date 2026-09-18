import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const [showalert, setShowAlert] = useState(false);
const[alertMessage,setAlertMessage]= useState("")

useEffect(() => {
  if (!token) {
    navigate("/forgot-password", { replace: true });
  }

  
}, [token, navigate]);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if(!token){
    return;
  }

 if (password !== confirmPassword) {
  setAlertMessage("Password does not match");
  setShowAlert(true);
  return;
}

  setShowAlert(false);

  try {
     const response = await axios.patch(
      "http://localhost:5047/api/Perfume2Users/reset-password",
      {
        Token: token,
        NewPassword: password,
      }
    );
    console.log(response.data);
    

    setShowSuccess(true);
  } catch (error) {
  setAlertMessage("Link expired. Please try again.");
  setShowAlert(true);
  console.error(error);
}
  };

  return (
    <div className="noir-reset-page">
      <style>{`
        * {
          box-sizing: border-box;
        }
.reset-error-alert {
  width: 100%;
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: -8px;
  margin-bottom: 18px;
  padding: 10px 12px;

  background: #17100f;
  border: 1px solid #4b2725;
  border-left: 3px solid #d96c6c;

  text-align: left;
  animation: resetErrorShow 0.25s ease;
}

.reset-error-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d96c6c;
  border-radius: 50%;

  color: #d96c6c;
  font-size: 12px;
  font-weight: bold;
}

.reset-error-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reset-error-content strong {
  color: #d96c6c;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.reset-error-content span {
  color: #888;
  font-size: 10px;
  line-height: 1.5;
}

.reset-error-close {
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  color: #555;
  cursor: pointer;
}

.reset-error-close:hover {
  color: #d96c6c;
}

.reset-error-close svg {
  font-size: 16px;
}

@keyframes resetErrorShow {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
        .noir-reset-page {
          min-height: 100vh;
          background: #080808;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 25px;
          position: relative;
          overflow: hidden;
          font-family: Arial, sans-serif;
        }

        .noir-reset-page::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          border: 1px solid rgba(197, 164, 109, 0.07);
          border-radius: 50%;
          top: -430px;
          right: -300px;
        }

        .noir-reset-page::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(197, 164, 109, 0.05);
          border-radius: 50%;
          bottom: -350px;
          left: -280px;
        }

        .noir-reset-card {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 2;
          padding: 55px 60px 50px;
          background: #0c0c0c;
          border: 1px solid #242424;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.8);
        }

        .reset-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 50px;
        }

        .noir-logo {
          font-family: Georgia, serif;
          font-size: 25px;
          letter-spacing: 7px;
          color: #fff;
        }

        .noir-logo span {
          color: #c5a46d;
        }

        .close-reset {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #292929;
          background: transparent;
          color: #666;
          cursor: pointer;
          transition: 0.3s;
        }
          .success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.success-modal {
  width: 100%;
  max-width: 420px;
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  padding: 45px 35px;
  text-align: center;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.9);
  animation: successPopup 0.35s ease;
}

@keyframes successPopup {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.success-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 25px;
  border: 1px solid #c5a46d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c5a46d;
  font-size: 30px;
}

.success-label {
  color: #c5a46d;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 3px;
  margin-bottom: 12px;
}

.success-modal h2 {
  color: #fff;
  font-family: Georgia, serif;
  font-size: 30px;
  font-weight: normal;
  margin: 0 0 12px;
}

.success-modal p {
  color: #777;
  font-size: 11px;
  line-height: 1.8;
  margin: 0 auto 30px;
  max-width: 300px;
}

.success-login-btn {
  width: 100%;
  height: 48px;
  border: 1px solid #c5a46d;
  background: #c5a46d;
  color: #080808;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;
}

.success-login-btn:hover {
  background: #dfc28b;
  border-color: #dfc28b;
}

        .close-reset:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: rotate(90deg);
        }

        .close-reset svg {
          font-size: 17px;
        }

        .reset-intro {
          text-align: center;
          margin-bottom: 45px;
        }

        .reset-intro small {
          display: block;
          color: #c5a46d;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 17px;
        }

        .reset-intro h1 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 38px;
          letter-spacing: 1px;
          margin: 0;
        }

        .reset-intro p {
          color: #666;
          font-size: 10px;
          line-height: 1.8;
          margin: 13px auto 0;
          max-width: 300px;
        }

        .reset-email {
          color: #c5a46d;
          word-break: break-word;
        }

        .reset-field {
          position: relative;
          margin-bottom: 28px;
        }

        .reset-field label {
          display: block;
          color: #777;
          font-size: 8px;
          letter-spacing: 2.5px;
          margin-bottom: 9px;
        }

        .reset-field-row {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #2c2c2c;
          transition: 0.3s;
        }

        .reset-field-row:focus-within {
          border-bottom-color: #c5a46d;
        }

        .reset-field-icon {
          color: #555;
          font-size: 19px !important;
          margin-right: 12px;
          transition: 0.3s;
        }

        .reset-field-row:focus-within .reset-field-icon {
          color: #c5a46d;
        }

        .reset-field input {
          width: 100%;
          height: 48px;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 12px;
          padding: 0;
          padding-right: 42px;
        }

        .reset-field input::placeholder {
          color: #3f3f3f;
        }

        .password-toggle {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #555;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .password-toggle:hover {
          color: #c5a46d;
        }

        .password-toggle svg {
          font-size: 18px;
        }

        .reset-button {
          width: 100%;
          height: 53px;
          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #080808;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 10px;
        }

        .reset-button:hover {
          background: #dfc28b;
          border-color: #dfc28b;
        }

        .reset-button svg {
          font-size: 17px;
          transition: 0.3s;
        }

        .reset-button:hover svg {
          transform: translateX(5px);
        }

        .back-login {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
        }

        .back-login button {
          border: none;
          background: transparent;
          color: #666;
          cursor: pointer;
          font-size: 8px;
          letter-spacing: 1.5px;
          transition: 0.3s;
        }

        .back-login button:hover {
          color: #c5a46d;
        }

        .reset-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 35px 0;
          color: #333;
          font-size: 7px;
          letter-spacing: 3px;
        }

        .reset-divider::before,
        .reset-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #222;
        }

        .reset-security {
          margin-top: 35px;
          padding-top: 22px;
          border-top: 1px solid #1d1d1d;
          text-align: center;
          color: #383838;
          font-size: 7px;
          letter-spacing: 1.5px;
          line-height: 1.8;
        }

        @media (max-width: 576px) {
          .noir-reset-page {
            padding: 15px;
          }

          .noir-reset-card {
            padding: 35px 25px;
          }

          .reset-top {
            margin-bottom: 40px;
          }

          .reset-intro h1 {
            font-size: 32px;
          }

          .reset-intro {
            margin-bottom: 38px;
          }
        }
      `}</style>

      <div className="noir-reset-card">

        {/* TOP */}
        <div className="reset-top">
          <div className="noir-logo">
            NOIR<span>.</span>
          </div>

          <button
            type="button"
            className="close-reset"
            onClick={() => navigate("/")}
          >
            <CloseIcon />
          </button>
        </div>

        {/* HEADER */}
        <div className="reset-intro">
          <small>PASSWORD RECOVERY</small>

          <h1>Reset Password</h1>

          
        </div>

        {/* FORM */}
        <form onSubmit={handlesubmit}>

          {/* NEW PASSWORD */}
          <div className="reset-field">
            <label>NEW PASSWORD</label>

            <div className="reset-field-row">
              <LockOutlinedIcon className="reset-field-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>{ setPassword(e.target.value);
                    setShowAlert(false);

                }}
                
                required
                minLength={6}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="reset-field">
            <label>CONFIRM PASSWORD</label>

            <div className="reset-field-row">
              <LockOutlinedIcon className="reset-field-icon" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                 onChange={(e) =>{ setConfirmPassword(e.target.value);
                    setShowAlert(false);

                }}
                
                required
                minLength={6}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </button>
            </div>
          </div>
         {showalert && (
  <div className="reset-error-alert">
    <div className="reset-error-icon">!</div>

    <div className="reset-error-content">
      <strong>Password Error</strong>
      <span>{alertMessage}</span>
    </div>

    <button
      type="button"
      className="reset-error-close"
      onClick={() => setShowAlert(false)}
    >
      <CloseIcon />
    </button>
  </div>
)}

          {/* RESET BUTTON */}
          <button type="submit" className="reset-button">
            RESET PASSWORD
            <ArrowForwardIcon />
          </button>
        </form>

        {/* DIVIDER */}
        <div className="reset-divider">OR</div>

        {/* BACK TO LOGIN */}
        <div className="back-login">
          <button
            type="button"
            onClick={() => navigate("/login",{replace:true})}
          >
            BACK TO SIGN IN
          </button>
        </div>

        {/* SECURITY */}
        <div className="reset-security">
          FOR YOUR SECURITY, USE A STRONG AND UNIQUE PASSWORD
          <br />
          NEVER SHARE YOUR PASSWORD WITH ANYONE.
        </div>
      </div>
      {showSuccess && (
  <div className="success-overlay">
    <div className="success-modal">

      <div className="success-icon">
        ✓
      </div>

      <div className="success-label">
        PASSWORD UPDATED
      </div>

      <h2>Password Changed</h2>

      <p>
        Your password has been successfully updated.
        You can now sign in using your new password.
      </p>

      <button
        className="success-login-btn"
        onClick={() => navigate("/login",{replace: true })}
      >
        CONTINUE TO SIGN IN
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default ResetPassword;
