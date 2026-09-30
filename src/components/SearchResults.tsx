import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Button,
  Drawer,
  Stack,
  Pagination,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
  isLatest: boolean;
}
type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
};

type LoginUser = {
  id: string;
  name: string;
  email: string;
  cart: CartItem[];
};



function SearchResults() {
  const [perfumes, setperfumes] = useState<Perfume[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [search, setSearch] = useState(initialQuery);
  const [drawer, setDrawer] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const [maxPrice, setMaxPrice] = useState(100);

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [discounts, setDiscounts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showSubscribed, setShowSubscribed] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

 const [loginuser, setloginuser] = useState<LoginUser>({
  id: "",
  name: "",
  email: "",
  cart: [],
});

  ///api
  useEffect(() => {
    const api = async () => {
      const response = await axios.get("https://noirperfume-api.runasp.net/api/Perfume2");
      setperfumes(response.data);
    };
    api();
  }, []);
  //
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);

  const handleSearch = () => {
    if (!search.trim()) {
      navigate("/search");
      return;
    }

    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  const toggleFilter = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const clearFilters = () => {
    setMaxPrice(100);
    setCategories([]);
    setBrands([]);
    setTypes([]);
    setRatings([]);
    setSizes([]);
    setDiscounts([]);
  };

  const filteredProducts = perfumes
    .filter(
      (item) =>
        item.price < maxPrice &&
        (categories.length === 0 || categories.includes(item.gender)) &&
        (brands.length === 0 || brands.includes(item.brand)) &&
(types.length === 0 || types.includes(item.fragranceType ?? "")) &&
        (ratings.length === 0 ||
          ratings.some((rating) => item.rating >= parseFloat(rating))) &&
        (sizes.length === 0 ||
          sizes.map((item2) => parseFloat(item2)).includes(item.sizeML)) &&
        (discounts.length === 0 ||
          discounts.some(
            (discount) => (item.salePercentage ?? 0) >= parseFloat(discount)
          )) &&
        (search === "" ||
          item.title == search ||
          item.gender.toLocaleLowerCase() == search ||
          item.brand.toLocaleLowerCase() == search),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "low":
          return a.price - b.price;
        case "high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const lenth = filteredProducts.filter(
    (item) => item.gender == "Men" || item.gender == "Women",
  );
  console.log(lenth);

 

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  //-------------
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          "https://noirperfume-api.runasp.net/api/Perfume2Users/me",
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
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  //------------------------
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
        "https://noirperfume-api.runasp.net/api/Perfume2Users/add-cart",
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
        `https://noirperfume-api.runasp.net/api/Perfume2Users/cart-increase-quantity?id=${loginuser.id}&pId=${Pid}`,
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
        `https://noirperfume-api.runasp.net/api/Perfume2Users/cart-decrease-quantity?id=${loginuser.id}&pId=${Pid}`,
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
        `https://noirperfume-api.runasp.net/api/Perfume2Users/cart/${loginuser.id}/${Pid}`,
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
  return (
    <div className="search-page">
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

        .search-page {
          min-height: 100vh;
          background:
            radial-gradient(
              circle at 10% 10%,
              rgba(197,164,109,.06),
              transparent 28%
            ),
            #080808;
        }

        .container-premium {
          width: min(1440px, 94%);
          margin: auto;
        }

        /* HEADER */

        .main-header {
          position: sticky !important;
          top: 0;
          z-index: 1000;
          background: rgba(8,8,8,.94) !important;
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #202020;
        }

        .logo {
          font-family: Georgia, serif;
          font-size: 31px;
          letter-spacing: 6px;
          color: #f4f1eb;
          text-decoration: none;
          white-space: nowrap;
        }

        .logo span,
        .footer-logo span {
          color: #c5a46d;
        }

        .header-search {
          height: 45px;
          background: #101010;
          border: 1px solid #292929;
          display: flex;
          align-items: center;
          padding: 0 15px;
          transition: .3s;
        }

        .header-search:focus-within {
          border-color: #c5a46d;
          box-shadow: 0 0 25px rgba(197,164,109,.08);
        }

        .header-search input {
          flex: 1;
          border: 0;
          outline: none;
          background: transparent;
          color: white;
          font-size: 13px;
        }

        .header-search input::placeholder {
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

        /* PRODUCTS */

        .products-section {
          padding: 70px 0 100px;
        }

        .result-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 35px;
          border-bottom: 1px solid #222;
          padding-bottom: 25px;
        }

        .result-count {
          color: #777;
          font-size: 12px;
        }

        .result-count strong {
          color: #eee;
        }

        .sort-box {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sort-box label {
          color: #555;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .sort-box select {
          background: #101010;
          color: #ddd;
          border: 1px solid #292929;
          padding: 10px 35px 10px 12px;
          outline: none;
          font-size: 11px;
        }
.noir-subscribe-btn {
  position: relative;
  overflow: hidden;
  padding: 13px 28px;
  border: 1px solid #c5a46d;
  background: #c5a46d;
  color: #080808;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s ease;
}

.noir-subscribe-btn:hover {
  background: transparent;
  color: #c5a46d;
  box-shadow: 0 0 25px rgba(197, 164, 109, 0.15);
}


/* OVERLAY */

.noir-subscribe-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.82);
  backdrop-filter: blur(12px);

  animation: noirOverlayIn 0.35s ease;
}


/* MODAL */

.noir-subscribe-modal {
  position: relative;
  width: 430px;
  max-width: calc(100% - 40px);

  padding: 55px 45px 45px;

  text-align: center;

  background:
    radial-gradient(
      circle at top,
      rgba(197, 164, 109, 0.09),
      transparent 45%
    ),
    #0b0b0b;

  border: 1px solid rgba(197, 164, 109, 0.35);

  box-shadow:
    0 30px 100px rgba(0, 0, 0, 0.8),
    inset 0 0 40px rgba(197, 164, 109, 0.025);

  animation: noirModalIn 0.5s cubic-bezier(.16,1,.3,1);
}


/* GOLD CORNER */

.noir-subscribe-modal::before,
.noir-subscribe-modal::after {
  content: "";
  position: absolute;
  width: 35px;
  height: 35px;
  border-color: #c5a46d;
  border-style: solid;
}

.noir-subscribe-modal::before {
  top: 12px;
  left: 12px;
  border-width: 1px 0 0 1px;
}

.noir-subscribe-modal::after {
  right: 12px;
  bottom: 12px;
  border-width: 0 1px 1px 0;
}


/* CLOSE */

.noir-subscribe-close {
  position: absolute;
  top: 16px;
  right: 18px;

  width: 32px;
  height: 32px;

  border: 1px solid rgba(197, 164, 109, 0.2);
  background: transparent;

  color: #aaa;
  font-size: 22px;
  font-weight: 200;

  cursor: pointer;

  transition: all 0.3s ease;
}

.noir-subscribe-close:hover {
  color: #c5a46d;
  border-color: #c5a46d;
  transform: rotate(90deg);
}


/* ICON */

.noir-subscribe-icon {
  width: 58px;
  height: 58px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(197, 164, 109, 0.55);
  border-radius: 50%;

  color: #c5a46d;
  font-size: 22px;

  box-shadow:
    0 0 25px rgba(197, 164, 109, 0.08);

  animation: noirGlow 2s infinite alternate;
}


/* LINE */

.noir-subscribe-line {
  width: 45px;
  height: 1px;

  margin: 0 auto 22px;

  background: #c5a46d;
}


/* TITLE */

.noir-subscribe-modal h2 {
  margin: 0;

  color: #f5f1e8;

  font-family: Georgia, serif;
  font-size: 27px;
  font-weight: 400;

  letter-spacing: 4px;
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
  .quantity-btn:hover {
  background: #c5a46d !important;
  color: #000 !important;
}

.quantity-number {
  flex: 1;
  text-align: center;
  color: #eee;
  font-size: 12px;
  font-weight: 600;
}

/* TEXT */

.noir-subscribe-modal p {
  margin: 18px auto 25px;

  max-width: 300px;

  color: #8f8f8f;

  font-size: 12px;
  line-height: 1.8;
  letter-spacing: 0.7px;
}

.noir-subscribe-modal p span {
  display: block;

  margin-top: 4px;

  color: #c5a46d;

  font-family: Georgia, serif;
  font-style: italic;
}


/* DIVIDER */

.noir-subscribe-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  margin: 25px 0;
  
  color: #c5a46d;
  font-size: 10px;
}

.noir-subscribe-divider span {
  width: 45px;
  height: 1px;
  background: rgba(197, 164, 109, 0.25);
}


/* MODAL BUTTON */

.noir-modal-btn {
  padding: 13px 32px;

  border: 1px solid #c5a46d;

  background: transparent;
  color: #c5a46d;

  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2.5px;

  cursor: pointer;

  transition: all 0.35s ease;
}

.noir-modal-btn:hover {
  background: #c5a46d;
  color: #080808;

  box-shadow:
    0 8px 30px rgba(197, 164, 109, 0.2);
}


/* ANIMATIONS */

@keyframes noirOverlayIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes noirModalIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.94);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes noirGlow {
  from {
    box-shadow: 0 0 10px rgba(197, 164, 109, 0.05);
  }

  to {
    box-shadow: 0 0 30px rgba(197, 164, 109, 0.18);
  }
}
        /* FILTER */

        .filter-box {
          background:
            linear-gradient(
              145deg,
              rgba(197,164,109,.035),
              transparent 35%
            ),
            #0d0d0d;
          border: 1px solid #242424;
          padding: 25px;
          position: sticky;
          top: 95px;
          max-height: calc(100vh - 115px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #333 transparent;
        }

        .filter-box::-webkit-scrollbar {
          width: 4px;
        }

        .filter-box::-webkit-scrollbar-thumb {
          background: #333;
        }

        .filter-title {
          font-family: Georgia, serif;
          font-size: 24px;
          color: #f4f1eb;
        }

        .clear-filter {
          background: transparent;
          border: 0;
          color: #666;
          font-size: 8px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: .3s;
        }

        .clear-filter:hover {
          color: #c5a46d;
        }

        .filter-heading {
          color: #c5a46d;
          font-size: 9px;
          letter-spacing: 2.5px;
          font-weight: 600;
          margin-bottom: 17px;
        }

        .filter-line {
          border-top: 1px solid #222;
          margin: 25px 0;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #777;
          font-size: 12px;
          margin-bottom: 13px;
          cursor: pointer;
          transition: .3s;
        }

        .filter-option:hover {
          color: #eee;
        }

        .filter-option input {
          width: 15px;
          height: 15px;
          accent-color: #c5a46d;
          cursor: pointer;
        }

        .filter-option small {
          margin-left: auto;
          color: #444;
          font-size: 9px;
        }

        .filter-option:hover small {
          color: #777;
        }

        /* PRICE */

        .price-values {
          display: flex;
          justify-content: space-between;
          color: #777;
          font-size: 11px;
          margin-bottom: 12px;
        }

        .price-range {
          width: 100%;
          height: 4px;
          accent-color: #c5a46d;
          cursor: pointer;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
        }

        .price-inputs > div {
          flex: 1;
          height: 38px;
          display: flex;
          align-items: center;
          background: #111;
          border: 1px solid #292929;
          padding: 0 8px;
        }
      /* PREMIUM PAGINATION */

.premium-pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 55px;
  padding-top: 30px;
  border-top: 1px solid #222;
}

.premium-pagination .MuiPagination-ul {
  gap: 8px;
}

.premium-pagination .MuiPaginationItem-root {
  width: 42px;
  height: 42px;
  border-radius: 0;
  border: 1px solid #292929;
  background: #101010;
  color: #777;
  font-size: 11px;
  transition: all .35s ease;
}

.premium-pagination .MuiPaginationItem-root:hover {
  background: #1a1a1a;
  border-color: #c5a46d;
  color: #c5a46d;
  transform: translateY(-3px);
}

.premium-pagination .MuiPaginationItem-root.Mui-selected {
  background: #c5a46d;
  border-color: #c5a46d;
  color: #050505;
  font-weight: 700;
  box-shadow: 0 8px 25px rgba(197,164,109,.18);
}

.premium-pagination .MuiPaginationItem-root.Mui-selected:hover {
  background: #e1c58f;
  color: #050505;
}

.premium-pagination .MuiPaginationItem-previousNext {
  color: #c5a46d;
}

.pagination-info {
  text-align: center;
  margin-top: 18px;
  color: #555;
  font-size: 10px;
  letter-spacing: 1.5px;
}
        .price-inputs span {
          color: #555;
          font-size: 11px;
        }

        .price-inputs input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: #ddd;
          font-size: 11px;
          padding-left: 5px;
        }

        .price-dash {
          color: #444 !important;
        }

        /* RATING */

        .rating-filter {
          justify-content: flex-start;
        }

        .filter-stars {
          color: #c5a46d !important;
          letter-spacing: 2px;
          font-size: 11px;
        }

        .rating-filter small {
          margin-left: auto;
        }

        /* SIZE */

        .size-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .size-option {
          cursor: pointer;
        }

        .size-option input {
          display: none;
        }

        .size-option span {
          display: block;
          text-align: center;
          padding: 11px 5px;
          border: 1px solid #292929;
          background: #101010;
          color: #777;
          font-size: 9px;
          letter-spacing: 1px;
          transition: .3s;
        }

        .size-option:hover span {
          border-color: #c5a46d;
          color: #c5a46d;
        }

        .size-option input:checked + span {
          background: #c5a46d;
          border-color: #c5a46d;
          color: #050505;
        }

        /* PRODUCT CARD */

        .product-card {
          height: 100%;
          background: #101010;
          border: 1px solid #1e1e1e;
          overflow: hidden;
          transition: .45s;
        }

        .product-card:hover {
          transform: translateY(-8px);
          border-color: #3b3b3b;
          box-shadow: 0 25px 60px rgba(0,0,0,.45);
        }

        .product-image {
          height: 330px;
          background: #151515;
          position: relative;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: .7s;
        }

        .product-card:hover .product-image img {
          transform: scale(1.08);
        }

        .sale {
          position: absolute;
          left: 13px;
          top: 13px;
          z-index: 3;
          background: #c5a46d;
          color: #050505;
          font-size: 9px;
          font-weight: bold;
          padding: 6px 9px;
        }

        .wishlist {
          position: absolute;
          right: 13px;
          top: 13px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #333;
          background: rgba(5,5,5,.85);
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 3;
          transition: .3s;
        }

        .wishlist:hover {
          background: #c5a46d;
          color: #000;
        }

        .product-info {
          padding: 20px;
        }

        .product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.rating-stars {
  color: #c5a46d;
  font-size: 11px;
  letter-spacing: 2px;
  line-height: 1;
}

