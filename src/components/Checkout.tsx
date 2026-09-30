import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// interface CheckoutProduct {
//   id: number;
//   brand: string;
//   title: string;
//   size: string;
//   quantity: number;
//   price: number;
//   image: string;
// }

type cartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
};


const Checkout: React.FC = () => {
  const navigate = useNavigate();
    const location = useLocation();
const Cart = (location.state?.Cart as cartItem[]) || [];
  console.log(Cart)

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const [form, setForm] = useState({
    firstName: "Gulshan",
    lastName: "Kumar",
    email: "gulshan@email.com",
    phone: "+91 98765 43210",
    address: "",
    apartment: "",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    pincode: "201306",
  });

 

 

//   <<--------------get product by id--------------->
 const [perfumes, setperfumes] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const responses = await Promise.all(
          Cart.map((item) =>
            axios.get(`https://noirperfume-api.runasp.net/api/Perfume2/${item.productId}`),
          ),
        );

        const productData = responses.map((response, index) => ({
  ...response.data,
  quantity: Cart[index].quantity,
}));

        setperfumes(productData);
      } catch (error) {
        console.log(error);
      }
    };

    if (Cart.length > 0) {
      getProducts();
    }
  }, [Cart]);

    const subtotal = perfumes.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = couponApplied ? subtotal * 0.1 : 0;

  const shipping = subtotal - discount >= 100 ? 0 : 8;

  const total = subtotal - discount + shipping;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NOIR10") {
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      alert("Invalid coupon code");
    }
  };

  const placeOrder = () => {
    // if (
    //   !form.firstName ||
    //   !form.lastName ||
    //   !form.email ||
    //   !form.phone ||
    //   !form.address ||
    //   !form.city ||
    //   !form.state ||
    //   !form.pincode
    // ) { 
    //   alert("Please fill all required details.");
    //   return;
    // }

    alert("Order placed successfully!");
    navigate("/order");
  };

const updateQuantity = (id: number, change: number) => {
  setperfumes((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + change),
          }
        : item
    )
  );
};


  console.log(perfumes)

  return (
    <div className="checkout-page">
      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #080808;
        }

        .checkout-page {
          min-height: 100vh;
          padding-bottom: 70px;
          color: #f4f1eb;

          background:
            radial-gradient(
              circle at 10% 0%,
              rgba(197,164,109,.055),
              transparent 25%
            ),
            radial-gradient(
              circle at 90% 30%,
              rgba(197,164,109,.025),
              transparent 28%
            ),
            #080808;
        }

        .checkout-container {
          width: min(1380px, 94%);
          margin: auto;
        }

        .gold {
          color: #c5a46d;
        }


        /* =================================
           HEADER
        ================================= */

        .checkout-header {
          height: 78px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid #202020;

          position: relative;
        }

        .header-side {
          width: 220px;

          display: flex;
          align-items: center;
        }

        .header-right {
          justify-content: flex-end;
        }

        .back-button {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #292929;

          background: transparent;
          color: #888;

          cursor: pointer;

          transition: .25s ease;
        }

        .back-button:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: translateX(-2px);
        }

        .back-text {
          margin-left: 11px;

          color: #777;

          font-size: 10px;
          letter-spacing: 2px;
        }

        .checkout-logo {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);

          font-family: Georgia, serif;

          font-size: 29px;
          letter-spacing: 7px;

          color: #f4f1eb;
        }

        .checkout-logo span {
          color: #c5a46d;
        }

        .secure-header {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #777;

          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .secure-header svg {
          color: #c5a46d;
          font-size: 17px;
        }


        /* =================================
           CHECKOUT TITLE
        ================================= */

        .checkout-title-section {
          padding: 40px 0 36px;

          border-bottom: 1px solid #1d1d1d;

          background: #090909;
        }

        .checkout-title-inner {
          width: min(1380px, 94%);
          margin: auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 30px;
        }

        .checkout-breadcrumb {
          margin-bottom: 12px;

          color: #c5a46d;

          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
        }

        .checkout-breadcrumb span {
          color: #555;
          margin: 0 7px;
        }

        .checkout-title-inner h1 {
          margin: 0;

          color: #f4f1eb;

          font-family: Georgia, serif;

          font-size: 42px;
          font-weight: normal;

          line-height: 1.1;
          letter-spacing: -1px;
        }

        .checkout-title-inner h1 span {
          color: #c5a46d;
          font-style: italic;
        }

        .checkout-title-inner p {
          margin: 11px 0 0;

          color: #777;

          font-size: 13px;
        }

        .checkout-step {
          display: flex;
          align-items: center;
          gap: 12px;

          padding: 13px 17px;

          border: 1px solid #292929;

          background: #0e0e0e;
        }

        .step-number {
          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #c5a46d;

          color: #c5a46d;

          font-family: Georgia, serif;

          font-size: 13px;
        }
          .summary-product-price-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 30px;
}

