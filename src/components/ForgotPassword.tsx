import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState<FormData>({
    email: "",
  });

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [verifyalertbutton, setverifyalertbutton] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (!showOtp || resendTimer <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [showOtp, resendTimer]);
  console.log(resendTimer);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(
        "https://noirperfume-api.runasp.net/api/Perfume2Users/forget-password",
        formdata,
      );
      setOtp(["", "", "", "", "", ""]);
      setResendTimer(60);
      setShowOtp(true);
    } catch (error: any) {
      console.error(error);

      setAlertMessage(
        error.response?.data?.message ||
          error.response?.data ||
          "We couldn't find an account with this email address.",
      );

      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);
    setverifyalertbutton(false);

    // Move to next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // =================================
  // BACKSPACE
  // =================================
  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);

      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  const handleverifyotp = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setAlertMessage("Please enter the complete 6-digit OTP.");
      setverifyalertbutton(true);
      return;
    }

    const request = {
      email: formdata.email,
      otp: otpString,
    };
    try {
      const response = await axios.post(
        "https://noirperfume-api.runasp.net/api/Perfume2Users/verify-otp",
        request,
      );
      const resetToken = response.data.resetToken;

      // OTP verified successfully
      setverifyalertbutton(false);
      setShowOtp(false);
      navigate(`/reset-password?token=${encodeURIComponent(resetToken)}`, {
        replace: true,
      });
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        setAlertMessage(
          error.response.data?.message ||
            error.response.data ||
            "Invalid or expired OTP.",
        );
      } else {
        setAlertMessage("Something went wrong. Please try again.");
      }

      setverifyalertbutton(true);
    }
  };

  const handleresendotp = () => {
    
       axios.post(
        "https://noirperfume-api.runasp.net/api/Perfume2Users/forget-password",
        formdata)
     
    setOtp(["", "", "", "", "", ""]);
    setResendTimer(60);
  };

  return (
    <div className="noir-forgot-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .noir-forgot-page {
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

        /* =================================
           BACKGROUND
        ================================= */

        .noir-forgot-page::before {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          border: 1px solid rgba(197, 164, 109, 0.07);
          border-radius: 50%;
          top: -430px;
          right: -300px;
        }
          .otp-error-alert {
  width: 100%;
  min-height: 58px;

  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: 10px;
margin-bottom: 18px;

  padding: 10px 12px;

  background: #17100f;
  border: 1px solid #4b2725;
  border-left: 3px solid #d96c6c;

  text-align: left;

  animation: otpErrorShow 0.25s ease;
}

.otp-error-icon {
  width: 25px;
  height: 25px;
  min-width: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d96c6c;
  border-radius: 50%;

  color: #d96c6c;

  font-size: 13px;
  font-weight: bold;
}

.otp-error-content {
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4px;
}

.otp-error-content strong {
  color: #d96c6c;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
  .otp-error-alert {
  width: 100%;
  min-height: 58px;
  display: flex;
  align-items: center;
  gap: 12px;
margin-top: 15px;
  margin-bottom: 18px;
  padding: 10px 12px;
  background: #17100f;
  border: 1px solid #4b2725;
  border-left: 3px solid #d96c6c;
  text-align: left;
  animation: otpErrorShow 0.25s ease;
}

.otp-error-icon {
  width: 25px;
  height: 25px;
  min-width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d96c6c;
  border-radius: 50%;
  color: #d96c6c;
  font-size: 13px;
  font-weight: bold;
}

.otp-error-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.otp-error-content strong {
  color: #d96c6c;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.otp-error-content span {
  color: #806d6b;
  font-size: 9px;
  line-height: 1.5;
}

.otp-error-close {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: #66504e;
  cursor: pointer;
  transition: 0.3s;
}

.otp-error-close:hover {
  color: #d96c6c;
}

.otp-error-close svg {
  font-size: 16px;
}

@keyframes otpErrorShow {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.otp-error-content span {
  color: #806d6b;
  font-size: 9px;
  line-height: 1.5;
}

.otp-error-close {
  width: 25px;
  height: 25px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  background: transparent;

  color: #66504e;

  cursor: pointer;
  transition: 0.3s;
}

.otp-error-close:hover {
  color: #d96c6c;
}

.otp-error-close svg {
  font-size: 16px;
}

@keyframes otpErrorShow {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

        .noir-forgot-page::after {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          border: 1px solid rgba(197, 164, 109, 0.05);
          border-radius: 50%;
          bottom: -350px;
          left: -280px;
        }

        /* =================================
           MAIN CARD
        ================================= */

        .noir-forgot-card {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 2;
          padding: 55px 60px 50px;
          background: #0c0c0c;
          border: 1px solid #242424;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.8);
        }

        /* =================================
           TOP
        ================================= */

        .forgot-top {
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

        .close-forgot {
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

        .close-forgot:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: rotate(90deg);
        }

        .close-forgot svg {
          font-size: 17px;
        }

        /* =================================
           HEADER
        ================================= */

        .forgot-intro {
          text-align: center;
          margin-bottom: 45px;
        }

        .forgot-intro small {
          display: block;
          color: #c5a46d;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 17px;
        }

        .forgot-intro h1 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 38px;
          letter-spacing: 1px;
          margin: 0;
        }
          /* =================================
   PREMIUM ALERT
================================= */

.premium-alert-overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.86);

  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  z-index: 99999;

  animation: premiumAlertOverlay 0.25s ease;
}

.premium-alert-modal {
  width: 100%;
  max-width: 390px;

  position: relative;

  background: #0d0d0d;

  border: 1px solid #292929;

  padding: 45px 38px 36px;

  text-align: center;

  box-shadow:
    0 30px 100px rgba(0, 0, 0, 0.95),
    0 0 70px rgba(197, 164, 109, 0.06);

  animation:
    premiumAlertModal
    0.4s
    cubic-bezier(.2, .8, .2, 1);
}

.premium-alert-modal::before {
  content: "";

  position: absolute;

  top: 0;
  left: 50%;

  transform: translateX(-50%);

  width: 85px;
  height: 1px;

  background: #c5a46d;
}

/* CLOSE */

.premium-alert-close {
  position: absolute;

  top: 15px;
  right: 15px;

  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;

  border: 1px solid #292929;

  color: #555;

  cursor: pointer;

  transition: 0.3s;
}

.premium-alert-close:hover {
  color: #c5a46d;

  border-color: #c5a46d;

  transform: rotate(90deg);
}

.premium-alert-close svg {
  font-size: 15px;
}

/* ICON */

.premium-alert-icon {
  width: 68px;
  height: 68px;

  margin: 0 auto 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(197, 164, 109, 0.45);

  border-radius: 50%;

  color: #c5a46d;

  font-family: Georgia, serif;

  font-size: 30px;

  box-shadow:
    0 0 35px rgba(197, 164, 109, 0.05);

  animation:
    premiumAlertIcon
    0.5s
    ease
    0.1s
    both;
}

/* LABEL */

.premium-alert-label {
  color: #c5a46d;

  font-size: 8px;

  font-weight: 600;

  letter-spacing: 4px;

  margin-bottom: 13px;
}

/* TITLE */

.premium-alert-modal h2 {
  font-family: Georgia, serif;

  font-size: 29px;

  font-weight: normal;

  color: #fff;

  margin: 0 0 14px;
}

/* MESSAGE */

.premium-alert-modal p {
  color: #666;

  font-size: 10px;

  line-height: 1.9;

  max-width: 285px;

  margin: 0 auto 28px;

  word-break: break-word;
}

/* BUTTON */

.premium-alert-button {
  width: 100%;

  height: 48px;

  background: transparent;

  border: 1px solid #c5a46d;

  color: #c5a46d;

  font-size: 8px;

  font-weight: 700;

  letter-spacing: 2.5px;

  cursor: pointer;

  transition: 0.3s;
}

.premium-alert-button:hover {
  background: #c5a46d;

  color: #080808;
}

/* ANIMATIONS */

@keyframes premiumAlertOverlay {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes premiumAlertModal {
  from {
    opacity: 0;

    transform:
      translateY(25px)
      scale(0.95);
  }

  to {
    opacity: 1;

    transform:
      translateY(0)
      scale(1);
  }
}

@keyframes premiumAlertIcon {
  from {
    opacity: 0;

    transform: scale(0.5);
  }

  to {
    opacity: 1;

    transform: scale(1);
  }
}

/* MOBILE */

@media (max-width: 576px) {
  .premium-alert-modal {
    padding: 42px 25px 30px;
  }

  .premium-alert-modal h2 {
    font-size: 26px;
  }
}

        .forgot-intro p {
          color: #666;
          font-size: 10px;
          line-height: 1.8;
          margin: 13px auto 0;
          max-width: 290px;
        }

        /* =================================
           FORM
        ================================= */

        .forgot-field {
          position: relative;
          margin-bottom: 30px;
        }
          .forgot-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.otp-spinner {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(8, 8, 8, 0.25);
  border-top: 2px solid #080808;
  border-radius: 50%;
  animation: otpSpin 0.7s linear infinite;
}

@keyframes otpSpin {
  to {
    transform: rotate(360deg);
  }
}

        .forgot-field label {
          display: block;
          color: #777;
          font-size: 8px;
          letter-spacing: 2.5px;
          margin-bottom: 9px;
        }

        .forgot-field-row {
          position: relative;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #2c2c2c;
          transition: 0.3s;
        }

        .forgot-field-row:focus-within {
          border-bottom-color: #c5a46d;
        }

        .forgot-field-icon {
          color: #555;
          font-size: 19px !important;
          margin-right: 12px;
          transition: 0.3s;
        }

        .forgot-field-row:focus-within .forgot-field-icon {
          color: #c5a46d;
        }

        .forgot-field input {
          width: 100%;
          height: 48px;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 12px;
          padding: 0;
        }

        .forgot-field input::placeholder {
          color: #3f3f3f;
        }

        /* =================================
           SEND OTP BUTTON
        ================================= */

        .forgot-button {
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
        }

        .forgot-button:hover {
          background: #dfc28b;
          border-color: #dfc28b;
        }

        .forgot-button svg {
          font-size: 17px;
          transition: 0.3s;
        }

        .forgot-button:hover svg {
          transform: translateX(5px);
        }

        /* =================================
           BACK LOGIN
        ================================= */

        .back-login {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          margin-top: 30px;
        }

        .back-login button {
          border: none;
          background: transparent;
          color: #666;
          display: flex;
          align-items: center;
          gap: 7px;
          cursor: pointer;
          font-size: 8px;
          letter-spacing: 1.5px;
          transition: 0.3s;
        }

        .back-login button:hover {
          color: #c5a46d;
        }

        .back-login svg {
          font-size: 15px;
        }

        /* =================================
           DIVIDER
        ================================= */

        .forgot-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 35px 0;
          color: #333;
          font-size: 7px;
          letter-spacing: 3px;
        }

        .forgot-divider::before,
        .forgot-divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #222;
        }

        /* =================================
           FOOTER
        ================================= */

        .forgot-footer {
          margin-top: 35px;
          padding-top: 22px;
          border-top: 1px solid #1d1d1d;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .forgot-footer span {
          color: #333;
          font-size: 7px;
          letter-spacing: 2px;
        }

        .forgot-footer span:nth-child(2) {
          color: #c5a46d;
        }

        /* =================================
           OTP OVERLAY
        ================================= */

        .otp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
          animation: otpOverlayShow 0.25s ease;
        }

        /* =================================
           OTP MODAL
        ================================= */

        .otp-modal {
          width: 100%;
          max-width: 430px;
          background: #0d0d0d;
          border: 1px solid #292929;
          padding: 48px 40px 38px;
          text-align: center;
          position: relative;

          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.95),
            0 0 70px rgba(197, 164, 109, 0.06);

          animation:
            otpModalShow
            0.4s
            cubic-bezier(.2, .8, .2, 1);
        }

        .otp-modal::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 1px;
          background: #c5a46d;
        }

        /* =================================
           OTP CLOSE BUTTON
        ================================= */

        .otp-close {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 31px;
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #292929;
          background: transparent;
          color: #555;
          cursor: pointer;
          transition: 0.3s;
        }

        .otp-close:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: rotate(90deg);
        }

        .otp-close svg {
          font-size: 15px;
        }

        /* =================================
           OTP ICON
        ================================= */

        .otp-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid rgba(197, 164, 109, 0.45);
          border-radius: 50%;

          color: #c5a46d;

          font-family: Georgia, serif;
          font-size: 28px;

          box-shadow:
            0 0 30px rgba(197, 164, 109, 0.04);

          animation:
            otpIconShow
            0.5s
            ease
            0.15s
            both;
        }

        /* =================================
           OTP LABEL
        ================================= */

        .otp-label {
          color: #c5a46d;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 4px;
          margin-bottom: 13px;
        }

        /* =================================
           OTP TITLE
        ================================= */

        .otp-modal h2 {
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: normal;
          color: #fff;
          margin: 0 0 12px;
        }

        /* =================================
           OTP MESSAGE
        ================================= */

        .otp-message {
          color: #666;
          font-size: 10px;
          line-height: 1.9;
          margin: 0 auto;
          max-width: 300px;
        }

        .otp-email {
          color: #c5a46d;
          word-break: break-word;
        }

        /* =================================
           OTP INPUT AREA
        ================================= */

        .otp-input-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin: 30px 0 20px;
        }

        .otp-input {
          width: 47px;
          height: 54px;

          background: #111;

          border: 1px solid #303030;

          outline: none;

          color: #fff;

          font-size: 20px;
          font-weight: 500;

          text-align: center;

          transition: 0.3s;

          border-radius: 0;
        }

        .otp-input:hover {
          border-color: #444;
        }

        .otp-input:focus {
          border-color: #c5a46d;

          box-shadow:
            0 0 0 1px rgba(197, 164, 109, 0.12),
            0 0 20px rgba(197, 164, 109, 0.04);
        }

        /* =================================
           VERIFY BUTTON - UI ONLY
        ================================= */

        .otp-verify-button {
          width: 100%;
          height: 50px;

          margin-top: 5px;

          border: 1px solid #c5a46d;

          background: #c5a46d;
          color: #080808;

          font-size: 8px;
          font-weight: 700;

          letter-spacing: 2.5px;

          cursor: pointer;

          transition: 0.3s;
        }

        .otp-verify-button:hover {
          background: #dfc28b;
          border-color: #dfc28b;
        }

        /* =================================
           RESEND - UI ONLY
        ================================= */