.rating-value {
  color: #777;
  font-size: 11px;
  font-weight: 500;
}

.product-brand {
  display: inline-block;
  color: #c5a46d;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

       .product-title {
  color: #f1eee8;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: .2px;
  margin: 8px 0 10px;
  transition: .3s;

  
}
  .product-price-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.product-old-price {
  color: #555;
  font-size: 11px;
  text-decoration: line-through;
}

.product-current-price {
  color: #c5a46d;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: .2px;
}

.product-discount {
  display: inline-flex;
  align-items: center;
  padding: 4px 7px;
  background: rgba(197,164,109,.12);
  border: 1px solid rgba(197,164,109,.25);
  color: #c5a46d;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 1px;
}

.product-card:hover .product-title {
}
        .price {
          color: #c5a46d;
          font-size: 15px;
          font-weight: bold;
        }

        .old-price {
          color: #555;
          text-decoration: line-through;
          font-size: 11px;
          margin-right: 8px;
          font-weight: normal;
        }

        .product-buttons {
          display: flex;
          gap: 8px;
          margin-top: 17px;
        }

        .cart-btn,
        .buy-btn {
          flex: 1;
          padding: 11px 5px;
          font-size: 9px;
          letter-spacing: 1px;
          font-weight: bold;
          cursor: pointer;
          transition: .3s;
        }

        .cart-btn {
          border: 1px solid #333;
          background: transparent;
          color: #ddd;
        }

        .cart-btn:hover {
          background: #c5a46d;
          border-color: #c5a46d;
          color: #000;
        }

        .buy-btn {
          border: 1px solid #c5a46d;
          background: #c5a46d;
          color: #050505;
        }

        .buy-btn:hover {
          background: #e1c58f;
        }

        /* EMPTY */

        .empty {
          text-align: center;
          padding: 100px 20px;
          border: 1px solid #1e1e1e;
          background: #0d0d0d;
        }

        .empty-icon {
          color: #c5a46d;
          margin-bottom: 20px;
        }

        .empty h2 {
          font-family: Georgia, serif;
          font-weight: normal;
          font-size: 35px;
        }

        .empty p {
          color: #666;
          font-size: 12px;
        }

        /* DRAWER */

        .drawer {
          width: 300px;
          min-height: 100%;
          background: #0b0b0b;
          color: white;
          padding: 25px;
        }

        .drawer-link {
          display: block;
          color: #aaa;
          text-decoration: none;
          padding: 16px 0;
          border-bottom: 1px solid #222;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .drawer-link:hover {
          color: #c5a46d;
        }

        /* FOOTER */

        .premium-footer {
          background:
            radial-gradient(
              circle at 80% 20%,
              rgba(197,164,109,.08),
              transparent 30%
            ),
            #050505;
          border-top: 1px solid #222;
          padding: 75px 0 25px;
        }

        .footer-logo {
          font-family: Georgia, serif;
          font-size: 30px;
          letter-spacing: 6px;
          color: #f4f1eb;
          margin-bottom: 18px;
        }

        .footer-description {
          color: #666;
          font-size: 12px;
          line-height: 1.9;
          max-width: 330px;
        }

        .footer-heading {
          color: #c5a46d;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: bold;
          margin-bottom: 22px;
        }

        .footer-link {
          display: block;
          color: #777;
          text-decoration: none;
          font-size: 12px;
          margin-bottom: 14px;
          transition: .3s;
        }

        .footer-link:hover {
          color: #c5a46d;
          transform: translateX(4px);
        }

        .footer-newsletter {
          display: flex;
          height: 45px;
          border: 1px solid #292929;
          background: #0d0d0d;
          margin-top: 15px;
        }

        .footer-newsletter input {
          flex: 1;
          min-width: 0;
          border: 0;
          outline: none;
          background: transparent;
          color: white;
          padding: 0 14px;
          font-size: 12px;
        }

        .footer-newsletter input::placeholder {
          color: #555;
        }

        .footer-newsletter button {
          border: 0;
          background: #c5a46d;
          color: #050505;
          padding: 0 20px;
          font-size: 9px;
          font-weight: bold;
          letter-spacing: 1px;
          transition: .3s;
        }

        .footer-newsletter button:hover {
          background: #e0c58f;
        }

        .footer-social {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .footer-social button {
          width: 38px;
          height: 38px;
          border: 1px solid #292929;
          background: #0d0d0d;
          color: #aaa;
          border-radius: 50%;
          transition: .3s;
        }

        .footer-social button:hover {
          color: #050505;
          background: #c5a46d;
          border-color: #c5a46d;
          transform: translateY(-3px);
        }

        .footer-bottom {
          border-top: 1px solid #1d1d1d;
          margin-top: 55px;
          padding-top: 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .footer-copy {
          color: #555;
          font-size: 10px;
          letter-spacing: .5px;
        }

        .footer-policy {
          display: flex;
          gap: 22px;
        }

        .footer-policy a {
          color: #555;
          text-decoration: none;
          font-size: 10px;
        }

        .footer-policy a:hover {
          color: #c5a46d;
        }

        @media(max-width: 991px) {
          .filter-box {
            position: static;
            max-height: none;
            margin-bottom: 35px;
          }
        }

        @media(max-width: 576px) {
          .logo {
            font-size: 23px;
          }

          .result-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .product-image {
            height: 280px;
          }

          .product-buttons {
            flex-direction: column;
          }

          .premium-footer {
            padding: 55px 0 20px;
          }

          .footer-column {
            margin-bottom: 35px;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-policy {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>

      {/* HEADER */}

      <AppBar position="sticky" elevation={0} className="main-header">
        <Toolbar className="container-premium py-2">
          <IconButton
            className="d-lg-none"
            onClick={() => setDrawer(true)}
            sx={{ color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>

          <a
            href="/"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            NOIR<span>.</span>
          </a>

          <div className="d-none d-md-flex flex-grow-1 mx-4">
            <div className="header-search w-100">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search perfume..."
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

          <div className="d-flex">
           

            <IconButton className="header-icon d-none d-md-flex" 
            onClick={() => navigate("/wishlist")}>
              <FavoriteBorderIcon />
            </IconButton>

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

      {/* PRODUCTS */}

      <section className="products-section">
        <div className="container-premium">
          <div className="result-top">
            <div className="result-count">
              <strong>{filteredProducts.length}</strong> PRODUCTS FOUND
              {search && (
                <>
                  {" "}
                  FOR <strong>"{search}"</strong>
                </>
              )}
            </div>

            <div className="sort-box">
              <label>SORT BY</label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>

                <option value="low">Price: Low to High</option>

                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="row">
            {/* FILTER SIDEBAR */}

            <div className="col-lg-3">
              <div className="filter-box">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="filter-title">Filters</div>

                  <button className="clear-filter" onClick={clearFilters}>
                    CLEAR ALL
                  </button>
                </div>

                {/* CATEGORY */}

                <div className="filter-heading">CATEGORY</div>

                {[
                  ["Men", "24"],
                  ["Women", "32"],
                  ["Unisex", "18"],
                ].map(([name, count]) => (
                  <label className="filter-option" key={name}>
                    <input
                      type="checkbox"
                      checked={categories.includes(name)}
                      onChange={() => toggleFilter(name, setCategories)}
                    />

                    <span>{name}</span>

                    <small>({count})</small>
                  </label>
                ))}

                <div className="filter-line" />

                {/* PRICE */}

                <div className="filter-heading">PRICE RANGE</div>

                <div className="price-values">
                  <span>$0</span>

                  <span>${maxPrice}</span>
                </div>

                <input
                  className="price-range"
                  type="range"
                  min="0"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />

                <div className="price-inputs">
                  <div>
                    <span>$</span>

                    <input type="number" value={0} readOnly />
                  </div>

                  <span className="price-dash">—</span>

                  <div>
                    <span>$</span>

                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="filter-line" />

                {/* BRAND */}

                <div className="filter-heading">BRAND</div>

                {[
                  ["NOIR", "12"],
                  ["AURA", "16"],
                  ["ELITE", "9"],
                ].map(([name, count]) => (
                  <label className="filter-option" key={name}>
                    <input
                      type="checkbox"
                      checked={brands.includes(name)}
                      onChange={() => toggleFilter(name, setBrands)}
                    />

                    <span>{name}</span>

                    <small>({count})</small>
                  </label>
                ))}

                <div className="filter-line" />

                {/* FRAGRANCE TYPE */}

                <div className="filter-heading">FRAGRANCE TYPE</div>

                {[
                  ["Eau de Parfum", "28"],
                  ["Eau de Toilette", "17"],
                  ["Parfum", "8"],
                ].map(([name, count]) => (
                  <label className="filter-option" key={name}>
                    <input
                      type="checkbox"
                      checked={types.includes(name)}
                      onChange={() => toggleFilter(name, setTypes)}
                    />

                    <span>{name}</span>

                    <small>({count})</small>
                  </label>
                ))}

                <div className="filter-line" />

                <div className="filter-heading">CUSTOMER RATING</div>

                {[
                  ["★★★★★", "4.5+"],
                  ["★★★★", "4.0+"],
                  ["★★★", "3.0+"],
                ].map(([stars, value]) => (
                  <label className="filter-option rating-filter" key={value}>
                    <input
                      type="checkbox"
                      checked={ratings.includes(value)}
                      onChange={() => toggleFilter(value, setRatings)}
                    />

                    <span className="filter-stars">{stars}</span>

                    <small>{value}</small>
                  </label>
                ))}

                <div className="filter-line" />

                {/* SIZE */}

                <div className="filter-heading">SIZE</div>

                <div className="size-grid">
                  {["30 ML", "50 ML", "75 ML", "100 ML"].map((size) => (
                    <label className="size-option" key={size}>
                      <input
                        type="checkbox"
                        checked={sizes.includes(size)}
                        onChange={() => toggleFilter(size, setSizes)}
                      />

                      <span>{size}</span>
                    </label>
                  ))}
                </div>

                <div className="filter-line" />

                {/* DISCOUNT */}

                <div className="filter-heading">DISCOUNT</div>

                {[
                  "10% & Above",
                  "20% & Above",
                  "30% & Above",
                  "50% & Above",
                ].map((discount) => (
                  <label className="filter-option" key={discount}>
                    <input
                      type="checkbox"
                      checked={discounts.includes(discount)}
                      onChange={() => toggleFilter(discount, setDiscounts)}
                    />

                    <span>{discount}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRODUCT GRID */}

            <div className="col-lg-9">
              {filteredProducts.length > 0 ? (
                <div className="row g-4">
                  {paginatedProducts.map((product, index) =>{ 
                    const cartItem = cartItems.find(
                (item) => Number(item.productId) === Number(product.id),
              );
                    return(
                    <div className="col-6 col-md-6 col-xl-4" key={index}>
                      <div className="product-card">
                        <div className="product-image">
                          {product.isSale && (
                            <div className="sale">
                              -{product.salePercentage}%
                            </div>
                          )}

                          <button className="wishlist">
                            <FavoriteBorderIcon
                              sx={{
                                fontSize: 18,
                              }}
                            />
                          </button>

                          <img src={product.imageUrl} alt={product.title} />
                        </div>

                        <div className="product-info">
                          <div className="product-rating">
                            <span className="rating-stars">★★★★★</span>
                            <span className="rating-value">
                              {product.rating}
                            </span>
                          </div>
                          <div className="product-brand">{product.brand}</div>
                          <div className="product-title">{product.title}</div>
                          <div className="product-price-row">
                            {product.oldPrice && (
                              <span className="product-old-price">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}

                            <span className="product-current-price">
                              ${product.price.toFixed(2)}
                            </span>

                            {product.isSale && (
                              <span className="product-discount">
                                -{product.salePercentage}%
                              </span>
                            )}
                          </div>
                          {/* add to cart <----------------->*/}

                          <div className="product-buttons">
                            
                            {/* { cartItem ?() :()} */}
                            {/* <button className="cart-btn" onClick={addCart}>
                              ADD TO CART
                            </button> */}
                            {/* add to cart <----------------->*/}
                          
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
                            className="cart-btn"
                            onClick={() => handleAddToCart(product.id)}
                          >
                            ADD TO CART
                          </button>
                        )}


                            <button
                              className="buy-btn"
                              onClick={() => alert(`Buying ${product.brand}`)}
                            >
                              BUY NOW
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  })}
                  {totalPages > 1 && (
                    <>
                      <div className="premium-pagination-wrapper">
                        <Stack spacing={2} className="premium-pagination">
                          <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(_, page) => {
                              setCurrentPage(page);

                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                            variant="outlined"
                            shape="rounded"
                            siblingCount={1}
                            boundaryCount={1}
                          />
                        </Stack>
                      </div>

                      <div className="pagination-info">
                        SHOWING {startIndex + 1}-
                        {Math.min(
                          startIndex + productsPerPage,
                          filteredProducts.length,
                        )}{" "}
                        OF {filteredProducts.length} PRODUCTS
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="empty">
                  <div className="empty-icon">
                    <SearchIcon
                      sx={{
                        fontSize: 45,
                      }}
                    />
                  </div>

                  <h2>No Fragrance Found</h2>

                  <p>We couldn't find any perfume matching "{search}".</p>

                  <Button
                    className="buy-btn mt-3"
                    onClick={() => {
                      setSearch("");
                      clearFilters();
                      navigate("/search");
                    }}
                  >
                    VIEW ALL PRODUCTS
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE DRAWER */}

      <Drawer anchor="left" open={drawer} onClose={() => setDrawer(false)}>
        <div className="drawer">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo">
              NOIR<span>.</span>
            </div>

            <IconButton
              onClick={() => setDrawer(false)}
              sx={{
                color: "#fff",
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className="mt-4">
            <a
              href="/home"
              className="drawer-link"
              onClick={(e) => {
                e.preventDefault();
                setDrawer(false);
                navigate("/home");
              }}
            >
              HOME
            </a>

            <a
              href="/search"
              className="drawer-link"
              onClick={(e) => {
                e.preventDefault();
                setDrawer(false);
                navigate("/search");
              }}
            >
              SHOP
            </a>

            <a
              href="/search?q=men"
              className="drawer-link"
              onClick={() => setDrawer(false)}
            >
              MEN'S PERFUME
            </a>

            <a
              href="/search?q=women"
              className="drawer-link"
              onClick={() => setDrawer(false)}
            >
              WOMEN'S PERFUME
            </a>
          </div>
        </div>
      </Drawer>

      {/* FOOTER */}

      <footer className="premium-footer">
        <div className="container-premium">
          <div className="row">
            <div className="col-lg-4 col-md-6 footer-column">
              <div className="footer-logo">
                NOIR<span>.</span>
              </div>

              <p className="footer-description">
                Discover a world of timeless fragrances crafted for those who
                appreciate elegance, confidence and individuality.
              </p>

              <div className="footer-social">
                <button>
                  <InstagramIcon sx={{ fontSize: 17 }} />
                </button>

                <button>
                  <FacebookIcon sx={{ fontSize: 17 }} />
                </button>

                <button>
                  <EmailOutlinedIcon sx={{ fontSize: 17 }} />
                </button>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-column">
              <div className="footer-heading">SHOP</div>

              <a
                href="/search"
                className="footer-link"
                onClick={() => {
                  setSearch("");
                  clearFilters();
                  navigate("/search");
                }}
              >
                All Perfumes
              </a>

              <a
                href="#"
                className="footer-link"
                onClick={() => {
                  setCategories(["Men"]);
                }}
              >
                Men's Collection
              </a>

              <a
                href="#"
                className="footer-link"
                onClick={() => {
                  setCategories(["Women"]);
                }}
              >
                Women's Collection
              </a>

              <a
                href="#"
                className="footer-link"
                onClick={() => {
                  setCategories(["Unisex"]);
                }}
              >
                Unisex
              </a>
            </div>

            <div className="col-lg-2 col-md-6 footer-column">
              <div className="footer-heading">INFORMATION</div>

              <a href="#" className="footer-link">
                About Us
              </a>

              <a href="#" className="footer-link">
                Contact
              </a>

              <a href="#" className="footer-link">
                Shipping
              </a>

              <a href="#" className="footer-link">
                Returns
              </a>
            </div>

            <div className="col-lg-4 col-md-6 footer-column">
              <div className="footer-heading">JOIN THE NOIR WORLD</div>

              <p className="footer-description">
                Subscribe to receive exclusive collections, fragrance stories
                and special offers.
              </p>

              <div className="footer-newsletter">
                <input type="email" placeholder="Your email address" />

                {showSubscribed ? (
                  <button className="noir-subscribe-btn disbaled">
                    SUBSCRIBED
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubscribe(true)}
                    className="noir-subscribe-btn"
                  >
                    SUBSCRIBE
                  </button>
                )}
              </div>
              {showSubscribe && (
                <div className="noir-subscribe-overlay">
                  <div className="noir-subscribe-modal">
                    <button
                      className="noir-subscribe-close"
                      onClick={() => setShowSubscribe(false)}
                    >
                      ×
                    </button>

                    <div className="noir-subscribe-icon">✦</div>

                    <div className="noir-subscribe-line"></div>

                    <h2>WELCOME TO NOIR</h2>

                    <p>
                      You’re now part of our exclusive world of
                      <span> luxury &amp; fragrance.</span>
                    </p>

                    <div className="noir-subscribe-divider">
                      <span></span>✦<span></span>
                    </div>

                    <button
                      className="noir-modal-btn"
                      onClick={() => {
                        setShowSubscribe(false);
                        setShowSubscribed(true);
                      }}
                    >
                      CONTINUE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">© 2026 NOIR. ALL RIGHTS RESERVED.</div>

            <div className="footer-policy">
              <a href="#">PRIVACY</a>

              <a href="#">TERMS</a>

              <a href="#">COOKIES</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SearchResults;