.summary-quantity-controls {
  display: flex;
  align-items: center;
  height: 28px;
  border: 1px solid #292929;
  background: #101010;
}

.summary-quantity-controls button {
  width: 26px;
  height: 26px;
  padding: 0;

  border: none;
  background: transparent;
  color: #c5a46d;

  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.summary-quantity-controls button:hover {
  background: #c5a46d;
  color: #080808;
}

.summary-quantity-controls span {
  width: 28px;

  text-align: center;
  color: #ddd;

  font-size: 10px;
}

        .checkout-step span {
          display: block;

          margin-bottom: 4px;

          color: #666;

          font-size: 8px;
          letter-spacing: 2px;
        }

        .checkout-step strong {
          display: block;

          color: #ddd;

          font-size: 11px;
          font-weight: 400;
        }


        /* =================================
           CONTENT
        ================================= */

        .checkout-content {
          padding-top: 34px;
        }

        .section {
          margin-bottom: 20px;

          border: 1px solid #242424;

          background: #0c0c0c;

          transition: border-color .25s ease;
        }

        .section:hover {
          border-color: #333;
        }

        .section-header {
          min-height: 68px;

          padding: 0 24px;

          display: flex;
          align-items: center;

          gap: 13px;

          border-bottom: 1px solid #202020;
        }

        .section-number {
          color: #c5a46d;

          font-size: 10px;

          letter-spacing: 2px;
        }

        .section-header h2 {
          margin: 0;

          color: #e8e4dc;

          font-family: Georgia, serif;

          font-size: 22px;
          font-weight: normal;
        }

        .section-body {
          padding: 26px;
        }


        /* =================================
           INPUTS
        ================================= */

        .field {
          margin-bottom: 21px;
        }

        .field:last-child {
          margin-bottom: 0;
        }

        .field label {
          display: block;

          margin-bottom: 8px;

          color: #888;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 1.6px;
        }

        .field label span {
          color: #c5a46d;
        }

        .checkout-input {
          width: 100%;
          height: 54px;

          padding: 0 16px;

          outline: none;

          border: 1px solid #292929;

          background: #101010;

          color: #eee;

          font-size: 14px;

          transition:
            border-color .25s ease,
            background .25s ease,
            box-shadow .25s ease;
        }

        .checkout-input:hover {
          border-color: #3a3a3a;
        }

        .checkout-input:focus {
          border-color: #c5a46d;

          background: #111;

          box-shadow:
            0 0 0 3px rgba(197,164,109,.06);
        }

        .checkout-input::placeholder {
          color: #555;
        }


        /* =================================
           PAYMENT
        ================================= */

        .payment-option {
          position: relative;

          display: flex;
          align-items: center;

          gap: 16px;

          min-height: 76px;

          padding: 16px 18px;

          margin-bottom: 11px;

          border: 1px solid #292929;

          background: #101010;

          cursor: pointer;

          transition: .25s ease;
        }

        .payment-option:last-child {
          margin-bottom: 0;
        }

        .payment-option:hover {
          border-color: #555;
        }

        .payment-option.active {
          border-color: #c5a46d;

          background:
            linear-gradient(
              90deg,
              rgba(197,164,109,.055),
              rgba(197,164,109,.015)
            );
        }

        .payment-radio {
          width: 19px;
          height: 19px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: 1px solid #555;

          border-radius: 50%;
        }

        .payment-option.active .payment-radio {
          border-color: #c5a46d;
        }

        .payment-option.active .payment-radio::after {
          content: "";

          width: 8px;
          height: 8px;

          border-radius: 50%;

          background: #c5a46d;
        }

        .payment-icon {
          color: #c5a46d;

          font-size: 23px !important;
        }

        .payment-info {
          flex: 1;
        }

        .payment-name {
          margin-bottom: 5px;

          color: #ddd;

          font-size: 14px;
        }

        .payment-description {
          color: #666;

          font-size: 11px;
        }


        /* =================================
           SHIPPING MESSAGE
        ================================= */

        .shipping-message {
          display: flex;
          align-items: center;

          gap: 14px;

          margin-top: 18px;

          padding: 18px;

          border: 1px solid #242424;

          background: #0c0c0c;
        }

        .shipping-message svg {
          color: #c5a46d;

          font-size: 24px;
        }

        .shipping-message-title {
          margin-bottom: 4px;

          color: #ddd;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 1.5px;
        }

        .shipping-message-text {
          color: #666;

          font-size: 11px;
        }


        /* =================================
           SUMMARY
        ================================= */

        .summary {
          position: sticky;
          top: 20px;

          overflow: hidden;

          border: 1px solid #302a20;

          background: #0c0c0c;

          box-shadow:
            0 20px 60px rgba(0,0,0,.25);
        }

        .summary-header {
          padding: 25px 26px;

          border-bottom: 1px solid #252525;
        }

        .summary-label {
          margin-bottom: 9px;

          color: #c5a46d;

          font-size: 9px;

          letter-spacing: 3px;
        }

        .summary-title {
          margin: 0;

          color: #eee;

          font-family: Georgia, serif;

          font-size: 27px;
          font-weight: normal;
        }


        /* =================================
           PRODUCTS
        ================================= */

        .summary-products {
          padding: 21px 26px;

          border-bottom: 1px solid #222;
        }

        .summary-product {
          display: flex;

          gap: 14px;

          margin-bottom: 20px;
        }

        .summary-product:last-child {
          margin-bottom: 0;
        }

        .summary-image {
          position: relative;

          width: 72px;
          height: 86px;

          flex-shrink: 0;

          overflow: hidden;

          background: #151515;
        }

        .summary-image img {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }

        .summary-quantity {
          position: absolute;

          top: 5px;
          right: 5px;

          min-width: 21px;
          height: 21px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #c5a46d;

          color: #080808;

          font-size: 9px;
          font-weight: bold;
        }

        .summary-product-info {
          flex: 1;

          padding-top: 2px;
        }

        .summary-brand {
          color: #c5a46d;

          font-size: 9px;

          letter-spacing: 2px;

          font-weight: bold;
        }

        .summary-product-name {
          margin: 7px 0;

          color: #ddd;

          font-family: Georgia, serif;

          font-size: 16px;
        }

        .summary-size {
          color: #666;

          font-size: 10px;

          letter-spacing: 1px;
        }

        .summary-product-price {
          color: #aaa;

          font-family: Georgia, serif;

          font-size: 14px;

          white-space: nowrap;
        }


        /* =================================
           COUPON
        ================================= */

        .coupon {
          padding: 21px 26px;

          border-bottom: 1px solid #222;
        }

        .coupon-label {
          margin-bottom: 9px;

          color: #888;

          font-size: 9px;

          letter-spacing: 2px;
        }

        .coupon-row {
          display: flex;

          gap: 8px;
        }

        .coupon-input {
          flex: 1;

          min-width: 0;

          height: 45px;

          padding: 0 13px;

          outline: none;

          border: 1px solid #292929;

          background: #101010;

          color: #ddd;

          font-size: 11px;

          text-transform: uppercase;
        }

        .coupon-input:focus {
          border-color: #c5a46d;
        }

        .coupon-button {
          width: 88px;

          border: 1px solid #555;

          background: transparent;

          color: #aaa;

          font-size: 9px;

          letter-spacing: 1px;

          cursor: pointer;

          transition: .25s ease;
        }

        .coupon-button:hover {
          border-color: #c5a46d;

          color: #c5a46d;
        }

        .coupon-success {
          margin-top: 9px;

          color: #c5a46d;

          font-size: 10px;
        }


        /* =================================
           PRICE
        ================================= */

        .price-section {
          padding: 21px 26px;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 11px 0;

          border-bottom: 1px solid #1c1c1c;

          color: #777;

          font-size: 12px;
        }

        .price-row.discount span:last-child {
          color: #c5a46d;
        }

        .price-row.shipping span:last-child {
          color: #c5a46d;
        }

        .total-row {
          display: flex;
          align-items: center;
          justify-content: space-between;

          padding-top: 21px;
        }

        .total-label {
          color: #ddd;

          font-size: 11px;

          letter-spacing: 1px;
        }

        .total-price {
          color: #c5a46d;

          font-family: Georgia, serif;

          font-size: 34px;

          font-weight: normal;
        }


        /* =================================
           PLACE ORDER
        ================================= */

        .place-order {
          padding: 0 26px 26px;
        }

        .place-order-button {
          width: 100%;

          min-height: 57px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #c5a46d;

          background: #c5a46d;

          color: #080808;

          font-size: 10px;

          font-weight: 700;

          letter-spacing: 2px;

          cursor: pointer;

          transition: .25s ease;
        }

        .place-order-button:hover {
          background: #e0c48d;

          border-color: #e0c48d;
        }

        .place-order-button svg {
          margin-left: 9px;

          font-size: 18px;
        }

        .secure-text {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          margin-top: 14px;

          color: #555;

          font-size: 9px;

          letter-spacing: 1px;
        }

        .secure-text svg {
          color: #c5a46d;

          font-size: 15px;
        }


        /* =================================
           RESPONSIVE
        ================================= */

        @media (max-width: 991px) {

          .summary {
            position: static;
          }

        }


        @media (max-width: 768px) {

          .checkout-header {
            height: 70px;
          }

          .header-side {
            width: auto;
          }

          .back-text {
            display: none;
          }

          .secure-header {
            display: none;
          }

          .checkout-logo {
            font-size: 24px;
            letter-spacing: 5px;
          }

          .checkout-title-section {
            padding: 30px 0;
          }

          .checkout-title-inner {
            width: 92%;
          }

          .checkout-title-inner h1 {
            font-size: 32px;
          }

          .checkout-title-inner p {
            font-size: 12px;
          }

          .checkout-step {
            display: none;
          }

          .checkout-content {
            padding-top: 24px;
          }

          .section-header {
            min-height: 62px;

            padding: 0 18px;
          }

          .section-header h2 {
            font-size: 20px;
          }

          .section-body {
            padding: 20px;
          }

          .checkout-input {
            height: 52px;

            font-size: 14px;
          }

        }


        @media (max-width: 480px) {

          .checkout-container {
            width: 92%;
          }

          .checkout-title-inner {
            width: 92%;
          }

          .checkout-title-inner h1 {
            font-size: 29px;
          }

          .checkout-title-inner p {
            font-size: 12px;
          }

          .checkout-breadcrumb {
            font-size: 9px;

            letter-spacing: 2px;
          }

          .section-body {
            padding: 18px;
          }

          .summary-header,
          .summary-products,
          .coupon,
          .price-section,
          .place-order {
            padding-left: 18px;
            padding-right: 18px;
          }

          .summary-product-name {
            font-size: 14px;
          }

          .total-price {
            font-size: 29px;
          }

        }

      `}</style>


      {/* =================================
          HEADER
      ================================= */}

      <div className="checkout-container">

        <header className="checkout-header">

          <div className="header-side">

            <button
              className="back-button"
              onClick={() => navigate("/cart")}
              aria-label="Back to cart"
            >
              <ArrowBackIcon fontSize="small" />
            </button>

            <span className="back-text">
              BACK TO CART
            </span>

          </div>


          <div className="checkout-logo">
            NOIR<span>.</span>
          </div>


          <div className="header-side header-right">

            <div className="secure-header">

              <LockOutlinedIcon />

              SECURE CHECKOUT

            </div>

          </div>

        </header>


        {/* =================================
            CHECKOUT TITLE
        ================================= */}

        <section className="checkout-title-section">

          <div className="checkout-title-inner">

            <div>

              <div className="checkout-breadcrumb">
                NOIR <span>/</span> CHECKOUT
              </div>

              <h1>
                Complete Your <span>Order</span>
              </h1>

              <p>
                Review your details and place your order securely.
              </p>

            </div>


            <div className="checkout-step">

              <div className="step-number">
                01
              </div>

              <div>

                <span>
                  CHECKOUT
                </span>

                <strong>
                  Secure &amp; Private
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* =================================
            CHECKOUT CONTENT
        ================================= */}

        <div className="checkout-content">

          <div className="row g-4">


            {/* =================================
                LEFT SIDE
            ================================= */}

            <div className="col-lg-7">


              {/* CONTACT */}

              <section className="section">

                <div className="section-header">

                  <span className="section-number">
                    01
                  </span>

                  <h2>
                    Contact{" "}
                    <span className="gold">
                      Information
                    </span>
                  </h2>

                </div>


                <div className="section-body">

                  <div className="row g-3">

                    <div className="col-md-6">

                      <div className="field">

                        <label>
                          FIRST NAME <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleInputChange}
                          placeholder="First name"
                        />

                      </div>

                    </div>


                    <div className="col-md-6">

                      <div className="field">

                        <label>
                          LAST NAME <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleInputChange}
                          placeholder="Last name"
                        />

                      </div>

                    </div>


                    <div className="col-md-6">

                      <div className="field">

                        <label>
                          EMAIL ADDRESS <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                        />

                      </div>

                    </div>


                    <div className="col-md-6">

                      <div className="field">

                        <label>
                          PHONE NUMBER <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          placeholder="+91"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </section>


              {/* SHIPPING ADDRESS */}

              <section className="section">

                <div className="section-header">

                  <span className="section-number">
                    02
                  </span>

                  <h2>
                    Shipping{" "}
                    <span className="gold">
                      Address
                    </span>
                  </h2>

                </div>


                <div className="section-body">

                  <div className="field">

                    <label>
                      STREET ADDRESS <span>*</span>
                    </label>

                    <input
                      className="checkout-input"
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="House number and street name"
                    />

                  </div>


                  <div className="field">

                    <label>
                      APARTMENT / LANDMARK
                    </label>

                    <input
                      className="checkout-input"
                      type="text"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, landmark etc. (optional)"
                    />

                  </div>


                  <div className="row g-3">

                    <div className="col-md-5">

                      <div className="field">

                        <label>
                          CITY <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleInputChange}
                          placeholder="City"
                        />

                      </div>

                    </div>


                    <div className="col-md-4">

                      <div className="field">

                        <label>
                          STATE <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="text"
                          name="state"
                          value={form.state}
                          onChange={handleInputChange}
                          placeholder="State"
                        />

                      </div>

                    </div>


                    <div className="col-md-3">

                      <div className="field">

                        <label>
                          PINCODE <span>*</span>
                        </label>

                        <input
                          className="checkout-input"
                          type="text"
                          name="pincode"
                          value={form.pincode}
                          onChange={handleInputChange}
                          placeholder="201306"
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </section>


              {/* PAYMENT */}

              <section className="section">

                <div className="section-header">

                  <span className="section-number">
                    03
                  </span>

                  <h2>
                    Payment{" "}
                    <span className="gold">
                      Method
                    </span>
                  </h2>

                </div>


                <div className="section-body">


                  {/* CARD */}

                  <div
                    className={`payment-option ${
                      paymentMethod === "card"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >

                    <div className="payment-radio"></div>

                    <CreditCardOutlinedIcon className="payment-icon" />

                    <div className="payment-info">

                      <div className="payment-name">
                        Credit / Debit Card
                      </div>

                      <div className="payment-description">
                        Visa, Mastercard, RuPay and more
                      </div>

                    </div>

                  </div>


                  {/* UPI */}

                  <div
                    className={`payment-option ${
                      paymentMethod === "upi"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >

                    <div className="payment-radio"></div>

                    <AccountBalanceWalletOutlinedIcon className="payment-icon" />

                    <div className="payment-info">

                      <div className="payment-name">
                        UPI
                      </div>

                      <div className="payment-description">
                        Google Pay, PhonePe, Paytm and more
                      </div>

                    </div>

                  </div>


                  {/* COD */}

                  <div
                    className={`payment-option ${
                      paymentMethod === "cod"
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setPaymentMethod("cod")}
                  >

                    <div className="payment-radio"></div>

                    <PaymentsOutlinedIcon className="payment-icon" />

                    <div className="payment-info">

                      <div className="payment-name">
                        Cash on Delivery
                      </div>

                      <div className="payment-description">
                        Pay when your fragrance arrives
                      </div>

                    </div>

                  </div>

                </div>

              </section>


              {/* SHIPPING INFO */}

              <div className="shipping-message">

                <LocalShippingOutlinedIcon />

                <div>

                  <div className="shipping-message-title">
                    FREE EXPRESS SHIPPING
                  </div>

                  <div className="shipping-message-text">
                    Your order qualifies for complimentary
                    shipping.
                  </div>

                </div>

              </div>

            </div>


            {/* =================================
                RIGHT SIDE
            ================================= */}

            <div className="col-lg-5">

              <div className="summary">


                {/* SUMMARY HEADER */}

                <div className="summary-header">

                  <div className="summary-label">
                    YOUR SELECTION
                  </div>

                  <h2 className="summary-title">
                    Order{" "}
                    <span className="gold">
                      Summary
                    </span>
                  </h2>

                </div>


                {/* PRODUCTS */}

                <div className="summary-products">

                  {perfumes.map((item) => (

                    <div
                      className="summary-product"
                      key={item.id}
                    >

                      <div className="summary-image">

                        <img
                          src={item.imageUrl}
                          alt={item.title}
                        />

                        {/* <span className="summary-quantity">
                          {item.quantity}
                        </span> */}

                      </div>


                      <div className="summary-product-info">

                        <div className="summary-brand">
                          {item.brand}
                        </div>

                        <div className="summary-product-name">
                          {item.title}
                        </div>

                        <div className="summary-size">
                          {item.sizeML} ML
                        </div>

                      </div>


                   <div className="summary-product-price-wrapper">
  <div className="summary-product-price">
    ${(item.price * item.quantity).toFixed(2)}
  </div>

  <div className="summary-quantity-controls">
    <button type="button" onClick={() => updateQuantity(item.id, -1)}>−</button>
    <span>{item.quantity}</span>
    <button type="button"   onClick={() => updateQuantity(item.id, 1)}
>+</button>
  </div>
</div>

                    </div>

                  ))}

                </div>


                {/* COUPON */}

                <div className="coupon">

                  <div className="coupon-label">
                    HAVE A PROMO CODE?
                  </div>

                  <div className="coupon-row">

                    <input
                      className="coupon-input"
                      type="text"
                      value={coupon}
                      onChange={(e) =>
                        setCoupon(e.target.value)
                      }
                      placeholder="ENTER CODE"
                    />

                    <button
                      className="coupon-button"
                      onClick={applyCoupon}
                    >
                      APPLY
                    </button>

                  </div>


                  {couponApplied && (

                    <div className="coupon-success">
                      ✓ NOIR10 · 10% discount applied
                    </div>

                  )}

                </div>


                {/* PRICE */}

                <div className="price-section">

                  <div className="price-row">

                    <span>
                      Subtotal
                    </span>

                    <span>
                      ${subtotal.toFixed(2)}
                    </span>

                  </div>


                  <div className="price-row discount">

                    <span>
                      Discount
                    </span>

                    <span>
                      -${discount.toFixed(2)}
                    </span>

                  </div>


                  <div className="price-row shipping">

                    <span>
                      Shipping
                    </span>

                    <span>
                      {shipping === 0
                        ? "FREE"
                        : `$${shipping.toFixed(2)}`}
                    </span>

                  </div>


                  <div className="total-row">

                    <span className="total-label">
                      TOTAL
                    </span>

                    <span className="total-price">
                      ${total.toFixed(2)}
                    </span>

                  </div>

                </div>


                {/* PLACE ORDER */}

                <div className="place-order">

                  <button
                    className="place-order-button"
                    onClick={placeOrder}
                  >

                    PLACE ORDER

                    <ArrowForwardIcon />

                  </button>


                  <div className="secure-text">

                    <LockOutlinedIcon />

                    SECURE &amp; ENCRYPTED CHECKOUT

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;