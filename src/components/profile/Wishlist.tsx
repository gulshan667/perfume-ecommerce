import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Delete from "@mui/icons-material/Delete";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import axios from "axios";

type WishlistItem = {
  id: number;
  userId: number;
  productId: number;
};

const Wishlist = () => {
  const navigate = useNavigate();

  // Wishlist data from database
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Full product data
  const [wishlistProduct, setWishlistProduct] = useState<any[]>([]);

  // Cart data
  const [cartItems, setCartItems] = useState<any[]>([]);

  // =========================
  // GET USER WISHLIST + CART
  // =========================
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5047/api/Perfume2Users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWishlist(response.data.wishlist || []);
        setCartItems(response.data.cart || []);
      } catch (error) {
        console.log("Get user error:", error);
      }
    };

    getUser();
  }, [navigate]);

  // =========================
  // GET PRODUCT DETAILS
  // =========================
  useEffect(() => {
    const getProducts = async () => {
      try {
        const responses = await Promise.all(
          wishlist.map((item) =>
            axios.get(
              `http://localhost:5047/api/Perfume2/${item.productId}`
            )
          )
        );

        const productData = responses.map((response) => response.data);

        setWishlistProduct(productData);
      } catch (error) {
        console.log("Get wishlist products error:", error);
      }
    };

    if (wishlist.length > 0) {
      getProducts();
    } else {
      setWishlistProduct([]);
    }
  }, [wishlist]);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const wishlistItem = wishlist.find(
      (item) => Number(item.productId) === Number(productId)
    );

    if (!wishlistItem) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5047/api/Perfume2Users/add-cart",
        {
          userId: Number(wishlistItem.userId),
          productId: Number(productId),
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prevCart) => {
        const existing = prevCart.find(
          (item) =>
            Number(item.productId) === Number(productId)
        );

        if (existing) {
          return prevCart.map((item) =>
            Number(item.productId) === Number(productId)
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...prevCart,
          {
            id: response.data.id,
            userId: Number(wishlistItem.userId),
            productId: Number(productId),
            quantity: 1,
          },
        ];
      });
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  // =========================
  // INCREASE CART QUANTITY
  // =========================
  const handleIncrease = async (productId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const wishlistItem = wishlist.find(
      (item) =>
        Number(item.productId) === Number(productId)
    );

    if (!wishlistItem) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5047/api/Perfume2Users/cart-increase-quantity?id=${wishlistItem.userId}&pId=${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prevCart) =>
        prevCart.map((item) =>
          Number(item.productId) === Number(productId)
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } catch (error) {
      console.log("Increase error:", error);
    }
  };

  // =========================
  // DECREASE CART QUANTITY
  // =========================
  const handleDecrease = async (productId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const cartItem = cartItems.find(
      (item) =>
        Number(item.productId) === Number(productId)
    );

    const wishlistItem = wishlist.find(
      (item) =>
        Number(item.productId) === Number(productId)
    );

    if (!cartItem || !wishlistItem) {
      return;
    }

    // Don't go below 1
    if (Number(cartItem.quantity) <= 1) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5047/api/Perfume2Users/cart-decrease-quantity?id=${wishlistItem.userId}&pId=${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((prevCart) =>
        prevCart.map((item) =>
          Number(item.productId) === Number(productId)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
      );
    } catch (error) {
      console.log("Decrease error:", error);
    }
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================
  const handleRemoveWishlist = async (productId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const wishlistItem = wishlist.find(
      (item) =>
        Number(item.productId) === Number(productId)
    );

    if (!wishlistItem) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5047/api/Perfume2Users/wishlist/${wishlistItem.userId}/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove from wishlist database state
      setWishlist((prev) =>
        prev.filter(
          (item) =>
            Number(item.productId) !== Number(productId)
        )
      );

      // Remove product from UI
      setWishlistProduct((prev) =>
        prev.filter(
          (item) =>
            Number(item.id) !== Number(productId)
        )
      );
    } catch (error) {
      console.log("Remove wishlist error:", error);
    }
  };

  return (
    <>
      <style>{`
        .wishlist-page {
          min-height: 100vh;
          background: #080808;
          color: #fff;
          padding-bottom: 100px;
        }

        .wishlist-topbar {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 18px 7%;
        }

        .wishlist-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          color: #999;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: 0.3s;
        }

        .wishlist-back:hover {
          color: #c5a46d;
        }

        .wishlist-back-icon {
          font-size: 15px !important;
        }

        .wishlist-container {
          width: 86%;
          max-width: 1250px;
          margin: 0 auto;
          padding-top: 50px;
        }

        .wishlist-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-bottom: 20px;
        }

        .wishlist-subtitle {
          color: #c5a46d;
          font-size: 10px;
          letter-spacing: 4px;
          margin-bottom: 12px;
        }

        .wishlist-title {
          margin: 0;
          font-family: Georgia, serif;
          font-weight: 400;
          font-size: 50px;
          line-height: 1.1;
        }

        .wishlist-description {
          color: #777;
          font-size: 13px;
          margin: 12px 0 0;
        }

        .wishlist-count {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #c5a46d;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .wishlist-heart {
          font-size: 18px !important;
        }

        .wishlist-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .wishlist-item {
          display: grid;
          grid-template-columns: 220px 1fr auto;
          align-items: center;
          gap: 35px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .wishlist-image-wrapper {
          height: 250px;
          overflow: hidden;
          background: #111;
          position: relative;
        }

        .wishlist-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .wishlist-image-wrapper:hover .wishlist-image {
          transform: scale(1.05);
        }

        .wishlist-sale {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #c5a46d;
          color: #080808;
          padding: 6px 9px;
          font-size: 8px;
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        .wishlist-brand {
          color: #c5a46d;
          font-size: 9px;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }

        .wishlist-product-title {
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: 400;
          margin: 0 0 8px;
        }

        .wishlist-category {
          color: #777;
          font-size: 11px;
          letter-spacing: 1px;
          margin-bottom: 16px;
        }

        .wishlist-rating {
          color: #c5a46d;
          font-size: 12px;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .wishlist-rating-number {
          color: #777;
          margin-left: 8px;
          letter-spacing: 0;
        }

        .wishlist-notes {
          color: #888;
          font-size: 12px;
          margin-bottom: 20px;
        }

        .wishlist-price-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wishlist-price {
          font-family: Georgia, serif;
          font-size: 25px;
          color: #fff;
        }

        .wishlist-old-price {
          color: #666;
          font-size: 13px;
          text-decoration: line-through;
        }

        .wishlist-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 170px;
        }

        .wishlist-add-btn,
        .wishlist-remove-btn {
          width: 100%;
          min-height: 46px;
          padding: 13px 20px;
          cursor: pointer;
          font-size: 9px;
          letter-spacing: 1.8px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          transition: 0.3s ease;
        }

        .wishlist-add-btn {
          border: none;
          background: #c5a46d;
          color: #080808;
          font-weight: 600;
        }

        .wishlist-add-btn:hover {
          background: #d6b982;
        }

        .wishlist-remove-btn {
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          color: #999;
        }

        .wishlist-remove-btn:hover {
          border-color: #c5a46d;
          color: #c5a46d;
        }

        .wishlist-add-btn svg,
        .wishlist-remove-btn svg {
          font-size: 17px;
        }

        /* =========================
           QUANTITY CONTROL
        ========================= */

        .wishlist-quantity-control {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #333;
          background: #0b0b0b;
        }

        .wishlist-quantity-btn {
          width: 45px;
          height: 100%;
          border: 0;
          background: transparent;
          color: #c5a46d;
          font-size: 20px;
          cursor: pointer;
          transition: 0.3s;
        }

        .wishlist-quantity-btn:hover {
          background: #c5a46d;
          color: #000;
        }

        .wishlist-quantity-number {
          flex: 1;
          text-align: center;
          color: #eee;
          font-size: 12px;
          font-weight: 600;
        }

        /* =========================
           EMPTY WISHLIST
        ========================= */

        .wishlist-empty {
          text-align: center;
          padding: 100px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .wishlist-empty-icon {
          color: #c5a46d;
          font-size: 55px !important;
          margin-bottom: 20px;
        }

        .wishlist-empty-title {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 32px;
          font-weight: 400;
        }

        .wishlist-empty-text {
          color: #777;
          font-size: 13px;
          margin: 12px 0 25px;
        }

        .wishlist-shop-btn {
          display: inline-block;
          padding: 13px 25px;
          background: #c5a46d;
          color: #080808;
          text-decoration: none;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          transition: 0.3s;
        }

        .wishlist-shop-btn:hover {
          background: #d6b982;
          color: #080808;
        }

        /* =========================
           BOTTOM
        ========================= */

        .wishlist-bottom {
          margin-top: 45px;
          padding: 28px 30px;
          border: 1px solid rgba(197, 164, 109, 0.18);
          background: rgba(197, 164, 109, 0.03);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 25px;
        }

        .wishlist-bottom-title {
          color: #c5a46d;
          font-size: 10px;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .wishlist-bottom-text {
          color: #777;
          font-size: 12px;
        }

        .wishlist-explore {
          text-decoration: none;
          color: #c5a46d;
          font-size: 10px;
          letter-spacing: 2px;
          border-bottom: 1px solid #c5a46d;
          padding-bottom: 5px;
          white-space: nowrap;
          transition: 0.3s;
        }

        .wishlist-explore:hover {
          color: #fff;
          border-color: #fff;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 900px) {
          .wishlist-item {
            grid-template-columns: 180px 1fr;
          }

          .wishlist-actions {
            grid-column: 2;
            flex-direction: row;
            min-width: unset;
          }

          .wishlist-add-btn,
          .wishlist-remove-btn,
          .wishlist-quantity-control {
            flex: 1;
          }
        }

        @media (max-width: 650px) {
          .wishlist-container {
            width: 90%;
            padding-top: 45px;
          }

          .wishlist-header {
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 35px;
          }

          .wishlist-title {
            font-size: 38px;
          }

          .wishlist-item {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .wishlist-image-wrapper {
            height: 330px;
          }

          .wishlist-actions {
            grid-column: auto;
            flex-direction: column;
          }

          .wishlist-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>

      <div className="wishlist-page">

        {/* =========================
            TOP BAR
        ========================= */}
        <div className="wishlist-topbar">
          <Link to="/" className="wishlist-back">
            <ArrowBackIcon className="wishlist-back-icon" />
            Continue Shopping
          </Link>
        </div>

        <div className="wishlist-container">

          {/* =========================
              HEADER
          ========================= */}
          <div className="wishlist-header">
            <div>
              <div className="wishlist-subtitle">
                SAVED FOR LATER
              </div>

              <h1 className="wishlist-title">
                Wishlist
              </h1>

              <p className="wishlist-description">
                Your collection of fragrances worth remembering.
              </p>
            </div>

            <div className="wishlist-count">
              <FavoriteIcon className="wishlist-heart" />
              {wishlistProduct.length} SAVED ITEMS
            </div>
          </div>

          <div className="wishlist-divider"></div>

          {/* =========================
              WISHLIST PRODUCTS
          ========================= */}

          {wishlistProduct.length === 0 ? (
            <div className="wishlist-empty">
              <FavoriteIcon className="wishlist-empty-icon" />

              <h2 className="wishlist-empty-title">
                Your Wishlist Is Empty
              </h2>

              <p className="wishlist-empty-text">
                Save your favorite fragrances here and come back anytime.
              </p>

              <Link to="/#shop" className="wishlist-shop-btn">
                EXPLORE PRODUCTS
              </Link>
            </div>
          ) : (
            wishlistProduct.map((item) => {
              const cartItem = cartItems.find(
                (cart) =>
                  Number(cart.productId) === Number(item.id)
              );

              return (
                <div
                  className="wishlist-item"
                  key={item.id}
                >

                  {/* IMAGE */}
                  <div className="wishlist-image-wrapper">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="wishlist-image"
                    />

                    {item.oldPrice && (
                      <span className="wishlist-sale">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="wishlist-details">

                    <div className="wishlist-brand">
                      {item.brand}
                    </div>

                    <h2 className="wishlist-product-title">
                      {item.title}
                    </h2>

                    <div className="wishlist-category">
                      {item.fragranceFamily}
                    </div>

                    <div className="wishlist-rating">
                      ★★★★★

                      <span className="wishlist-rating-number">
                        ({item.rating})
                      </span>
                    </div>

                    <p className="wishlist-notes">
                      {item.fragranceType}
                    </p>

                    <div className="wishlist-price-area">
                      <span className="wishlist-price">
                        $ {item.price}
                      </span>

                      {item.oldPrice && (
                        <span className="wishlist-old-price">
                          $ {item.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="wishlist-actions">

                    {/* CART */}
                    {cartItem ? (
                      <div className="wishlist-quantity-control">

                        <button
                          className="wishlist-quantity-btn"
                          onClick={() =>
                            handleDecrease(item.id)
                          }
                        >
                          −
                        </button>

                        <span className="wishlist-quantity-number">
                          {cartItem.quantity}
                        </span>

                        <button
                          className="wishlist-quantity-btn"
                          onClick={() =>
                            handleIncrease(item.id)
                          }
                        >
                          +
                        </button>

                      </div>
                    ) : (
                      <button
                        className="wishlist-add-btn"
                        onClick={() =>
                          handleAddToCart(item.id)
                        }
                      >
                        <ShoppingBagOutlinedIcon />
                        ADD TO CART
                      </button>
                    )}

                    {/* REMOVE WISHLIST */}
                    <button
                      className="wishlist-remove-btn"
                      onClick={() =>
                        handleRemoveWishlist(item.id)
                      }
                    >
                      <Delete />
                      REMOVE
                    </button>

                  </div>
                </div>
              );
            })
          )}

          {/* =========================
              BOTTOM
          ========================= */}
          <div className="wishlist-bottom">
            <div>
              <div className="wishlist-bottom-title">
                YOUR WISHLIST
              </div>

              <div className="wishlist-bottom-text">
                Items in your wishlist are saved for your next visit.
              </div>
            </div>

            <Link
              to="/#shop"
              className="wishlist-explore"
            >
              EXPLORE MORE →
            </Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Wishlist;