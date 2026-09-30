import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
interface RegisterFormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formdata, setformdata] = useState<RegisterFormData>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formdata.password !== formdata.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    
    try {
      const response = await axios.post(
        "https://noirperfume-api.runasp.net/api/Perfume2Users/AddUser",
          {
        name: formdata.fullname,
        email: formdata.email,
        password: formdata.password,
      },
      );

      console.log(response.data);
      alert("User registered successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Please check your email and password");
    }
    
   
  };
  return (
    <div className="noir-register-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .noir-register-page {
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

        /* BACKGROUND */

        .noir-register-page::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          border: 1px solid rgba(197, 164, 109, 0.07);
          border-radius: 50%;
          top: -430px;
          right: -300px;
        }

        .noir-register-page::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(197, 164, 109, 0.05);
          border-radius: 50%;
          bottom: -350px;
          left: -280px;
        }

        /* CARD */

        .noir-register-card {
          width: 100%;
          max-width: 520px;
          position: relative;
          z-index: 2;
          padding: 48px 60px 42px;
          background: #0c0c0c;
          border: 1px solid #242424;
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.8);
        }

        /* TOP */

        .register-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 38px;
        }

        .noir-logo {
          font-family: Georgia, serif;
          font-size:40px;
          letter-spacing: 7px;
          color: #fff;
        }

        .noir-logo span {
          color: #c5a46d;
        }

        .close-register {
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

        .close-register:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: rotate(90deg);
        }

        .close-register svg {
          font-size: 17px;
        }

        /* HEADER */

        .register-intro {
          text-align: center;
          margin-bottom: 35px;
        }

        .register-intro small {
          display: block;
          color: #c5a46d;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 15px;
        }

        .register-intro h1 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 38px;
          letter-spacing: 1px;
          margin: 0;
        }

        .register-intro p {
          color: #666;
          font-size: 10px;
          line-height: 1.8;
          margin: 12px auto 0;
          max-width: 300px;
        }

        /* FORM */

        .noir-field {
          position: relative;
          margin-bottom: 22px;
        }

        .noir-field label {
          display: block;
          color: #777;
          font-size: 8px;
          letter-spacing: 2.5px;
          margin-bottom: 8px;
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
          height: 45px;
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

        /* PASSWORD */

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

        /* TERMS */

        .register-terms {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #555;
          font-size: 9px;
          line-height: 1.6;
          margin: 5px 0 25px;
        }

        .register-terms input {
          width: 13px;
          height: 13px;
          margin-top: 2px;
          accent-color: #c5a46d;
          cursor: pointer;
          flex-shrink: 0;
        }

        .register-terms a {
          color: #c5a46d;
          text-decoration: none;
        }

        .register-terms a:hover {
          color: #e0c38a;
        }

        /* BUTTON */

        .noir-register-button {
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

        .noir-register-button:hover {
          background: #dfc28b;
          border-color: #dfc28b;
        }

        .noir-register-button svg {
          font-size: 17px;
          transition: .3s;
        }

        .noir-register-button:hover svg {
          transform: translateX(5px);
        }

        /* DIVIDER */

        .register-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 28px 0;
          color: #333;
          font-size: 7px;
          letter-spacing: 3px;
        }

        .register-divider::before,
        .register-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #222;
        }

        /* LOGIN */

        .already-account {
          text-align: center;
          color: #555;
          font-size: 10px;
        }

        .already-account a {
          color: #c5a46d;
          text-decoration: none;
          margin-left: 6px;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .already-account a:hover {
          color: #e0c38a;
        }

        /* FOOTER */

        .register-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #1d1d1d;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .register-footer span {
          color: #333;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .register-footer span:nth-child(2) {
          color: #c5a46d;
        }

        /* MOBILE */

        @media (max-width: 576px) {
          .noir-register-page {
            padding: 15px;
          }

          .noir-register-card {
            padding: 35px 25px;
          }

          .register-top {
            margin-bottom: 35px;
          }

          .register-intro h1 {
            font-size: 32px;
          }

          .register-intro {
            margin-bottom: 32px;
          }
        }
      `}</style>

      <div className="noir-register-card">
        {/* TOP */}

        <div className="register-top">
          <div className="noir-logo">
            NOIR<span>.</span>
          </div>

          <button className="close-register" onClick={() => navigate("/home")}>
            <CloseIcon />
          </button>
        </div>

        {/* HEADER */}

        <div className="register-intro">
          <small>PRIVATE COLLECTION</small>

          <h1>Create Account</h1>

          <p>Join NOIR and discover a more refined shopping experience.</p>
        </div>

        <form onSubmit={handlesubmit}>
          {/* NAME */}

          <div className="noir-field">
            <label>FULL NAME</label>

            <div className="noir-field-row">
              <PersonOutlineOutlinedIcon className="noir-field-icon" />

              <input
                type="text"
                placeholder="Your full name"
                name="fullname"
                value={formdata.fullname}
                onChange={handlechange}
                required
              />
            </div>
          </div>

          {/* EMAIL */}

          <div className="noir-field">
            <label>EMAIL ADDRESS</label>

            <div className="noir-field-row">
              <EmailOutlinedIcon className="noir-field-icon" />

              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={formdata.email}
                onChange={handlechange}
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
                placeholder="Create a password"
                name="password"
                value={formdata.password}
                onChange={handlechange}
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

          <div className="noir-field">
            <label>CONFIRM PASSWORD</label>

            <div className="noir-field-row">
              <LockOutlinedIcon className="noir-field-icon" />

              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                name="confirmPassword"
                value={formdata.confirmPassword}
                onChange={handlechange}
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </button>
            </div>
          </div>

          {/* TERMS */}

          <label className="register-terms">
            <input type="checkbox" required  />

            <span>
              I agree to the{" "}
              <span style={{ color: "#c5a46d" }}>Terms & Conditions </span>
              and <span style={{ color: "#c5a46d" }}>Privacy Policy</span>.
            </span>
          </label>

          {/* REGISTER BUTTON */}

          <button type="submit" className="noir-register-button">
            CREATE ACCOUNT OR
            <ArrowForwardIcon />
          </button>
        </form>
        {/* DIVIDER */}

        <div className="register-divider"></div>

        {/* LOGIN */}

        <div className="already-account">
          Already have an account?
          <a href="/login">SIGN IN</a>
        </div>

        {/* FOOTER */}

        <div className="register-footer">
          <span>NOIR</span>

          <span>PRIVATE</span>

          <span>COLLECTION</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
