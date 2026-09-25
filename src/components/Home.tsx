import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Drawer,
} from "@mui/material";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const brands = ["NOIR", "LUXE", "AURA", "VELVET", "ESSENCE", "MONARCH"];

export interface Perfume {
  id: number;
  title: string;
  brand: string;
  rating: number;
  price: number;
  gender: string;
  imageUrl: string;
  sizeML: number;
  oldPrice?: number;
  fragranceType?: string;
  fragranceFamily?: string;
  collection?: string;
  isSale: boolean;
  salePercentage?: number;
  isFeatured: boolean;
  isBestSelling: boolean;
  isLatest: number;
}

function Home() {
  const [perfumes, setperfumes] = useState<Perfume[]>([]);
  const [activeTab, setActiveTab] = useState("Latest Products");
  const [cart, setCart] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Mobile drawer
  const [drawer, setDrawer] = useState(false);

  // Premium user drawer
  const [userDrawer, setUserDrawer] = useState(false);

  const [hero, setHero] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<any[]>([]);

  const [loginuser, setloginuser] = useState({
    id: "",
    name: "",
    email: "",
    cart: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setisLoggedIn(true);
    }
  }, []);

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

        setloginuser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          cart: response.data.cart || [],
        });
        setCartItems(response.data.cart || []);
        setWishlistItems(response.data.wishlist || []);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  /* =========================================
     NEWSLETTER
  ========================================= */

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    setSubscribed(true);
  };

  /* =========================================
     COUNTDOWN
  ========================================= */

  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;

              if (days > 0) {
                days--;
              } else {
                clearInterval(timer);
              }
            }
          }
        }

        return {
          days,
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  /* =========================================
     SEARCH
  ========================================= */

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  /* =========================================
     API
  ========================================= */

  useEffect(() => {
    const api = async () => {
      const response = await axios.get("http://localhost:5047/api/Perfume2");

      setperfumes(response.data);
    };

    api();
  }, []);

  /* =========================================
     HERO
  ========================================= */

  const heroData = [
    {
      small: "NEW ARRIVAL",
      title: "THE ART",
      title2: "OF FRAGRANCE",
      text: "Discover luxurious fragrances crafted to become your signature.",
      image:
        "https://images.unsplash.com/photo-1638983352834-36c3a50a8aac?auto=format&fit=crop&w=1200&q=90",
    },
    {
      small: "PREMIUM COLLECTION",
      title: "DEFINE",
      title2: "YOUR STYLE",
      text: "A sophisticated collection created for modern personalities.",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=90",
    },
    {
      small: "LIMITED EDITION",
      title: "DARK",
      title2: "ESSENCE",
      text: "Deep notes. Powerful character. An unforgettable impression.",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=90",
    },
  ];

  const currentHero = heroData[hero];

  /* =========================================
     CART
  ========================================= */

  // const addCart = () => {
  //   setCart((value) => value + 1);
  // };

  /* =========================================
     PRODUCT FILTER
  ========================================= */

  const filteractivetab = perfumes.filter(
    (item) =>
      (activeTab === "Latest Products" && item.isLatest == 1) ||
      (activeTab === "Best Selling" && item.isBestSelling === true) ||
      (activeTab === "Featured" && item.isFeatured === true) ||
      (activeTab === "Top Rating" && item.rating >= 4.5),
  );

  const productsslice = filteractivetab.slice(0, 8);

  /* =========================================
     CLOSE USER DRAWER + NAVIGATE
  ========================================= */

  const userNavigate = (path: string) => {
    setUserDrawer(false);
    navigate(path);
  };

  const handleAddToCart = async (productId: number) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!loginuser.id) {
      alert("Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5047/api/Perfume2Users/add-cart",
        {
          userId: Number(loginuser.id),
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Cart added:", response.data);

      // Update UI immediately
      setCartItems((prev) => {
        const existing = prev.find((item) => item.productId === productId);

        if (existing) {
          return prev.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          );
        }

        return [
          ...prev,
          {
            id: response.data.id,
            userId: Number(loginuser.id),
            productId: productId,
            quantity: 1,
          },
        ];
      });

      // Update loginuser.cart also
      setloginuser((prev) => ({
        ...prev,
        cart: [
          ...prev.cart.filter((item: any) => item.productId !== productId),
          {
            id: response.data.id,
            userId: Number(loginuser.id),
            productId: productId,
            quantity: 1,
          },
        ],
      }));
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };
  const handleIncrease = async (Pid: number) => {
    try {
      await axios.patch(
        `http://localhost:5047/api/Perfume2Users/cart-increase-quantity?id=${loginuser.id}&pId=${Pid}`,
      );

      setCartItems((prevCart) =>
        prevCart.map((item) =>
          Number(item.productId) === Number(Pid)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );

      setloginuser((prev) => ({
        ...prev,
        cart: prev.cart.map((item: any) =>
          Number(item.productId) === Number(Pid)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrease = async (Pid: number) => {
    const cartItem = cartItems.find(
      (item) => Number(item.productId) === Number(Pid),
    );

    if (!cartItem || cartItem.quantity <= 1) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5047/api/Perfume2Users/cart-decrease-quantity?id=${loginuser.id}&pId=${Pid}`,
      );

      setCartItems((prevCart) =>
        prevCart.map((item) =>
          Number(item.productId) === Number(Pid)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      );

      setloginuser((prev) => ({
        ...prev,
        cart: prev.cart.map((item: any) =>
          Number(item.productId) === Number(Pid)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (Pid: number) => {
    const cartItem = cartItems.find(
      (item) => Number(item.productId) === Number(Pid),
    );

    if (!cartItem) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5047/api/Perfume2Users/cart/${loginuser.id}/${Pid}`,
      );

      setCartItems((prevCart) =>
        prevCart.filter((item) => Number(item.productId) !== Number(Pid)),
      );

      setloginuser((prev) => ({
        ...prev,
        cart: prev.cart.filter(
          (item: any) => Number(item.productId) !== Number(Pid),
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };
const specialcartItem = cartItems.find(
                (item) => Number(item.productId) === Number(perfumes[3]?.id),
              );

              // =========================
// ADD TO WISHLIST
// =========================
const handleAddToWishlist = async (productId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  if (!loginuser.id) {
    return;
  }

  // Already in wishlist
  const alreadyExists = wishlistItems.some(
    (item) => Number(item.productId) === Number(productId)
  );

  if (alreadyExists) {
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:5047/api/Perfume2Users/add-wishlist",
      {
        userId: Number(loginuser.id),
        productId: Number(productId),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Wishlist added:", response.data);

    // Update heart immediately
    setWishlistItems((prev) => [
      ...prev,
      {
        id: response.data.id,
        userId: Number(loginuser.id),
        productId: Number(productId),
      },
    ]);
  } catch (error) {
    console.log("Add wishlist error:", error);
  }
};
  return (
    <div className="dark-shop">
      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #080808;
          color: #f4f1eb;
          font-family: Arial, Helvetica, sans-serif;
        }

        ::selection {
          background: #c5a46d;
          color: #000;
        }

        .dark-shop {
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(197,164,109,.035),
              transparent 30%
            ),
            #080808;
          min-height: 100vh;
        }

        .container-xl-custom {
          width: min(1440px, 94%);
          margin: auto;
        }

        .gold {
          color: #c5a46d;
        }

        /* =========================================
           TOP BAR
        ========================================= */

        .topbar {
          height: 38px;
          border-bottom: 1px solid #202020;
          background: #050505;
          color: #8c8c8c;
          font-size: 11px;
        }

        .topbar a {
          color: #999;
          text-decoration: none;
          transition: .3s;
        }

        .topbar a:hover {
          color: #c5a46d;
        }

        /* =========================================
           HEADER
        ========================================= */

        .main-header {
          position: sticky !important;
          top: 0;
          z-index: 1000;
          background: rgba(8,8,8,.92) !important;
          backdrop-filter: blur(18px);
          border-bottom: 1px solid #1e1e1e;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 32px;
          letter-spacing: 6px;
          color: #f4f1eb;
          text-decoration: none;
          white-space: nowrap;
        }

        .logo span {
          color: #c5a46d;
        }

        .search-box {
          height: 45px;
          border: 1px solid #292929;
          background: #101010;
          display: flex;
          align-items: center;
          padding: 0 14px;
          transition: .4s;
        }

        .search-box:focus-within {
          border-color: #c5a46d;
          box-shadow: 0 0 25px rgba(197,164,109,.08);
        }

        .search-box input {
          width: 100%;
          border: 0;
          outline: none;
          background: transparent;
          color: white;
          font-size: 13px;
        }

        .search-box input::placeholder {
          color: #555;
        }

        .header-icon {
          color: #ddd !important;
          transition: .3s !important;
        }

        .header-icon:hover {
          color: #c5a46d !important;
          transform: translateY(-2px);
        }

        /* =========================================
           NAVIGATION
        ========================================= */

        .navigation {
          background: #0b0b0b;
          border-bottom: 1px solid #202020;
        }

        .nav-link-main {
          color: #b8b8b8;
          text-decoration: none;
          font-size: 12px;
          letter-spacing: .5px;
          padding: 17px 16px;
          display: flex;
          align-items: center;
          gap: 3px;
          transition: .3s;
        }

        .nav-link-main:hover {
          color: #c5a46d;
          background: #111;
        }

        .deal-button {
          color: #c5a46d !important;
          font-weight: 600;
        }

        /* =========================================
           SHIPPING
        ========================================= */

        .shipping-strip {
          background: #c5a46d;
          color: #0b0b0b;
          padding: 10px;
          text-align: center;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        /* =========================================
           PREMIUM USER DRAWER
        ========================================= */

        .user-drawer {
          width: 420px;
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 80% 10%,
              rgba(197,164,109,.08),
              transparent 30%
            ),
            #090909;

          color: #f4f1eb;

          padding: 30px;

          display: flex;
          flex-direction: column;
        }

        .user-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 25px;
          border-bottom: 1px solid #222;
        }

        .user-label {
          color: #c5a46d;
          font-size: 9px;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }

        .user-drawer-header h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: normal;
          letter-spacing: 2px;
        }

        .user-drawer-header h2 span {
          color: #c5a46d;
        }

        /* PREMIUM CARD */

        .premium-card {
          position: relative;
          overflow: hidden;
          margin: 25px 0;
          padding: 25px;
          min-height: 235px;

          background:
            linear-gradient(
              135deg,
              #17130d,
              #0e0e0e 55%,
              #15110b
            );

          border: 1px solid #3a3123;
        }

        .premium-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          right: -80px;
          top: -80px;

          background: rgba(197,164,109,.10);
          filter: blur(5px);
        }

        .premium-card-top {
          position: relative;
          z-index: 2;

          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .premium-small {
          color: #c5a46d;
          font-size: 8px;
          letter-spacing: 3px;
        }

        .premium-card h3 {
          margin: 10px 0 0;

          font-family: Georgia, serif;
          font-size: 29px;
          line-height: 1;
          font-weight: normal;
          letter-spacing: 1px;
        }

        .premium-card h3 span {
          color: #c5a46d;
          font-style: italic;
        }

        .premium-card p {
          position: relative;
          z-index: 2;

          color: #777;
          font-size: 11px;
          line-height: 1.8;
          margin: 22px 0;
          max-width: 320px;
        }

        .premium-button {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          gap: 8px;

          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #080808;

          padding: 11px 17px;

          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.5px;

          cursor: pointer;
          transition: .3s;
        }

        .premium-button:hover {
          background: #e1c58f;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(197,164,109,.15);
        }

        /* USER INFO */

        .user-info {
          display: flex;
          align-items: center;
          gap: 14px;

          padding: 18px 0;
          border-bottom: 1px solid #222;
        }

        .user-avatar {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #c5a46d;
          border-radius: 50%;

          color: #c5a46d;
          font-family: Georgia, serif;
          font-size: 19px;
        }

        .user-name {
          color: #eee;
          font-size: 13px;
        }

        .user-email {
          color: #555;
          font-size: 10px;
          margin-top: 5px;
        }

        /* USER MENU */

        .user-menu {
          margin-top: 10px;
        }

        .user-menu button {
          width: 100%;

          display: flex;
          align-items: center;
          gap: 15px;

          padding: 18px 5px;

          border: 0;
          border-bottom: 1px solid #1c1c1c;

          background: transparent;
          color: #aaa;

          font-size: 11px;
          letter-spacing: .8px;

          cursor: pointer;
          text-align: left;

          transition: .3s;
        }

        .user-menu button svg:first-child {
          color: #c5a46d;
          font-size: 19px;
        }

        .user-menu button:hover {
          color: #c5a46d;
          padding-left: 10px;
          background: rgba(197,164,109,.025);
        }

        .menu-arrow {
          margin-left: auto;
          color: #444 !important;
          font-size: 16px !important;
        }

        .user-menu button:hover .menu-arrow {
          color: #c5a46d !important;
        }

        /* CART COUNT */

        .drawer-cart-count {
          min-width: 20px;
          height: 20px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: auto;

          border-radius: 50%;

          background: #c5a46d;
          color: #000;

          font-size: 9px;
          font-weight: bold;
        }

        .drawer-cart-count + .menu-arrow {
          margin-left: 0;
        }

        /* FOOTER */

        .user-drawer-footer {
          margin-top: auto;
          padding-top: 25px;
        }
.quantity-number {
  flex: 1;
  text-align: center;
  color: #eee;
  font-size: 12px;
  font-weight: 600;
}
        .user-drawer-footer button {
          display: flex;
          align-items: center;
          gap: 10px;

          border: 0;
          background: transparent;

          color: #777;

          font-size: 9px;
          letter-spacing: 2px;

          cursor: pointer;

          transition: .3s;
        }

        .user-drawer-footer button:hover {
          color: #c5a46d;
        }

        .user-drawer-footer button svg {
          font-size: 17px;
        }

        .member-since {
          margin-top: 18px;

          color: #333;

          font-size: 8px;
          letter-spacing: 2px;
        }

        /* =========================================
           HERO
        ========================================= */

        .hero {
          min-height: 650px;
          position: relative;
          overflow: hidden;
          background: #0b0b0b;
        }

        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(0,0,0,.96) 0%,
              rgba(0,0,0,.75) 42%,
              rgba(0,0,0,.15) 100%
            );
          pointer-events: none;
        }

        .hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: heroZoom 8s ease-in-out infinite alternate;
        }

        @keyframes heroZoom {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.06);
          }
        }

        .hero-content {
          position: relative;
          z-index: 2;
          padding: 125px 0;
          max-width: 600px;
          animation: heroText 1s ease;
        }

        @keyframes heroText {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-small {
          color: #c5a46d;
          letter-spacing: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .hero-title {
          font-family: Georgia, serif;
          font-size: clamp(55px, 7vw, 100px);
          line-height: .9;
          font-weight: normal;
          margin: 20px 0;
        }

        .hero-title span {
          color: #c5a46d;
          font-style: italic;
        }

        .hero-text {
          color: #aaa;
          line-height: 1.8;
          max-width: 470px;
          font-size: 14px;
        }

        .gold-btn {
          background: #c5a46d !important;
          color: #090909 !important;
          border-radius: 0 !important;
          padding: 13px 28px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 1px;
          transition: .4s !important;
        }

        .gold-btn:hover {
          background: #e1c58f !important;
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(197,164,109,.2);
        }

        .hero-dots {
          position: absolute;
          z-index: 5;
          bottom: 30px;
          left: 3%;
          display: flex;
          gap: 8px;
        }

        .hero-dot {
          width: 35px;
          height: 3px;
          background: #555;
          cursor: pointer;
          transition: .3s;
        }

        .hero-dot.active {
          background: #c5a46d;
          width: 55px;
        }

        /* =========================================
           SECTIONS
        ========================================= */

        .section {
          padding: 75px 0;
        }

        .section-title {
          font-family: Georgia, serif;
          font-size: 42px;
          font-weight: normal;
          text-align: center;
        }

        .section-subtitle {
          color: #666;
          text-align: center;
          font-size: 12px;
        }

        .brands {
          border-bottom: 1px solid #1f1f1f;
        }

        /* =========================================
           BRANDS
        ========================================= */

        .brand {
          height: 100px;
          border: 1px solid #1d1d1d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-family: Georgia, serif;
          font-size: 21px;
          letter-spacing: 3px;
          transition: .4s;
          text-decoration: none;
        }

        .brand:hover {
          color: #c5a46d;
          border-color: #c5a46d;
          transform: translateY(-5px);
        }

        /* =========================================
           PRODUCT TABS
        ========================================= */

        .product-tabs {
          display: flex;
          justify-content: center;
          gap: 35px;
          margin: 35px 0;
          border-bottom: 1px solid #222;
        }

        .product-tab {
          background: transparent;
          border: 0;
          color: #777;
          padding: 12px 3px;
          font-size: 12px;
          cursor: pointer;
          position: relative;
        }

        .product-tab::after {
          content: "";
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #c5a46d;
          transform: scaleX(0);
          transition: .3s;
        }

        .product-tab.active {
          color: #c5a46d;
        }

        .product-tab.active::after {
          transform: scaleX(1);
        }

        /* =========================================
           PRODUCT CARD
        ========================================= */

        .product-card {
          background: #101010;
          border: 1px solid #1d1d1d;
          position: relative;
          overflow: hidden;
          height: 100%;
          transition: .45s;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: #373737;
          box-shadow: 0 20px 50px rgba(0,0,0,.4);
        }

        .product-image-wrap {
          height: 340px;
          background: #151515;
          overflow: hidden;
          position: relative;
        }

        .product-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .7s;
        }

        .product-card:hover .product-image-wrap img {
          transform: scale(1.08);
        }

        .sale {
          position: absolute;
          top: 13px;
          left: 13px;
          background: #c5a46d;
          color: #050505;
          padding: 6px 9px;
          font-size: 9px;
          font-weight: bold;
          z-index: 2;
        }

        .product-actions {
          position: absolute;
          right: 12px;
          top: 12px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          transform: translateX(60px);
          transition: .4s;
          z-index: 3;
        }

        .product-card:hover .product-actions {
          transform: translateX(0);
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #333;
          background: #090909;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: .3s;
        }

        .action-btn:hover {
          background: #c5a46d;
          color: #000;
        }

        .product-info {
          padding: 18px;
        }

        .rating {
          color: #c5a46d;
          font-size: 11px;
          letter-spacing: 2px;
        }

        .rating-value {
          color: #777;
          font-size: 11px;
          font-weight: 500;
        }

        .rating-brand {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .product-brand {
          display: inline-block;
          color: #c5a46d;
          font-size: 9px;
          font-weight: 700;
          text-align: right;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .product-name {
          color: #eee;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 14px;
          margin: 8px 0;
          min-height: 40px;
        }

        .product-price {
          color: #c5a46d;
          font-size: 15px;
          font-weight: 600;
        }

        .old-price {
          color: #555;
          text-decoration: line-through;
          margin-right: 7px;
          font-size: 12px;
        }

       .product-buttons {
  display: flex;
  gap: 8px;
  margin-top: 15px;
}

.product-buttons button {
  flex: 1;
}

.add-cart {
  width: 100%;
  border: 1px solid #333;
  background: transparent;
  color: #ddd;
  padding: 10px 8px;
  font-size: 10px;
  letter-spacing: 1.5px;
  cursor: pointer;
  transition: .3s;
}

.add-cart:hover {
  background: #c5a46d;
  color: #000;
  border-color: #c5a46d;
}

/* QUANTITY UI */

.quantity-control {
  flex: 1;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #333;
  background: #0b0b0b;
  overflow: hidden;
}

.quantity-btn {
  width: 36px;
  height: 100%;
  border: 0 !important;
  background: transparent !important;
  color: #c5a46d !important;
  font-size: 18px !important;
  font-weight: 400 !important;
  padding: 0 !important;
  cursor: pointer;
  transition: .3s;
}

.quantity-btn:hover {
  background: #c5a46d !important;
  color: #000 !important;
}




        .product-buttons button {
          flex: 1;
        }

        .add-cart {
          width: 100%;
          border: 1px solid #333;
          background: transparent;
          color: #ddd;
          padding: 10px 8px;
          font-size: 10px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .add-cart:hover {
          background: #c5a46d;
          color: #000;
          border-color: #c5a46d;
        }

        .buy-now {
          width: 100%;
          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #000;
          padding: 10px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .buy-now:hover {
          background: #e1c58f;
          border-color: #e1c58f;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(197,164,109,.15);
        }

        /* =========================================
           SPECIAL
        ========================================= */

        .special {
          background:
            linear-gradient(
              90deg,
              #0d0d0d,
              #15120d
            );
          border-top: 1px solid #242424;
          border-bottom: 1px solid #242424;
        }

        .special-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
        }

        .special-content {
          padding: 50px;
        }

        .special-content h2 {
          font-family: Georgia, serif;
          font-size: 55px;
          font-weight: normal;
        }

        .special-content p {
          color: #777;
          line-height: 1.9;
        }

        .countdown {
          display: flex;
          gap: 12px;
          margin: 30px 0;
        }

        .count {
          border: 1px solid #333;
          min-width: 70px;
          padding: 12px;
          text-align: center;
        }

        .count strong {
          display: block;
          color: #c5a46d;
          font-family: Georgia, serif;
          font-size: 24px;
        }

        .count small {
          color: #555;
          font-size: 8px;
          letter-spacing: 1px;
        }

        /* =========================================
           COLLECTIONS
        ========================================= */

        .collection-card {
          height: 390px;
          position: relative;
          overflow: hidden;
        }

        .collection-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .8s;
        }

        .collection-card:hover img {
          transform: scale(1.1);
        }

        .collection-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            transparent,
            rgba(0,0,0,.9)
          );
          display: flex;
          align-items: end;
          padding: 28px;
        }

        .collection-overlay h3 {
          font-family: Georgia, serif;
          font-size: 30px;
          font-weight: normal;
        }

        /* =========================================
           BLOG
        ========================================= */

        .blog-card {
          background: #101010;
          border: 1px solid #1d1d1d;
          overflow: hidden;
          transition: .4s;
        }

        .blog-card:hover {
          transform: translateY(-7px);
        }
          /* =========================================
   GUEST ACCOUNT
========================================= */

.guest-account {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 10px;
}

.guest-icon {
  width: 72px;
  height: 72px;
  border: 1px solid #c5a46d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c5a46d;
  margin-bottom: 25px;
}

.guest-icon svg {
  font-size: 32px;
}

.guest-account h3 {
  margin: 0;
  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: normal;
  color: #f4f1eb;
  letter-spacing: 1px;
}

.guest-account h3 span {
  color: #c5a46d;
  font-style: italic;
}

.guest-account p {
  max-width: 280px;
  margin: 15px auto 30px;
  color: #777;
  font-size: 12px;
  line-height: 1.8;
}

.guest-login-btn,
.guest-register-btn {
  width: 100%;
  max-width: 280px;
  padding: 13px 18px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.8px;
  cursor: pointer;
  transition: .3s;
}

.guest-login-btn {
  border: 1px solid #c5a46d;
  background: #c5a46d;
  color: #080808;
  margin-bottom: 10px;
}

.guest-login-btn:hover {
  background: #e1c58f;
  border-color: #e1c58f;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(197,164,109,.15);
}

.guest-register-btn {
  border: 1px solid #333;
  background: transparent;
  color: #ddd;
}

.guest-register-btn:hover {
  border-color: #c5a46d;
  color: #c5a46d;
  transform: translateY(-2px);
}

        .blog-image {
          height: 220px;
          width: 100%;
          object-fit: cover;
        }

        .blog-content {
          padding: 22px;
        }

        .blog-date {
          color: #c5a46d;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .blog-title {
          font-family: Georgia, serif;
          font-size: 21px;
          margin: 10px 0;
        }

        .blog-text {
          color: #666;
          font-size: 12px;
          line-height: 1.8;
        }

        /* =========================================
           TESTIMONIAL
        ========================================= */

        .testimonial {
          background: #0d0d0d;
          border: 1px solid #1e1e1e;
          padding: 35px;
          height: 100%;
        }

        .testimonial-stars {
          color: #c5a46d;
          letter-spacing: 3px;
        }

        .testimonial-text {
          color: #999;
          line-height: 1.9;
          font-size: 13px;
          margin: 20px 0;
        }

        .testimonial-name {
          font-family: Georgia, serif;
          font-size: 18px;
        }

        /* =========================================
           SERVICES
        ========================================= */

        .services {
          border-top: 1px solid #222;
          border-bottom: 1px solid #222;
          background: #0b0b0b;
        }

        .service {
          padding: 35px 20px;
          border-right: 1px solid #222;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .service:last-child {
          border-right: 0;
        }

        .service-icon {
          color: #c5a46d;
        }

        .service-title {
          font-size: 12px;
          font-weight: bold;
        }

        .service-text {
          color: #555;
          font-size: 10px;
          margin-top: 4px;
        }

        /* =========================================
           NEWSLETTER
        ========================================= */

        .newsletter {
          padding: 90px 0;
          text-align: center;
          background:
            radial-gradient(
              circle,
              rgba(197,164,109,.09),
              transparent 50%
            );
        }

        .newsletter h2 {
          font-family: Georgia, serif;
          font-size: 45px;
          font-weight: normal;
        }

        .newsletter p {
          color: #666;
          font-size: 13px;
        }

        .newsletter-form {
          max-width: 550px;
          margin: 30px auto 0;
          display: flex;
          border-bottom: 1px solid #555;
        }

        .newsletter-form input {
          flex: 1;
          border: 0;
          outline: 0;
          background: transparent;
          color: white;
          padding: 14px 0;
        }

        .newsletter-form button {
          background: transparent;
          border: 0;
          color: #c5a46d;
          font-weight: bold;
          cursor: pointer;
        }

        .newsletter-form button.subscribed-btn {
          color: #c5a46d;
          cursor: default;
          opacity: 1;
        }

        .newsletter-form input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .subscribe-success {
          margin-top: 18px;
          color: #c5a46d;
          font-size: 11px;
          letter-spacing: 0.8px;
          animation: subscribeFade 0.5s ease;
        }

        @keyframes subscribeFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================
           FOOTER
        ========================================= */

        .footer {
          background: #040404;
          border-top: 1px solid #202020;
          padding: 70px 0 20px;
        }

        .footer-logo {
          font-family: Georgia, serif;
          font-size: 32px;
          letter-spacing: 5px;
        }

        .footer-text {
          color: #555;
          font-size: 12px;
          line-height: 1.9;
          max-width: 360px;
        }

        .footer-title {
          color: #eee;
          font-size: 10px;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }

        .footer-link {
          display: block;
          color: #555;
          text-decoration: none;
          font-size: 12px;
          margin-bottom: 12px;
          transition: .3s;
        }

        .footer-link:hover {
          color: #c5a46d;
          padding-left: 5px;
        }

        .footer-bottom {
          border-top: 1px solid #181818;
          margin-top: 60px;
          padding-top: 20px;
          color: #444;
          font-size: 10px;
        }

        /* =========================================
           MOBILE DRAWER
        ========================================= */

        .drawer {
          background: #0b0b0b;
          height: 100%;
          color: white;
          width: 300px;
          padding: 25px;
        }

        .drawer-link {
          display: block;
          color: #aaa;
          padding: 15px 0;
          border-bottom: 1px solid #222;
          text-decoration: none;
        }

        .drawer-link:hover {
          color: #c5a46d;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media(max-width: 991px) {

          .desktop-nav {
            display: none !important;
          }

          .hero {
            min-height: 600px;
          }

          .hero-content {
            padding: 100px 25px;
          }

          .special-content {
            padding: 30px 10px;
          }

          .service {
            border-right: 0;
            border-bottom: 1px solid #222;
          }
        }

        @media(max-width: 576px) {

          .topbar {
            display: none;
          }

          .logo {
            font-size: 23px;
          }

          .hero {
            min-height: 600px;
          }

          .hero-title {
            font-size: 52px;
          }

          .section {
            padding: 55px 0;
          }

          .section-title {
            font-size: 35px;
          }

          .product-image-wrap {
            height: 300px;
          }

          .product-tabs {
            gap: 12px;
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 3px;
          }

          .product-tab {
            white-space: nowrap;
          }

          .product-buttons {
            flex-direction: column;
          }

          .special-image {
            height: 350px;
          }

          .special-content h2 {
            font-size: 40px;
          }

          .user-drawer {
            width: 100vw;
            padding: 22px;
          }

          .user-drawer-header h2 {
            font-size: 24px;
          }

          .premium-card {
            padding: 20px;
          }

          .premium-card h3 {
            font-size: 25px;
          }
        }

      `}</style>

      {/* =========================================
          TOP BAR
      ========================================= */}

      <div className="topbar">
        <div className="container-xl-custom h-100 d-flex align-items-center justify-content-between">
          <div>FREE SHIPPING ON ORDERS OVER $59</div>

          <div className="d-none d-md-flex gap-4">
            <a href="#">USD</a>
            <a href="#">ENGLISH</a>
            {isLoggedIn ? (
              ""
            ) : (
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                SIGN IN / REGISTER
              </a>
            )}
          </div>
        </div>
      </div>

      {/* =========================================
          HEADER
      ========================================= */}

      <AppBar position="sticky" elevation={0} className="main-header">
        <Toolbar className="container-xl-custom py-2">
          {/* MOBILE MENU */}

          <IconButton
            className="d-lg-none"
            onClick={() => setDrawer(true)}
            sx={{ color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}

          <a className="logo" href="#home">
            NOIR<span>.</span>
          </a>

          {/* SEARCH */}

          <div className="d-none d-md-flex flex-grow-1 mx-4">
            <div className="search-box w-100">
              <input
                type="text"
                placeholder="Search perfume..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              <SearchIcon
                onClick={handleSearch}
                sx={{
                  color: "#c5a46d",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* HEADER ICONS */}

          <div className="d-flex">
            {/* USER */}

            <IconButton
              className="header-icon d-none d-md-flex"
              onClick={() => setUserDrawer(true)}
            >
              <PersonIcon />
            </IconButton>

            {/* WISHLIST */}

            <IconButton
              className="header-icon d-none d-md-flex"
              onClick={() => navigate("/wishlist")}
            >
              <FavoriteBorderIcon />
            </IconButton>

            {/* CART */}

            <IconButton
              className="header-icon"
              onClick={() => navigate("/cart")}
            >
              {loginuser.cart.length == 0 ? (
                <Badge color="warning">
                  <ShoppingBagOutlinedIcon />
                </Badge>
              ) : (
                <Badge
                  badgeContent={loginuser.cart.length || ""}
                  color="warning"
                >
                  <ShoppingBagOutlinedIcon />
                </Badge>
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* =========================================
          NAVIGATION
      ========================================= */}

      <nav className="navigation desktop-nav">
        <div className="container-xl-custom d-flex">
          <a className="nav-link-main" href="#home">
            HOME
          </a>

          <a className="nav-link-main" href="#shop">
            SHOP
            <KeyboardArrowDownIcon sx={{ fontSize: 15 }} />
          </a>

          <a className="nav-link-main" href="#collections">
            COLLECTIONS
            <KeyboardArrowDownIcon sx={{ fontSize: 15 }} />
          </a>

          <a
            className="nav-link-main"
            href="/search?q=men"
            onClick={(e) => {
              e.preventDefault();
              navigate("/search?q=men");
            }}
          >
            MEN'S PERFUME
          </a>

          <a
            className="nav-link-main"
            href="/search?q=women"
            onClick={(e) => {
              e.preventDefault();
              navigate("/search?q=women");
            }}
          >
            WOMEN'S PERFUME
          </a>

          <a className="nav-link-main" href="#gifts">
            GIFT SETS
          </a>

          <a className="nav-link-main" href="#brands">
            BRANDS
          </a>

          <a className="nav-link-main" href="#blog">
            BLOG
          </a>

          <a className="nav-link-main deal-button ms-auto" href="#shop">
            TODAY DEALS
          </a>
        </div>
      </nav>

      {/* =========================================
          SHIPPING
      ========================================= */}

      <div className="shipping-strip">
        FREESHIPPING OVER $59.00 &nbsp; • &nbsp; PREMIUM PACKAGING &nbsp; •
        &nbsp; EASY RETURNS
      </div>

      {/* =========================================
          HERO
      ========================================= */}

      <section id="home" className="hero">
        <img
          className="hero-image"
          src={currentHero.image}
          alt="Luxury fragrance"
          key={hero}
        />

        <div className="container-xl-custom">
          <div className="hero-content" key={hero}>
            <div className="hero-small">{currentHero.small}</div>

            <h1 className="hero-title">
              {currentHero.title}
              <br />
              <span>{currentHero.title2}</span>
            </h1>

            <p className="hero-text">{currentHero.text}</p>

            <Button
              className="gold-btn mt-3"
              endIcon={<ArrowForwardIcon />}
              href="#shop"
            >
              SHOP NOW
            </Button>
          </div>
        </div>

        <div className="hero-dots">
          {heroData.map((_, index) => (
            <div
              key={index}
              className={`hero-dot ${hero === index ? "active" : ""}`}
              onClick={() => setHero(index)}
            />
          ))}
        </div>
      </section>

      {/* =========================================
          BRANDS
      ========================================= */}

      <section id="brands" className="section brands">
        <div className="container-xl-custom">
          <h2 className="section-title">
            Famous <span className="gold">Brands</span>
          </h2>

          <p className="section-subtitle">DISCOVER OUR PREMIUM COLLECTION</p>

          <div className="row g-3 mt-4">
            {brands.map((brand) => (
              <div className="col-6 col-md-4 col-lg-2" key={brand}>
                <a
                  className="brand"
                  href={`/search?q=${brand.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();

                    navigate(`/search?q=${brand.toLowerCase()}`);
                  }}
                >
                  {brand}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          PRODUCTS
      ========================================= */}

      <section id="shop" className="section">
        <div className="container-xl-custom">
          <h2 className="section-title">
            Top <span className="gold">Trending</span>
          </h2>

          <div className="product-tabs">
            {["Latest Products", "Top Rating", "Best Selling", "Featured"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`product-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="row g-4">
            {productsslice.map((product) => {
              const cartItem = cartItems.find(
                (item) => Number(item.productId) === Number(product.id),
              );
              return (
                <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                  <div className="product-card">
                    <div className="product-image-wrap">
                      <div className="product-actions">
                        <button
  className="action-btn"
  onClick={() => handleAddToWishlist(product.id)}
>
  {wishlistItems.some(
    (item) => Number(item.productId) === Number(product.id)
  ) ? (
    <FavoriteIcon
      sx={{
        fontSize: 17,
        color: "#c5a46d",
      }}
    />
  ) : (
    <FavoriteBorderIcon
      sx={{
        fontSize: 17,
      }}
    />
  )}
</button>
                      </div>

                      <img src={product.imageUrl} alt={product.title} />
                    </div>

                    <div className="product-info">
                      <div className="rating-brand">
                        <div>
                          <span className="rating">★★★★★</span>

                          <span className="rating-value">
                            ({product.rating})
                          </span>
                        </div>

                        <div className="product-brand">{product.brand}</div>
                      </div>

                      <div className="product-name">{product.title}</div>

                      <div className="product-price">
                        {product.oldPrice && (
                          <span className="old-price">
                            $ {product.oldPrice}
                          </span>
                        )}
                        $ {product.price}
                      </div>

                      <div className="product-buttons">
                        {cartItem ? (
                          <div className="quantity-control">
                            {cartItem.quantity == 1 ? (
                              <button
                                className="quantity-btn"
                                onClick={() => handleDelete(product.id)}
                              >
                                −
                              </button>
                            ) : (
                              <button
                                className="quantity-btn"
                                onClick={() => handleDecrease(product.id)}
                              >
                                −
                              </button>
                            )}

                            <span className="quantity-number">
                              {cartItem.quantity}
                            </span>

                            <button
                              className="quantity-btn"
                              onClick={() => handleIncrease(product.id)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-cart"
                            onClick={() => handleAddToCart(product.id)}
                          >
                            ADD TO CART
                          </button>
                        )}

                        <button
                          className="buy-now"
                          onClick={() => navigate(`/buy/${product.id}`)}
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================
          SPECIAL PRODUCT
      ========================================= */}

      <section className="special section">
        <div className="container-xl-custom">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                className="special-image"
                src={perfumes[3]?.imageUrl}
                alt="Special perfume"
              />
            </div>

            <div className="col-lg-6">
              <div className="special-content">
                <div className="hero-small">SPECIAL PRODUCT</div>

                <h2 className="mt-3">
                  DOLCE
                  <br />
                  <span className="gold">INTENSE</span>
                </h2>

                <p className="mt-4">
                  A sophisticated fragrance with deep woods, warm amber and a
                  powerful signature designed for unforgettable evenings.
                </p>

                <div className="countdown">
                  <div className="count">
                    <strong>{String(timeLeft.days).padStart(2, "0")}</strong>
                    <small>DAYS</small>
                  </div>

                  <div className="count">
                    <strong>{String(timeLeft.hours).padStart(2, "0")}</strong>
                    <small>HOURS</small>
                  </div>

                  <div className="count">
                    <strong>{String(timeLeft.minutes).padStart(2, "0")}</strong>
                    <small>MIN</small>
                  </div>

                  <div className="count">
                    <strong>{String(timeLeft.seconds).padStart(2, "0")}</strong>
                    <small>SEC</small>
                  </div>
                </div>

                  {specialcartItem ? (
                          <div className="quantity-control">
                            {specialcartItem.quantity == 1 ? (
                              <button
                                className="quantity-btn"
                                onClick={() => handleDelete(perfumes[3].id)}
                              >
                                −
                              </button>
                            ) : (
                              <button
                                className="quantity-btn"
                                onClick={() => handleDecrease(perfumes[3].id)}
                              >
                                −
                              </button>
                            )}

                            <span className="quantity-number">
                              {specialcartItem.quantity}
                            </span>

                            <button
                              className="quantity-btn"
                              onClick={() => handleIncrease(perfumes[3].id)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                           <Button
                  className="gold-btn"
                  onClick={()=>handleAddToCart(perfumes[3].id)}
                  endIcon={<ShoppingBagOutlinedIcon />}
                >
                  ADD TO CART — $49
                </Button>
                        )}

                {/* <Button
                  className="gold-btn"
                  onClick={()=>handleAddToCart(perfumes[3].id)}
                  endIcon={<ShoppingBagOutlinedIcon />}
                >
                  ADD TO CART — $49
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          COLLECTIONS
      ========================================= */}

      <section id="collections" className="section">
        <div className="container-xl-custom">
          <h2 className="section-title">
            Explore Our <span className="gold">Collections</span>
          </h2>

          <p className="section-subtitle">FIND YOUR PERFECT SIGNATURE</p>

          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div
                className="collection-card"
                onClick={() => navigate("/search?q=women")}
                style={{
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=900&q=90"
                  alt="Women"
                />

                <div className="collection-overlay">
                  <div>
                    <div className="hero-small">COLLECTION</div>

                    <h3>WOMEN'S PERFUME</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="collection-card"
                onClick={() => navigate("/search?q=men")}
                style={{
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=90"
                  alt="Men"
                />

                <div className="collection-overlay">
                  <div>
                    <div className="hero-small">COLLECTION</div>

                    <h3>MEN'S PERFUME</h3>
                  </div>
                </div>
              </div>
            </div>

            <div id="gifts" className="col-md-4">
              <div
                className="collection-card"
                onClick={() => navigate("/search?q=noir")}
                style={{
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=90"
                  alt="Gift sets"
                />

                <div className="collection-overlay">
                  <div>
                    <div className="hero-small">COLLECTION</div>

                    <h3>GIFT SETS</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          BLOG
      ========================================= */}

      <section
        id="blog"
        className="section"
        style={{
          background: "#0b0b0b",
        }}
      >
        <div className="container-xl-custom">
          <h2 className="section-title">
            From Our <span className="gold">Journal</span>
          </h2>

          <div className="row g-4 mt-4">
            {[
              {
                title: "How To Choose Your Signature Scent",
                image:
                  "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=85",
              },
              {
                title: "The Art Of Modern Fragrance",
                image:
                  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=85",
              },
              {
                title: "5 Fragrance Notes You Should Know",
                image:
                  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85",
              },
            ].map((blog) => (
              <div className="col-md-4" key={blog.title}>
                <div className="blog-card">
                  <img
                    className="blog-image"
                    src={blog.image}
                    alt={blog.title}
                  />

                  <div className="blog-content">
                    <div className="blog-date">AUGUST 30, 2026</div>

                    <div className="blog-title">{blog.title}</div>

                    <p className="blog-text">
                      Discover fragrance tips, inspiration and stories from the
                      world of modern perfume.
                    </p>

                    <a
                      href={`/blog/${blog.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="gold"
                      style={{
                        fontSize: "11px",
                        textDecoration: "none",
                        letterSpacing: "1px",
                      }}
                    >
                      READ MORE →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          TESTIMONIALS
      ========================================= */}

      <section className="section">
        <div className="container-xl-custom">
          <h2 className="section-title">
            Customer <span className="gold">Reviews</span>
          </h2>

          <div className="row g-4 mt-4">
            {[
              {
                name: "Sarah M.",
                text: "The fragrance feels incredibly premium. The packaging and scent are both beautiful.",
              },
              {
                name: "James R.",
                text: "One of the best perfume shopping experiences I've had. Fast delivery and amazing quality.",
              },
              {
                name: "Ananya K.",
                text: "The scent lasts all day and I constantly get compliments whenever I wear it.",
              },
            ].map((review) => (
              <div className="col-md-4" key={review.name}>
                <div className="testimonial">
                  <div className="testimonial-stars">★★★★★</div>

                  <p className="testimonial-text">"{review.text}"</p>

                  <div className="testimonial-name">{review.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SERVICES
      ========================================= */}

      <section className="services">
        <div className="container-xl-custom">
          <div className="row">
            <div className="col-md-3">
              <div className="service">
                <LocalShippingOutlinedIcon className="service-icon" />

                <div>
                  <div className="service-title">FREE SHIPPING</div>

                  <div className="service-text">Orders over $59</div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="service">
                <ReplayOutlinedIcon className="service-icon" />

                <div>
                  <div className="service-title">EASY RETURNS</div>

                  <div className="service-text">30 day return policy</div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="service">
                <SecurityOutlinedIcon className="service-icon" />

                <div>
                  <div className="service-title">SECURE PAYMENT</div>

                  <div className="service-text">100% secure checkout</div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="service">
                <CardGiftcardOutlinedIcon className="service-icon" />

                <div>
                  <div className="service-title">MEMBER DISCOUNT</div>

                  <div className="service-text">Exclusive offers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          NEWSLETTER
      ========================================= */}

      <section className="newsletter">
        <div className="container">
          <div className="hero-small">STAY IN THE LOOP</div>

          <h2 className="mt-3">
            Join Our <span className="gold">Newsletter</span>
          </h2>

          <p>Get exclusive offers, new arrivals and fragrance inspiration.</p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribed}
            />

            <button
              type="button"
              onClick={handleSubscribe}
              disabled={subscribed}
              className={subscribed ? "subscribed-btn" : ""}
            >
              {subscribed ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
            </button>
          </div>

          {subscribed && (
            <div className="subscribe-success">
              Thank you. You are now part of the NOIR experience.
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="footer">
        <div className="container-xl-custom">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="footer-logo">
                NOIR<span className="gold">.</span>
              </div>

              <p className="footer-text mt-3">
                Premium fragrance and beauty essentials created for people who
                want to make a lasting impression.
              </p>

              <div className="mt-4">
                <span className="gold">FOLLOW US</span>

                <div className="d-flex gap-3 mt-3">
                  <a className="footer-link" href="#">
                    Instagram
                  </a>

                  <a className="footer-link" href="#">
                    Facebook
                  </a>

                  <a className="footer-link" href="#">
                    Pinterest
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-2">
              <div className="footer-title">SHOP</div>

              <a className="footer-link" href="#shop">
                Latest Products
              </a>

              <a
                className="footer-link"
                href="#shop"
                onClick={() => setActiveTab("Best Selling")}
              >
                Best Selling
              </a>

              <a className="footer-link" href="#collections">
                Men's Perfume
              </a>

              <a className="footer-link" href="#collections">
                Women's Perfume
              </a>

              <a className="footer-link" href="#collections">
                Gift Sets
              </a>
            </div>

            <div className="col-6 col-lg-2">
              <div className="footer-title">INFORMATION</div>

              <a className="footer-link" href="#">
                About Us
              </a>

              <a className="footer-link" href="#contact">
                Contact
              </a>

              <a className="footer-link" href="#">
                Shipping
              </a>

              <a className="footer-link" href="#">
                Returns
              </a>

              <a className="footer-link" href="#">
                Privacy Policy
              </a>
            </div>

            <div className="col-lg-4">
              <div className="footer-title">CONTACT</div>

              <p className="footer-text">
                123 Chipiyana Bujurg
                <br />
                Greater Noida West, UP, India
                <br />
                <br />
                gulshan@gmail.com
                <br />
                +91 94280 84477
              </p>
            </div>
          </div>

          <div className="footer-bottom d-flex justify-content-between flex-wrap gap-3">
            <span>© 2026 NOIR. ALL RIGHTS RESERVED.</span>

            <span>PREMIUM E-COMMERCE STORE</span>
          </div>
        </div>
      </footer>

      {/* =========================================
          MOBILE DRAWER
      ========================================= */}

      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <div className="drawer">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="logo">
              NOIR<span>.</span>
            </div>

            <IconButton onClick={() => setDrawer(false)} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </div>

          {[
            {
              name: "HOME",
              path: "#home",
            },
            {
              name: "SHOP",
              path: "#shop",
            },
            {
              name: "COLLECTIONS",
              path: "#collections",
            },
            {
              name: "MEN'S PERFUME",
              path: "/search?q=men",
            },
            {
              name: "WOMEN'S PERFUME",
              path: "/search?q=women",
            },
            {
              name: "GIFT SETS",
              path: "#gifts",
            },
            {
              name: "BRANDS",
              path: "#brands",
            },
            {
              name: "BLOG",
              path: "#blog",
            },
          ].map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="drawer-link"
              onClick={(e) => {
                if (item.path.startsWith("/")) {
                  e.preventDefault();
                  navigate(item.path);
                }

                setDrawer(false);
              }}
            >
              {item.name}
            </a>
          ))}

          {/* MOBILE ACCOUNT */}

          <button
            className="drawer-link"
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              color: "#aaa",
              fontSize: "14px",
            }}
            onClick={() => {
              setDrawer(false);
              setUserDrawer(true);
            }}
          >
            MY ACCOUNT
          </button>
        </div>
      </Drawer>

      {/* =========================================
          PREMIUM USER DRAWER
          IMPORTANT:
          This is OUTSIDE the mobile drawer.
      ========================================= */}

      <Drawer
        anchor="right"
        open={userDrawer}
        onClose={() => setUserDrawer(false)}
      >
        <div className="user-drawer">
          {!isLoggedIn ? (
            /* =====================================
               NOT LOGGED IN
            ===================================== */

            <>
              <div className="user-drawer-header">
                <div>
                  <div className="user-label">WELCOME TO NOIR</div>

                  <h2>
                    YOUR <span>ACCOUNT</span>
                  </h2>
                </div>

                <IconButton
                  onClick={() => setUserDrawer(false)}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: "#c5a46d",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>

              <div className="guest-account">
                <div className="guest-icon">
                  <PersonOutlinedIcon />
                </div>

                <h3>
                  Welcome to <span>NOIR</span>
                </h3>

                <p>Sign in to access your account, orders and wishlist.</p>

                <button
                  className="guest-login-btn"
                  onClick={() => {
                    setUserDrawer(false);
                    navigate("/login");
                  }}
                >
                  LOGIN
                </button>

                <button
                  className="guest-register-btn"
                  onClick={() => {
                    setUserDrawer(false);
                    navigate("/register");
                  }}
                >
                  CREATE ACCOUNT
                </button>
              </div>

              <div className="user-drawer-footer">
                <div className="member-since">PREMIUM FRAGRANCE EXPERIENCE</div>
              </div>
            </>
          ) : (
            /* =====================================
               LOGGED IN
            ===================================== */

            <>
              <div className="user-drawer-header">
                <div>
                  <div className="user-label">WELCOME BACK</div>

                  <h2>
                    {loginuser.name?.charAt(0).toUpperCase() +
                      loginuser.name?.slice(1)}
                    {/* <span>KUMAR</span> */}
                  </h2>
                </div>

                <IconButton
                  onClick={() => setUserDrawer(false)}
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      color: "#c5a46d",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>

              <div className="user-info">
                <div className="user-avatar">
                  {loginuser.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="user-name">{loginuser.name}</div>

                  <div className="user-email">{loginuser.email}</div>
                </div>
              </div>

              <div className="user-menu">
                {/* ORDERS */}

                <button onClick={() => userNavigate("/orders")}>
                  <ShoppingBagOutlinedIcon />

                  <span>My Orders</span>

                  <ArrowForwardIcon className="menu-arrow" />
                </button>

                {/* WISHLIST */}

                <button onClick={() => userNavigate("/wishlist")}>
                  <FavoriteBorderIcon />

                  <span>Wishlist</span>

                  <ArrowForwardIcon className="menu-arrow" />
                </button>

                {/* CART */}

                <button onClick={() => userNavigate("/cart")}>
                  <ShoppingBagOutlinedIcon />

                  <span>My Cart</span>

                  {cart > 0 && (
                    <span className="drawer-cart-count">{cart}</span>
                  )}

                  <ArrowForwardIcon className="menu-arrow" />
                </button>

                {/* PROFILE */}

                <button onClick={() => userNavigate("/profile")}>
                  <PersonOutlinedIcon />

                  <span>My Profile</span>

                  <ArrowForwardIcon className="menu-arrow" />
                </button>

                {/* SETTINGS */}

                <button onClick={() => userNavigate("/settings")}>
                  <SettingsOutlinedIcon />

                  <span>Account Settings</span>

                  <ArrowForwardIcon className="menu-arrow" />
                </button>
              </div>

              <div className="user-drawer-footer">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUserDrawer(false);
                    setisLoggedIn(false);
                    navigate("/");
                  }}
                >
                  <LogoutOutlinedIcon />
                  SIGN OUT
                </button>

                <div className="member-since">NOIR PRIVATE MEMBER</div>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default Home;