.otp-timer {
  color: #555;
  font-size: 9px;
  letter-spacing: 0.5px;
}
        .otp-resend {
          margin-top: 21px;
          color: #555;
          font-size: 9px;
        }

        .otp-resend button {
          border: none;
          background: transparent;
          color: #c5a46d;
          font-size: 9px;
          cursor: pointer;
          padding: 0;
        }

        .otp-resend button:hover {
          text-decoration: underline;
        }

        /* =================================
           SECURITY TEXT
        ================================= */

        .otp-security {
          margin-top: 25px;
          padding-top: 18px;
          border-top: 1px solid #1d1d1d;

          color: #383838;

          font-size: 7px;

          letter-spacing: 1.5px;

          line-height: 1.8;
        }

        /* =================================
           ANIMATIONS
        ================================= */

        @keyframes otpOverlayShow {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes otpModalShow {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.95);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes otpIconShow {
          from {
            opacity: 0;
            transform: scale(0.5);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* =================================
           MOBILE
        ================================= */

        @media (max-width: 576px) {

          .noir-forgot-page {
            padding: 15px;
          }

          .noir-forgot-card {
            padding: 35px 25px;
          }

          .forgot-top {
            margin-bottom: 40px;
          }

          .forgot-intro h1 {
            font-size: 32px;
          }

          .forgot-intro {
            margin-bottom: 38px;
          }

          .otp-modal {
            padding: 42px 20px 30px;
          }

          .otp-input-container {
            gap: 5px;
          }

          .otp-input {
            width: 42px;
            height: 50px;
            font-size: 18px;
          }

          .otp-modal h2 {
            font-size: 26px;
          }
        }

      `}</style>

      {/* =================================
          MAIN CARD
      ================================= */}

      <div className="noir-forgot-card">
        {/* TOP */}

        <div className="forgot-top">
          <div className="noir-logo">
            NOIR<span>.</span>
          </div>

          <button
            type="button"
            className="close-forgot"
            onClick={() => navigate("/")}
          >
            <CloseIcon />
          </button>
        </div>

        {/* HEADER */}

        <div className="forgot-intro">
          <small>ACCOUNT RECOVERY</small>

          <h1>Forgot Password?</h1>

          <p>
            Enter your email address and we'll help you recover access to your
            NOIR account.
          </p>
        </div>

        {/* FORM */}

        <form onSubmit={handlesubmit}>
          <div className="forgot-field">
            <label>EMAIL ADDRESS</label>

            <div className="forgot-field-row">
              <PersonOutlineOutlinedIcon className="forgot-field-icon" />

              <input
                type="email"
                placeholder="Your email address"
                name="email"
                value={formdata.email}
                onChange={(e) =>
                  setformdata({
                    ...formdata,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>

            {showAlert && (
              <div className="otp-error-alert">
                <div className="otp-error-icon">!</div>

                <div className="otp-error-content">
                  <strong>Email Not Found</strong>
                  <span>{alertMessage}</span>
                </div>

                <button
                  type="button"
                  className="otp-error-close"
                  onClick={() => setShowAlert(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>

          {/* SEND OTP */}

          <button type="submit" className="forgot-button" disabled={loading}>
            {loading ? (
              <>
                <span className="otp-spinner"></span>
                SENDING OTP...
              </>
            ) : (
              <>
                SEND OTP
                <ArrowForwardIcon />
              </>
            )}
          </button>
        </form>

        {/* DIVIDER */}

        <div className="forgot-divider">OR</div>

        {/* BACK TO LOGIN */}

        <div className="back-login">
          <button type="button" onClick={() => navigate("/login")}>
            <ArrowBackIcon />
            BACK TO SIGN IN
          </button>
        </div>

        {/* FOOTER */}

        <div className="forgot-footer">
          <span>NOIR</span>

          <span>PRIVATE</span>

          <span>COLLECTION</span>
        </div>
      </div>

      {/* =================================
          OTP POPUP - UI ONLY
      ================================= */}

      {showOtp && (
        <div className="otp-overlay">
          <div className="otp-modal">
            {/* CLOSE */}

            <button
              type="button"
              className="otp-close"
              onClick={() => setShowOtp(false)}
            >
              <CloseIcon />
            </button>

            {/* ICON */}

            <div className="otp-icon">✦</div>

            {/* LABEL */}

            <div className="otp-label">SECURITY VERIFICATION</div>

            {/* TITLE */}

            <h2>Verify Your Email</h2>

            {/* MESSAGE */}

            <p className="otp-message">
              Enter the 6-digit verification code sent to
              <br />
              <span className="otp-email">{formdata.email}</span>
            </p>

            {/* OTP BOXES */}

            <div className="otp-input-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                />
              ))}
            </div>
            {verifyalertbutton && (
              <div className="otp-error-alert">
                <div className="otp-error-icon">!</div>

                <div className="otp-error-content">
                  <strong>Verification Failed</strong>
                  <span>{alertMessage}</span>
                </div>

                <button
                  type="button"
                  className="otp-error-close"
                  onClick={() => setverifyalertbutton(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            )}

            {/* UI ONLY BUTTON */}

            <button
              type="button"
              className="otp-verify-button"
              onClick={() => handleverifyotp()}
            >
              VERIFY OTP
            </button>

            {/* RESEND UI */}

            <div className="otp-resend">
              Didn't receive the code?{" "}
              {resendTimer > 0 ? (
                <span>
                  Resend OTP in <strong>{resendTimer}s</strong>
                </span>
              ) : (
                <button type="button" onClick={() => handleresendotp()}>
                  RESEND OTP
                </button>
              )}
            </div>

            {/* SECURITY */}

            <div className="otp-security">
              FOR YOUR SECURITY, NEVER SHARE YOUR OTP
              <br />
              WITH ANYONE.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
