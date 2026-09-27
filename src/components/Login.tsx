import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [verifyalertbutton, setverifyalertbutton] = useState(false);
  const [formdata, setformdata] = useState<FormData>({
    email: "",
    password: "",
  });

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5047/api/Perfume2Users/login",
        {
          email: formdata.email,
          password: formdata.password,
        },
      );

      // Get JWT token from API
      const token = response.data.token;
      // Save token in browser
      localStorage.setItem("token", token);

      alert("Login successful");

      // Go to home page
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setverifyalertbutton(true);
        // alert("Invalid email or password");
      } else {
        console.error(error);
        alert("Not found.");
      }
    }
  };

  return (
    <div className="noir-login-page">
      <style>{`
        * {
          box-sizing: border-box;
        }
          /* LOGIN ERROR ALERT */

.login-error-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 58px;
  margin-top: -8px;
  margin-bottom: 22px;
  padding: 10px 12px;
  background: #17100f;
  border: 1px solid #5a2926;
  border-left: 3px solid #d96c6c;
  animation: loginAlert .25s ease;
}

.login-error-icon {
  width: 25px;
  height: 25px;
  min-width: 25px;
  border: 1px solid #d96c6c;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d96c6c;
  font-size: 13px;
  font-weight: bold;
}

.login-error-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.login-error-content strong {
  color: #e08a8a;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.login-error-content span {
  color: #8a7775;
  font-size: 9px;
  line-height: 1.5;
}

.login-error-close {
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  background: transparent;
  color: #664f4d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: .3s;
}

.login-error-close:hover {
  color: #d96c6c;
}

.login-error-close svg {
  font-size: 16px;
}

@keyframes loginAlert {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

        .noir-login-page {
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

        /* BACKGROUND DETAILS */

        .noir-login-page::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          border: 1px solid rgba(197, 164, 109, 0.07);
          border-radius: 50%;
          top: -430px;
          right: -300px;
        }

        .noir-login-page::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(197, 164, 109, 0.05);
          border-radius: 50%;
          bottom: -350px;
          left: -280px;
        }

        /* MAIN CARD */

        .noir-login-card {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 2;
          padding: 55px 60px 50px;
          background: #0c0c0c;
          border: 1px solid #242424;
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.8);
        }

        /* TOP */

        .login-top {
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

        .close-login {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #292929;
          background: transparent;
          color: #666;
          cursor: pointer;
          transition: .3s;
        }

        .close-login:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: rotate(90deg);
        }

        .close-login svg {
          font-size: 17px;
        }

        /* HEADER */

        .login-intro {
          text-align: center;
          margin-bottom: 45px;
        }

        .login-intro small {
          display: block;
          color: #c5a46d;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 17px;
        }

        .login-intro h1 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 38px;
          letter-spacing: 1px;
          margin: 0;
        }

        .login-intro p {
          color: #666;
          font-size: 10px;
          line-height: 1.8;
          margin: 13px auto 0;
          max-width: 280px;
        }

        /* FORM */

        .noir-field {
          position: relative;
          margin-bottom: 28px;
        }

        .noir-field label {
          display: block;
          color: #777;
          font-size: 8px;
          letter-spacing: 2.5px;
          margin-bottom: 9px;
        }

        .noir-field-row {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #2c2c2c;
          transition: .3s;
        }

        .noir-field-row:focus-within {
          border-bottom-color: #c5a46d;
        }

        .noir-field-icon {
          color: #555;
          font-size: 19px !important;
          margin-right: 12px;
          transition: .3s;
        }

        .noir-field-row:focus-within .noir-field-icon {
          color: #c5a46d;
        }

        .noir-field input {
          width: 100%;
          height: 48px;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 12px;
          padding: 0;
        }

        .noir-field input::placeholder {
          color: #3f3f3f;
        }

        .password-toggle {
          border: none;
          background: transparent;
          color: #555;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          transition: .3s;
        }

        .password-toggle:hover {
          color: #c5a46d;
        }

        .password-toggle svg {
          font-size: 18px;
        }

        /* OPTIONS */

        .login-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 4px 0 30px;
        }

        .remember {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #555;
          font-size: 9px;
          cursor: pointer;
        }

        .remember input {
          width: 13px;
          height: 13px;
          accent-color: #c5a46d;
          cursor: pointer;
        }

        .forgot-password {
          color: #c5a46d;
          font-size: 8px;
          letter-spacing: 1.5px;
          text-decoration: none;
          transition: .3s;
        }

        .forgot-password:hover {
          color: #e2c994;
        }

        /* BUTTON */

        .noir-login-button {
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
          transition: .3s;
        }

        .noir-login-button:hover {
          background: #dfc28b;
          border-color: #dfc28b;
        }

        .noir-login-button svg {
          font-size: 17px;
          transition: .3s;
        }

        .noir-login-button:hover svg {
          transform: translateX(5px);
        }

        /* DIVIDER */

        .login-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 35px 0;
          color: #333;
          font-size: 7px;
          letter-spacing: 3px;
        }

        .login-divider::before,
        .login-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #222;
        }

        /* REGISTER */

        .create-account {
          text-align: center;
          color: #555;
          font-size: 10px;
        }

        .create-account a {
          color: #c5a46d;
          text-decoration: none;
          margin-left: 6px;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .create-account a:hover {
          color: #e0c38a;
        }

        /* FOOTER */

        .login-footer {
          margin-top: 35px;
          padding-top: 22px;
          border-top: 1px solid #1d1d1d;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .login-footer span {
          color: #333;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .login-footer span:nth-child(2) {
          color: #c5a46d;
        }

        /* MOBILE */

        @media (max-width: 576px) {
          .noir-login-page {
            padding: 15px;
          }

          .noir-login-card {
            padding: 35px 25px;
          }

          .login-top {
            margin-bottom: 40px;
          }

          .login-intro h1 {
            font-size: 32px;
          }

          .login-intro {
            margin-bottom: 38px;
          }
        }
      `}</style>

      <div className="noir-login-card">
        {/* TOP */}

        <div className="login-top">
          <div className="noir-logo">
            NOIR<span>.</span>
          </div>

          <button className="close-login" onClick={() => navigate("/")}>
            <CloseIcon />
          </button>
        </div>

        {/* HEADER */}

        <div className="login-intro">
          <small>PRIVATE ACCESS</small>

          <h1>Welcome Back</h1>

          <p>Sign in to continue your journey with NOIR.</p>
        </div>
        <form onSubmit={handlesubmit}>
          {/* EMAIL */}

          <div className="noir-field">
            <label>EMAIL ADDRESS</label>

            <div className="noir-field-row">
              <PersonOutlineOutlinedIcon className="noir-field-icon" />

              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={formdata.email}
                onChange={(e) => {
                  setformdata({ ...formdata, email: e.target.value });
                  setverifyalertbutton(false);
                }}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}

          <div className="noir-field">
            <label>PASSWORD</label>

            <div className="noir-field-row">
              <LockOutlinedIcon className="noir-field-icon" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                name="password"
                value={formdata.password}
                onChange={(e) => {
                  setformdata({ ...formdata, password: e.target.value });
                  setverifyalertbutton(false);
                }}
                required
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
          {verifyalertbutton && (
            <div className="login-error-alert">
              <div className="login-error-icon">!</div>

              <div className="login-error-content">
                <strong>Login Failed</strong>
                <span>Invalid email or password. Please try again.</span>
              </div>

              <button
                type="button"
                className="login-error-close"
                onClick={() => setverifyalertbutton(false)}
              >
                <CloseIcon />
              </button>
            </div>
          )}

          {/* OPTIONS */}

          <div className="login-options">
            <label className="remember"></label>

            <a href="/forgot-password" className="forgot-password">
              FORGOT PASSWORD?
            </a>
          </div>

          {/* LOGIN BUTTON */}

          <button type="submit" className="noir-login-button">
            SIGN IN
            <ArrowForwardIcon />
          </button>
        </form>

        {/* DIVIDER */}

        <div className="login-divider">OR</div>

        {/* CREATE ACCOUNT */}

        <div className="create-account">
          Don't have an account?
          <a href="/register">CREATE ACCOUNT</a>
        </div>

        {/* FOOTER */}

        <div className="login-footer">
          <span>NOIR</span>

          <span>PRIVATE</span>

          <span>COLLECTION</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
