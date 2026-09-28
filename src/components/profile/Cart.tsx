import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

type cartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
};

function Cart() {
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  ////<------------------get cart from api----------------->

  const [cart, setcart] = useState<cartItem[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5047/api/Perfume2Users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setcart(response.data.cart);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  console.log(cart);

  //---------------GEt product by id---------->
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const responses = await Promise.all(
          cart.map((item) =>
            axios.get(`http://localhost:5047/api/Perfume2/${item.productId}`),
          ),
        );

        const productData = responses.map((response, index) => ({
          ...response.data,
          quantity: cart[index].quantity,
        }));

        setProducts(productData);
      } catch (error) {
        console.log(error);
      }
    };

    if (cart.length > 0) {
      getProducts();
    }
  }, [cart]);

  const handleDecrease = async (Pid: number) => {
    try {
      await axios.patch(
        `http://localhost:5047/api/Perfume2Users/cart-decrease-quantity?id=${cart[0].userId}&pId=${Pid}`,
      );
      // Update quantity  on screen
      setcart((prevCart) =>
        prevCart.map((item) =>
          item.productId === Pid
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );

      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === Pid ? { ...item, quantity: item.quantity - 1 } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrease = async (Pid:number) => {
    try {
      await axios.patch(
        `http://localhost:5047/api/Perfume2Users/cart-increase-quantity?id=${cart[0].userId}&pId=${Pid}`,
      );
      // Update quantity immediately on screen
      setcart((prevCart) =>
        prevCart.map((item) =>
          item.productId === Pid
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === Pid ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal = products.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal == 0 ? 0 : subtotal >= 100 ? 0 : 8;

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;

  const total = subtotal + shipping - discount;

  const freeShippingRemaining = Math.max(0, 100 - subtotal);

  const shippingProgress = Math.min(100, (subtotal / 100) * 100);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NOIR10") {
      setCouponApplied(true);
    }
  };

  const handleDelete = async (PId: number) => {
    try {
      axios.delete(
        `http://localhost:5047/api/Perfume2Users/cart/${cart[0].userId}/${PId}`,
      );

      // Remove immediately from cart state
      setcart((prevCart) => prevCart.filter((item) => item.productId !== PId));

      // Remove immediately from products state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== PId),
      );
    } catch (error) {
      console.log(error);
    }
  };
 console.log(cart)
  return (
    <div className="cart-page">
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

        .cart-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 20% 10%,
              rgba(197,164,109,.055),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(197,164,109,.03),
              transparent 35%
            ),
            #080808;
          color: #f4f1eb;
        }

        .cart-container {
          width: min(1400px, 94%);
          margin: auto;
        }

        .gold {
          color: #c5a46d;
        }

        /* ====================================
           TOP AREA
        ==================================== */

        .cart-hero {
          padding: 38px 0 30px;
          text-align: center;
          border-bottom: 1px solid #1d1d1d;
          background:
            linear-gradient(
              180deg,
              rgba(197,164,109,.035),
              transparent
            );
        }

        .cart-eyebrow {
          color: #c5a46d;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 9px;
        }

        .cart-title {
          margin: 0;
          font-family: Georgia, serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: normal;
          letter-spacing: .5px;
          line-height: 1.1;
        }

        .cart-title span {
          color: #c5a46d;
          font-style: italic;
        }

        .cart-subtitle {
          margin: 10px auto 0;
          color: #666;
          font-size: 10px;
          line-height: 1.6;
          max-width: 500px;
        }

        /* ====================================
           MAIN
        ==================================== */

        .cart-main {
          padding: 60px 0 90px;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(340px, .8fr);
          gap: 35px;
          align-items: start;
        }

        /* ====================================
           LEFT SIDE
        ==================================== */

        .cart-left {
          min-width: 0;
        }

        .cart-heading-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
          padding-bottom: 15px;
          border-bottom: 1px solid #222;
        }

        .cart-heading {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 24px;
          font-weight: normal;
        }

        .cart-count {
          color: #666;
          font-size: 11px;
          letter-spacing: 1px;
        }

        /* ====================================
           CART ITEM
        ==================================== */

        .cart-item {
          position: relative;
          display: grid;
          grid-template-columns: 155px minmax(0, 1fr);
          gap: 25px;
          padding: 22px 0;
          border-bottom: 1px solid #202020;
        }

        .cart-item-image {
          height: 180px;
          background: #111;
          border: 1px solid #1f1f1f;
          overflow: hidden;
          position: relative;
        }

        .cart-item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .6s;
        }

        .cart-item:hover .cart-item-image img {
          transform: scale(1.06);
        }

        .cart-item-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .cart-brand {
          color: #c5a46d;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 7px;
        }

        .cart-item-title {
          color: #f2f0ea;
          font-family: Georgia, serif;
          font-size: 21px;
          line-height: 1.3;
          margin-right: 50px;
        }

        .cart-size {
          color: #666;
          font-size: 10px;
          letter-spacing: 1px;
          margin-top: 8px;
        }

        .cart-rating {
          color: #c5a46d;
          font-size: 10px;
          letter-spacing: 2px;
          margin-top: 10px;
        }

        .cart-item-bottom {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-top: auto;
          padding-top: 22px;
        }

        .cart-price-box {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .cart-price {
          color: #c5a46d;
          font-size: 18px;
          font-weight: 600;
        }

        .cart-old-price {
          color: #555;
          font-size: 11px;
          text-decoration: line-through;
        }

        /* ====================================
           QUANTITY
        ==================================== */

        .quantity-box {
          display: flex;
          align-items: center;
          height: 40px;
          border: 1px solid #303030;
          background: #0d0d0d;
        }
/* =========================================
   PREMIUM NOIR HEADER
========================================= */

.cart-header {
  top: 0;
  z-index: 1000;

  height: 78px;

  background:
    linear-gradient(
      180deg,
      rgba(8,8,8,.98),
      rgba(6,6,6,.96)
    );

  backdrop-filter: blur(18px);

  border-bottom: 1px solid #1d1d1d;
}

.cart-header::after {
  content: "";


  left: 0;
  bottom: -1px;

  width: 90px;
  height: 1px;

  background: #c5a46d;
}

.cart-header-inner {
  width: min(1400px, 94%);
  height: 100%;

  margin: auto;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

/* =========================================
   NOIR LOGO
========================================= */

.cart-logo {
  padding: 0;

  border: 0;

  background: transparent;

  color: #f4f1eb;

  font-family: Georgia, "Times New Roman", serif;

  font-size: 31px;

  font-weight: normal;

  letter-spacing: 7px;

  cursor: pointer;

  transition: .35s;
}

.cart-logo span {
  color: #c5a46d;
}

.cart-logo:hover {
  color: #c5a46d;
}

/* =========================================
   CONTINUE SHOPPING
========================================= */

.cart-back {
  display: flex;

  align-items: center;

  gap: 8px;

  padding: 9px 0;

  border: 0;

  border-bottom: 1px solid transparent;

  background: transparent;

  color: #666;

  font-size: 8px;

  font-weight: 700;

  letter-spacing: 1.7px;

  cursor: pointer;

  transition: .3s;
}

.cart-back:hover {
  color: #c5a46d;

  border-bottom-color: #c5a46d;
}

.cart-back svg {
  transition: .3s;
}

.cart-back:hover svg {
  transform: translateX(-3px);
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 576px) {

  .cart-header {
    height: 68px;
  }

  .cart-logo {
    font-size: 24px;

    letter-spacing: 5px;
  }

  .cart-back {
    font-size: 7px;

    letter-spacing: 1px;
  }

}
        .quantity-box button {
          width: 39px;
          height: 100%;
          border: 0;
          background: transparent;
          color: #aaa;
          cursor: pointer;
          font-size: 16px;
          transition: .3s;
        }

        .quantity-box button:hover {
          color: #c5a46d;
          background: #151515;
        }

        .quantity-number {
          width: 35px;
          text-align: center;
          color: #eee;
          font-size: 11px;
        }

        /* ====================================
           ITEM ACTIONS
        ==================================== */

        .item-actions {
          position: absolute;
          top: 22px;
          right: 0;
          display: flex;
          gap: 7px;
        }

        .item-action-btn {
          width: 34px;
          height: 34px;
          border: 1px solid #292929;
          background: #0d0d0d;
          color: #777;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .3s;
        }

        .item-action-btn:hover {
          color: #c5a46d;
          border-color: #c5a46d;
        }

        .item-action-btn.delete:hover {
          color: #b86b63;
          border-color: #6e3934;
        }

        /* ====================================
           CONTINUE SHOPPING
        ==================================== */

        .continue-shopping {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 27px;
          color: #999;
          background: transparent;
          border: 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .continue-shopping:hover {
          color: #c5a46d;
        }

        /* ====================================
           SUMMARY
        ==================================== */

        .summary-card {
          position: sticky;
          top: 95px;
          background:
            linear-gradient(
              145deg,
              #14120e,
              #0d0d0d 60%,
              #12100c
            );
          border: 1px solid #30281d;
          padding: 28px;
          overflow: hidden;
        }

        .summary-card::before {
          content: "";
          position: absolute;
          width: 170px;
          height: 170px;
          top: -90px;
          right: -80px;
          border-radius: 50%;
          background: rgba(197,164,109,.07);
          filter: blur(5px);
        }

        .summary-small {
          position: relative;
          color: #c5a46d;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .summary-title {
          position: relative;
          margin: 10px 0 25px;
          font-family: Georgia, serif;
          font-size: 29px;
          font-weight: normal;
        }

        .summary-title span {
          color: #c5a46d;
          font-style: italic;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 0;
          border-bottom: 1px solid #202020;
          color: #777;
          font-size: 11px;
        }

        .summary-row strong {
          color: #ddd;
          font-weight: 500;
        }

        .summary-row.discount strong {
          color: #c5a46d;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #393026;
        }

        .summary-total span:first-child {
          color: #ddd;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .summary-total-price {
          color: #c5a46d;
          font-family: "Cormorant Garamond", serif;
          font-size: 28px;
        }

        /* ====================================
           SHIPPING PROGRESS
        ==================================== */

        .shipping-box {
          margin: 22px 0;
          padding: 15px;
          background: rgba(197,164,109,.025);
          border: 1px solid #2c261d;
        }

        .shipping-top {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #aaa;
          font-size: 10px;
          line-height: 1.6;
        }

        .shipping-top svg {
          color: #c5a46d;
          font-size: 19px;
          flex-shrink: 0;
        }

        .shipping-progress {
          height: 4px;
          margin-top: 12px;
          background: #27231d;
          overflow: hidden;
        }

        .shipping-progress-fill {
          height: 100%;
          background: #c5a46d;
          transition: width .4s;
        }

        /* ====================================
           COUPON
        ==================================== */

        .coupon-box {
          display: flex;
          height: 44px;
          margin: 20px 0;
          border: 1px solid #2c2c2c;
          background: #090909;
        }

        .coupon-box input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: white;
          padding: 0 13px;
          font-size: 11px;
          letter-spacing: .5px;
        }

        .coupon-box input::placeholder {
          color: #555;
        }

        .coupon-box button {
          border: 0;
          border-left: 1px solid #2c2c2c;
          background: transparent;
          color: #c5a46d;
          padding: 0 16px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
        }

        .coupon-applied {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #c5a46d;
          font-size: 9px;
          margin-top: -10px;
          margin-bottom: 15px;
        }

        /* ====================================
           CHECKOUT
        ==================================== */

        .checkout-btn {
          width: 100%;
          height: 54px;
          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #080808;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          cursor: pointer;
          transition: .35s;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }

        .checkout-btn:hover {
          background: #e1c58f;
          border-color: #e1c58f;
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(197,164,109,.15);
        }

        .checkout-btn svg {
          font-size: 17px;
        }

        /* ====================================
           TRUST
        ==================================== */

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-top: 20px;
        }

        .trust-box {
          min-height: 72px;
          padding: 10px;
          border: 1px solid #222;
          background: #0b0b0b;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .trust-box svg {
          color: #c5a46d;
          font-size: 18px;
        }

        .trust-box span {
          color: #666;
          font-size: 7px;
          letter-spacing: .7px;
          line-height: 1.5;
        }

        /* ====================================
           EMPTY CART
        ==================================== */

        .empty-cart {
          padding: 90px 20px;
          border: 1px solid #202020;
          text-align: center;
          background: #0c0c0c;
        }

        .empty-icon {
          width: 85px;
          height: 85px;
          border: 1px solid #c5a46d;
          margin: 0 auto 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c5a46d;
        }

        .empty-icon svg {
          font-size: 38px;
        }

        .empty-cart h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 32px;
          font-weight: normal;
        }

        .empty-cart p {
          max-width: 430px;
          margin: 14px auto 28px;
          color: #666;
          font-size: 12px;
          line-height: 1.8;
        }

        .shop-btn {
          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #080808;
          padding: 14px 28px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
        }

        /* ====================================
           RESPONSIVE
        ==================================== */

        @media(max-width: 1050px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }

          .summary-card {
            position: relative;
            top: auto;
          }
        }

        @media(max-width: 650px) {
          .cart-hero {
            padding: 32px 0 25px;
          }

          .cart-title {
            font-size: 30px;
          }

          .cart-subtitle {
            font-size: 9px;
            padding: 0 15px;
          }

          .cart-main {
            padding: 40px 0 60px;
          }

          .cart-item {
            grid-template-columns: 105px minmax(0, 1fr);
            gap: 15px;
          }

          .cart-item-image {
            height: 135px;
          }

          .cart-item-title {
            font-size: 16px;
            margin-right: 40px;
          }

          .cart-item-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }

          .item-actions {
            top: 12px;
          }

          .item-action-btn {
            width: 30px;
            height: 30px;
          }

          .summary-card {
            padding: 22px;
          }

          .trust-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      {/* =========================================
    PREMIUM NOIR HEADER
========================================= */}

      <header className="cart-header">
        <div className="cart-header-inner">
          {/* NOIR LOGO */}
          <button className="cart-logo" onClick={() => navigate("/")}>
            NOIR<span>.</span>
          </button>

          {/* RIGHT SIDE */}
          <button className="cart-back" onClick={() => navigate("/")}>
            <ArrowBackIcon sx={{ fontSize: 15 }} />
            CONTINUE SHOPPING
          </button>
        </div>
      </header>

      {/* ====================================
          HERO
      ==================================== */}

      <section className="cart-hero">
        <div className="cart-container">
          <div className="cart-eyebrow">NOIR • COLLECTION</div>

          <h1 className="cart-title">
            YOUR <span>CART</span>
          </h1>

          <p className="cart-subtitle">
            Curated fragrances, selected for your signature.
          </p>
        </div>
      </section>

      {/* ====================================
          MAIN
      ==================================== */}

      <main className="cart-main">
        <div className="cart-container">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-icon">
                <ShoppingBagOutlinedIcon />
              </div>

              <h2>
                Your <span className="gold">cart is empty</span>
              </h2>

              <p>
                Discover your next signature fragrance and add something
                exceptional to your collection.
              </p>

              <button className="shop-btn" onClick={() => navigate("/search")}>
                EXPLORE COLLECTION
              </button>
            </div>
          ) : (
            <div className="cart-grid">
              {/* ====================================
                  LEFT
              ==================================== */}

              <div className="cart-left">
                <div className="cart-heading-row">
                  <h2 className="cart-heading">Your Selection</h2>

                  <div className="cart-count">{products.length} ITEMS</div>
                </div>

                {products.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-image">
                      <img src={item.imageUrl} alt={item.title} />
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-brand">{item.brand}</div>

                      <div className="cart-item-title">{item.title}</div>

                      <div className="cart-size">
                        {item.sizeML} ML • EAU DE PARFUM
                      </div>

                      <div className="cart-rating">★★★★★</div>

                      <div className="cart-item-bottom">
                        <div className="cart-price-box">
                          <span className="cart-price">$ {item.price}</span>

                          {item.oldPrice && (
                            <span className="cart-old-price">
                              $ {item.oldPrice}
                            </span>
                          )}
                        </div>

                        <div className="quantity-box">
                          {item.quantity <= 1 ? (
                            <button disabled>−</button>
                          ) : (
                            <button onClick={() => handleDecrease(item.id)}>
                              −
                            </button>
                          )}

                          <span className="quantity-number">
                            {item.quantity}
                          </span>

                          <button onClick={() => handleIncrease(item.id)}>
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="item-actions">
                      <button
                        className="item-action-btn"
                        title="Move to wishlist"
                      >
                        <FavoriteBorderIcon sx={{ fontSize: 17 }} />
                      </button>

                      <button
                        className="item-action-btn delete"
                        title="Remove item"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  className="continue-shopping"
                  onClick={() => navigate("/")}
                >
                  <ArrowBackIcon sx={{ fontSize: 16 }} />
                  CONTINUE SHOPPING
                </button>
              </div>

              {/* ====================================
                  RIGHT SUMMARY
              ==================================== */}

              <aside className="summary-card">
                <div className="summary-small">NOIR CHECKOUT</div>

                <h2 className="summary-title">
                  ORDER <span>SUMMARY</span>
                </h2>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <strong>$ {subtotal.toFixed(2)}</strong>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <strong>{shipping === 0 ? "FREE" : `$ ${shipping}`}</strong>
                </div>

                {couponApplied && (
                  <div className="summary-row discount">
                    <span>NOIR10 Discount</span>
                    <strong>− $ {discount}</strong>
                  </div>
                )}

                {/* SHIPPING */}

                <div className="shipping-box">
                  <div className="shipping-top">
                    <LocalShippingOutlinedIcon />

                    <span>
                      {shipping === 0
                        ? "Congratulations. You unlocked free shipping."
                        : `Add $${freeShippingRemaining} more for FREE shipping.`}
                    </span>
                  </div>

                  <div className="shipping-progress">
                    <div
                      className="shipping-progress-fill"
                      style={{
                        width: `${shippingProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* COUPON */}

                <div className="coupon-box">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />

                  <button onClick={applyCoupon}>APPLY</button>
                </div>

                {couponApplied && (
                  <div className="coupon-applied">
                    <CheckCircleIcon sx={{ fontSize: 15 }} />
                    NOIR10 APPLIED — 10% OFF
                  </div>
                )}

                {/* TOTAL */}

                <div className="summary-total">
                  <span>TOTAL</span>

                  <span className="summary-total-price">
                    $ {total.toFixed(2)}
                  </span>
                </div>

                {/* CHECKOUT */}

                <button
                  className="checkout-btn"
                  onClick={() =>
                    navigate("/checkout", {
                      state: {
                        Cart: cart,
                      },
                    })
                  }
                >
                  PROCEED TO CHECKOUT
                  <ArrowForwardIcon />
                </button>

                {/* TRUST */}

                <div className="trust-grid">
                  <div className="trust-box">
                    <SecurityOutlinedIcon />
                    <span>
                      SECURE
                      <br />
                      PAYMENT
                    </span>
                  </div>

                  <div className="trust-box">
                    <LocalShippingOutlinedIcon />
                    <span>
                      FAST
                      <br />
                      DELIVERY
                    </span>
                  </div>

                  <div className="trust-box">
                    <LockOutlinedIcon />
                    <span>
                      DATA
                      <br />
                      PROTECTED
                    </span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Cart;
