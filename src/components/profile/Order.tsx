import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "bootstrap/dist/css/bootstrap.min.css";

function Order() {
  const navigate = useNavigate();

  // =========================
  // SAMPLE ORDER DATA
  // =========================

  const order = {
    orderNumber: "NOIR-2026-00128",
    orderDate: "26 September 2026",
    status: "SHIPPED",

    items: [
      {
        id: 1,
        brand: "NOIR",
        title: "NOIR Intense EDP",
        size: "100 ML",
        quantity: 1,
        price: 89,
        image:
          "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=90",
      },
      {
        id: 2,
        brand: "VELVET",
        title: "VELVET Rose",
        size: "50 ML",
        quantity: 2,
        price: 65,
        image:
          "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=600&q=90",
      },
    ],

    subtotal: 219,
    discount: 21.9,
    shipping: 0,
    total: 197.1,

    address: {
      name: "Gulshan Kumar",
      phone: "+91 98765 43210",
      line1: "Greater Noida West",
      line2: "Uttar Pradesh, India - 201306",
    },

    payment: {
      method: "Cash on Delivery",
      status: "Pending",
    },
  };

  return (
    <div className="order-page">

      {/* =========================
          STYLE
      ========================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #080808;
          color: #f4f1eb;
          font-family: Arial, Helvetica, sans-serif;
        }

        .order-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 20% 10%,
              rgba(197,164,109,.045),
              transparent 28%
            ),
            radial-gradient(
              circle at 85% 60%,
              rgba(197,164,109,.025),
              transparent 30%
            ),
            #080808;
        }

        .container-order {
          width: min(1250px, 94%);
          margin: auto;
        }

        .gold {
          color: #c5a46d;
        }

        /* =========================
           HEADER
        ========================= */

        .order-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(8,8,8,.94);
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #202020;
        }

        .order-logo {
          font-family: Georgia, serif;
          font-size: 30px;
          letter-spacing: 6px;
          color: #f4f1eb;
          text-decoration: none;
        }

        .order-logo span {
          color: #c5a46d;
        }

        .back-btn {
          color: #aaa !important;
          border: 1px solid #292929 !important;
          width: 40px;
          height: 40px;
          transition: .3s !important;
        }

        .back-btn:hover {
          color: #c5a46d !important;
          border-color: #c5a46d !important;
        }

        /* =========================
           PAGE TITLE
        ========================= */

        .order-heading {
          padding: 65px 0 35px;
          border-bottom: 1px solid #1c1c1c;
        }

        .order-small {
          color: #c5a46d;
          font-size: 9px;
          letter-spacing: 4px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .order-heading h1 {
          font-family: Georgia, serif;
          font-size: 48px;
          font-weight: normal;
          margin: 0;
        }

        .order-heading h1 span {
          color: #c5a46d;
          font-style: italic;
        }

        .order-heading p {
          color: #666;
          font-size: 12px;
          margin: 12px 0 0;
        }

        /* =========================
           ORDER TOP CARD
        ========================= */

        .order-summary-card {
          margin-top: 35px;
          border: 1px solid #292929;
          background:
            linear-gradient(
              135deg,
              #12100d,
              #0c0c0c 55%,
              #12100d
            );
          padding: 28px;
        }

        .order-summary-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .order-label {
          color: #555;
          font-size: 8px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .order-number {
          color: #eee;
          font-family: Georgia, serif;
          font-size: 19px;
        }

        .order-date {
          color: #777;
          font-size: 11px;
        }

        .status-badge {
          border: 1px solid #c5a46d;
          color: #c5a46d;
          padding: 9px 17px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        /* =========================
           TRACKING
        ========================= */

        .tracking-box {
          margin-top: 25px;
          border: 1px solid #202020;
          background: #0d0d0d;
          padding: 30px;
        }

        .tracking-title {
          font-family: Georgia, serif;
          font-size: 22px;
          margin-bottom: 35px;
        }

        .tracking-line {
          position: relative;
          display: flex;
          justify-content: space-between;
        }

        .tracking-line::before {
          content: "";
          position: absolute;
          top: 16px;
          left: 8%;
          right: 8%;
          height: 1px;
          background: #333;
        }

        .tracking-progress {
          position: absolute;
          top: 16px;
          left: 8%;
          width: 58%;
          height: 1px;
          background: #c5a46d;
        }

        .tracking-step {
          position: relative;
          z-index: 2;
          text-align: center;
          width: 25%;
        }

        .tracking-icon {
          width: 34px;
          height: 34px;
          margin: auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #101010;
          border: 1px solid #444;
          color: #555;
        }

        .tracking-step.active .tracking-icon {
          background: #c5a46d;
          border-color: #c5a46d;
          color: #080808;
        }

        .tracking-step.current .tracking-icon {
          border-color: #c5a46d;
          color: #c5a46d;
          box-shadow: 0 0 0 5px rgba(197,164,109,.07);
        }

        .tracking-step strong {
          display: block;
          margin-top: 12px;
          color: #aaa;
          font-size: 9px;
          letter-spacing: 1px;
        }

        .tracking-step.active strong,
        .tracking-step.current strong {
          color: #c5a46d;
        }

        .tracking-step small {
          display: block;
          color: #444;
          margin-top: 5px;
          font-size: 8px;
        }

        /* =========================
           MAIN GRID
        ========================= */

        .order-content {
          padding: 35px 0 80px;
        }

        .content-card {
          border: 1px solid #202020;
          background: #0d0d0d;
          margin-bottom: 20px;
        }

        .card-heading {
          padding: 22px 25px;
          border-bottom: 1px solid #202020;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-heading svg {
          color: #c5a46d;
          font-size: 20px;
        }

        .card-heading h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 20px;
          font-weight: normal;
        }

        /* =========================
           PRODUCT
        ========================= */

        .order-product {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 25px;
          border-bottom: 1px solid #1b1b1b;
        }

        .order-product:last-child {
          border-bottom: 0;
        }

        .product-image {
          width: 105px;
          height: 125px;
          background: #151515;
          overflow: hidden;
          flex-shrink: 0;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .5s;
        }

        .product-image:hover img {
          transform: scale(1.07);
        }

        .product-details {
          flex: 1;
        }

        .product-brand {
          color: #c5a46d;
          font-size: 8px;
          letter-spacing: 3px;
          font-weight: 700;
        }

        .product-title {
          color: #eee;
          font-family: Georgia, serif;
          font-size: 17px;
          margin: 8px 0;
        }

        .product-meta {
          color: #555;
          font-size: 10px;
        }

        .product-quantity {
          color: #777;
          font-size: 10px;
          margin-top: 8px;
        }

        .product-price {
          text-align: right;
          color: #c5a46d;
          font-size: 16px;
          font-weight: 600;
        }

        .view-product {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 12px;
          color: #666;
          background: transparent;
          border: 0;
          font-size: 8px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: .3s;
        }

        .view-product:hover {
          color: #c5a46d;
        }

        /* =========================
           ADDRESS
        ========================= */

        .address-content {
          padding: 25px;
        }

        .address-name {
          color: #eee;
          font-family: Georgia, serif;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .address-text {
          color: #777;
          font-size: 11px;
          line-height: 1.9;
        }

        .phone {
          color: #aaa;
          margin-top: 10px;
          font-size: 10px;
        }

        /* =========================
           PAYMENT
        ========================= */

        .payment-content {
          padding: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .payment-icon {
          width: 45px;
          height: 45px;
          border: 1px solid #333;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c5a46d;
        }

        .payment-method {
          color: #ddd;
          font-size: 12px;
        }

        .payment-status {
          color: #777;
          font-size: 9px;
          margin-top: 5px;
        }

        /* =========================
           PRICE SUMMARY
        ========================= */

        .price-card {
          border: 1px solid #302a20;
          background:
            linear-gradient(
              135deg,
              #15120d,
              #0d0d0d
            );
          padding: 28px;
        }

        .price-card h2 {
          margin: 0 0 25px;
          font-family: Georgia, serif;
          font-size: 23px;
          font-weight: normal;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          padding: 11px 0;
          color: #777;
          font-size: 11px;
          border-bottom: 1px solid #1c1c1c;
        }

        .price-row.discount span:last-child {
          color: #c5a46d;
        }

        .price-row.total {
          border-bottom: 0;
          padding-top: 20px;
          margin-top: 5px;
        }

        .price-row.total span:first-child {
          color: #eee;
          font-size: 13px;
        }

        .price-row.total span:last-child {
          color: #c5a46d;
          font-family: Georgia, serif;
          font-size: 24px;
        }

        /* =========================
           BUTTONS
        ========================= */

        .order-buttons {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .gold-button {
          flex: 1;
          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #080808;
          padding: 13px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .gold-button:hover {
          background: #e1c58f;
          border-color: #e1c58f;
          transform: translateY(-2px);
        }

        .dark-button {
          flex: 1;
          border: 1px solid #333;
          background: transparent;
          color: #aaa;
          padding: 13px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .dark-button:hover {
          color: #c5a46d;
          border-color: #c5a46d;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media(max-width: 768px) {

          .order-heading {
            padding: 45px 0 30px;
          }

          .order-heading h1 {
            font-size: 38px;
          }

          .order-summary-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .tracking-box {
            padding: 20px 10px;
          }

          .tracking-line::before,
          .tracking-progress {
            display: none;
          }

          .tracking-line {
            flex-direction: column;
            gap: 20px;
          }

          .tracking-step {
            width: 100%;
            display: flex;
            align-items: center;
            text-align: left;
            gap: 15px;
          }

          .tracking-icon {
            margin: 0;
            flex-shrink: 0;
          }

          .tracking-step strong {
            margin: 0;
          }

          .tracking-step small {
            margin-top: 4px;
          }

          .product-image {
            width: 80px;
            height: 100px;
          }

          .product-title {
            font-size: 14px;
          }

          .product-price {
            font-size: 13px;
          }
        }

        @media(max-width: 500px) {

          .order-logo {
            font-size: 22px;
            letter-spacing: 4px;
          }

          .order-summary-card {
            padding: 20px;
          }

          .order-product {
            padding: 18px 15px;
            gap: 12px;
            align-items: flex-start;
          }

          .product-image {
            width: 70px;
            height: 90px;
          }

          .product-price {
            min-width: 55px;
          }

          .product-meta {
            font-size: 9px;
          }

          .order-buttons {
            flex-direction: column;
          }

          .card-heading {
            padding: 18px;
          }

          .address-content,
          .payment-content {
            padding: 20px;
          }
        }

      `}</style>


      {/* =========================
          HEADER
      ========================= */}

      <AppBar
        position="sticky"
        elevation={0}
        className="order-header"
      >
        <Toolbar className="container-order d-flex justify-content-between">

          <div className="d-flex align-items-center gap-3">

            <IconButton
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>

            <a
              href="/"
              className="order-logo"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              NOIR<span>.</span>
            </a>

          </div>

          <IconButton
            sx={{ color: "#aaa" }}
            onClick={() => navigate("/cart")}
          >
            <ShoppingBagOutlinedIcon />
          </IconButton>

        </Toolbar>
      </AppBar>


      {/* =========================
          PAGE HEADING
      ========================= */}

      <div className="container-order">

        <section className="order-heading">

          <div className="order-small">
            YOUR PURCHASE
          </div>

          <h1>
            Order <span>Details</span>
          </h1>

          <p>
            Thank you for choosing NOIR. Your fragrance is on its way.
          </p>

        </section>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="order-summary-card">

          <div className="order-summary-top">

            <div>

              <div className="order-label">
                ORDER NUMBER
              </div>

              <div className="order-number">
                {order.orderNumber}
              </div>

              <div className="order-date">
                Placed on {order.orderDate}
              </div>

            </div>

            <div className="status-badge">
              {order.status}
            </div>

          </div>

        </div>


        {/* =========================
            TRACKING
        ========================= */}

        <div className="tracking-box">

          <div className="tracking-title">
            Order <span className="gold">Journey</span>
          </div>

          <div className="tracking-line">

            <div className="tracking-progress"></div>

            {/* STEP 1 */}

            <div className="tracking-step active">

              <div className="tracking-icon">
                <CheckCircleIcon  fontSize="small" />
              </div>

              <div>
                <strong>ORDERED</strong>
                <small>26 Sep</small>
              </div>

            </div>


            {/* STEP 2 */}

            <div className="tracking-step active">

              <div className="tracking-icon">
                <CheckCircleIcon  fontSize="small" />
              </div>

              <div>
                <strong>CONFIRMED</strong>
                <small>26 Sep</small>
              </div>

            </div>


            {/* STEP 3 */}

            <div className="tracking-step current">

              <div className="tracking-icon">
                <LocalShippingOutlinedIcon fontSize="small" />
              </div>

              <div>
                <strong>SHIPPED</strong>
                <small>On the way</small>
              </div>

            </div>


            {/* STEP 4 */}

            <div className="tracking-step">

              <div className="tracking-icon">
                <HomeOutlinedIcon fontSize="small" />
              </div>

              <div>
                <strong>DELIVERED</strong>
                <small>Expected soon</small>
              </div>

            </div>

          </div>

        </div>


        {/* =========================
            MAIN CONTENT
        ========================= */}

        <div className="order-content">

          <div className="row g-4">

            {/* =====================
                LEFT
            ===================== */}

            <div className="col-lg-8">


              {/* PRODUCTS */}

              <div className="content-card">

                <div className="card-heading">

                  <ShoppingBagOutlinedIcon />

                  <h2>
                    Ordered <span className="gold">Fragrances</span>
                  </h2>

                </div>


                {order.items.map((item) => (

                  <div
                    className="order-product"
                    key={item.id}
                  >

                    <div className="product-image">

                      <img
                        src={item.image}
                        alt={item.title}
                      />

                    </div>


                    <div className="product-details">

                      <div className="product-brand">
                        {item.brand}
                      </div>

                      <div className="product-title">
                        {item.title}
                      </div>

                      <div className="product-meta">
                        Size: {item.size}
                      </div>

                      <div className="product-quantity">
                        Quantity: {item.quantity}
                      </div>

                      <button
                        className="view-product"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        VIEW PRODUCT
                        <ArrowForwardIcon
                          sx={{ fontSize: 12 }}
                        />
                      </button>

                    </div>


                    <div className="product-price">
                      ${item.price * item.quantity}
                    </div>

                  </div>

                ))}

              </div>


              {/* SHIPPING ADDRESS */}

              <div className="content-card">

                <div className="card-heading">

                  <HomeOutlinedIcon />

                  <h2>
                    Shipping <span className="gold">Address</span>
                  </h2>

                </div>

                <div className="address-content">

                  <div className="address-name">
                    {order.address.name}
                  </div>

                  <div className="address-text">
                    {order.address.line1}
                    <br />
                    {order.address.line2}
                  </div>

                  <div className="phone">
                    {order.address.phone}
                  </div>

                </div>

              </div>


              {/* PAYMENT */}

              <div className="content-card">

                <div className="card-heading">

                  <CreditCardOutlinedIcon />

                  <h2>
                    Payment <span className="gold">Information</span>
                  </h2>

                </div>

                <div className="payment-content">

                  <div className="payment-icon">
                    <CreditCardOutlinedIcon />
                  </div>

                  <div>

                    <div className="payment-method">
                      {order.payment.method}
                    </div>

                    <div className="payment-status">
                      Payment status: {order.payment.status}
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =====================
                RIGHT
            ===================== */}

            <div className="col-lg-4">


              {/* PRICE */}

              <div className="price-card">

                <h2>
                  Order <span className="gold">Summary</span>
                </h2>


                <div className="price-row">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ${order.subtotal.toFixed(2)}
                  </span>

                </div>


                <div className="price-row discount">

                  <span>
                    Discount
                  </span>

                  <span>
                    -${order.discount.toFixed(2)}
                  </span>

                </div>


                <div className="price-row">

                  <span>
                    Shipping
                  </span>

                  <span>
                    {order.shipping === 0
                      ? "FREE"
                      : `$${order.shipping.toFixed(2)}`}
                  </span>

                </div>


                <div className="price-row total">

                  <span>
                    TOTAL
                  </span>

                  <span>
                    ${order.total.toFixed(2)}
                  </span>

                </div>


                <div className="order-buttons">

                  <button
                    className="gold-button"
                    onClick={() =>
                      alert("Tracking feature coming soon")
                    }
                  >
                    TRACK ORDER
                  </button>

                  <button
                    className="dark-button"
                    onClick={() => navigate("/")}
                  >
                    CONTINUE SHOPPING
                  </button>

                </div>

              </div>


              {/* DELIVERY CARD */}

              <div
                className="content-card"
                style={{ marginTop: "20px" }}
              >

                <div className="card-heading">

                  <LocalShippingOutlinedIcon />

                  <h2>
                    Delivery <span className="gold">Promise</span>
                  </h2>

                </div>

                <div className="address-content">

                  <div className="address-name">
                    Premium Delivery
                  </div>

                  <div className="address-text">
                    Your fragrance is carefully packed
                    and protected for a safe delivery.
                  </div>

                  <div className="phone">
                    Estimated delivery: 29 September 2026
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Order;
