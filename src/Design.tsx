
// import { useEffect, useState } from "react";
// import { Button, IconButton } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import { useNavigate } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   const navigate = useNavigate();

//   const [show, setShow] = useState(false);
//   const [menu, setMenu] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(true);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <style>{`

//         * {
//           box-sizing: border-box;
//         }

//         html,
//         body,
//         #root {
//           margin: 0;
//           padding: 0;
//           width: 100%;
//           min-height: 100%;
//           background: #030303;
//         }

//         body {
//           font-family: Arial, Helvetica, sans-serif;
//           overflow-x: hidden;
//         }

//         /* ===============================
//            MAIN
//         =============================== */

//         .landing {
//           width: 100%;
//           min-height: 100vh;
//           position: relative;
//           overflow: hidden;
//           background:
//             radial-gradient(
//               circle at 50% 45%,
//               #21190e 0%,
//               #0d0b08 28%,
//               #050505 60%,
//               #020202 100%
//             );
//           color: white;
//         }

//         /* ===============================
//            BACKGROUND GRID
//         =============================== */

//         .grid {
//           position: absolute;
//           inset: 0;
//           opacity: .10;

//           background-image:
//             linear-gradient(
//               rgba(255,255,255,.08) 1px,
//               transparent 1px
//             ),
//             linear-gradient(
//               90deg,
//               rgba(255,255,255,.08) 1px,
//               transparent 1px
//             );

//           background-size: 90px 90px;

//           mask-image:
//             linear-gradient(
//               to bottom,
//               transparent,
//               black 20%,
//               black 80%,
//               transparent
//             );
//         }

//         /* ===============================
//            GOLD GLOW
//         =============================== */

//         .light {
//           position: absolute;
//           width: 650px;
//           height: 650px;
//           left: 50%;
//           top: 45%;

//           transform:
//             translate(-50%, -50%);

//           border-radius: 50%;

//           background:
//             radial-gradient(
//               circle,
//               rgba(205,169,103,.18),
//               rgba(205,169,103,.04) 40%,
//               transparent 70%
//             );

//           filter: blur(20px);

//           animation:
//             lightPulse 5s ease-in-out infinite;
//         }

//         @keyframes lightPulse {

//           0%,
//           100% {
//             opacity: .45;
//             transform:
//               translate(-50%, -50%)
//               scale(1);
//           }

//           50% {
//             opacity: .95;
//             transform:
//               translate(-50%, -50%)
//               scale(1.18);
//           }

//         }

//         /* ===============================
//            FLOATING PARTICLES
//         =============================== */

//         .particle {
//           position: absolute;
//           width: 3px;
//           height: 3px;

//           border-radius: 50%;

//           background: #d4b06d;

//           box-shadow:
//             0 0 12px #d4b06d;

//           opacity: .5;
//         }

//         .particle-one {
//           left: 12%;
//           top: 25%;
//           animation: particleMove 6s infinite;
//         }

//         .particle-two {
//           left: 38%;
//           top: 75%;
//           animation: particleMove 8s infinite reverse;
//         }

//         .particle-three {
//           right: 18%;
//           top: 22%;
//           animation: particleMove 7s infinite;
//         }

//         .particle-four {
//           right: 9%;
//           bottom: 20%;
//           animation: particleMove 5s infinite reverse;
//         }

//         .particle-five {
//           left: 48%;
//           top: 12%;
//           animation: particleMove 9s infinite;
//         }

//         @keyframes particleMove {

//           0% {
//             transform:
//               translate(0,0)
//               scale(.5);
//             opacity: .1;
//           }

//           50% {
//             transform:
//               translate(30px,-40px)
//               scale(1.5);
//             opacity: 1;
//           }

//           100% {
//             transform:
//               translate(0,0)
//               scale(.5);
//             opacity: .1;
//           }

//         }

//         /* ===============================
//            HEADER
//         =============================== */

//         .header {
//           position: absolute;
//           z-index: 50;

//           top: 0;
//           left: 0;

//           width: 100%;
//           height: 100px;

//           padding: 0 5%;

//           display: flex;
//           align-items: center;
//         }

//         .logo {
//           font-family: Georgia, serif;

//           font-size: 28px;

//           letter-spacing: 8px;

//           color: #f6efe3;
//         }

//         .logo span {
//           color: #d4af72;
//         }

//         .header-center {
//           position: absolute;

//           left: 50%;

//           transform:
//             translateX(-50%);

//           color: #666;

//           font-size: 8px;

//           letter-spacing: 4px;

//           white-space: nowrap;
//         }

//         .header-right {
//           margin-left: auto;

//           display: flex;

//           align-items: center;
//         }

//         .header-text {
//           color: #666;

//           font-size: 8px;

//           letter-spacing: 3px;

//           margin-right: 18px;
//         }

//         .header-icon {
//           color: #aaa !important;

//           transition: .3s !important;
//         }

//         .header-icon:hover {
//           color: #d4af72 !important;

//           transform:
//             rotate(90deg);
//         }

//         /* ===============================
//            CENTER IMAGE
//         =============================== */

//         .center-image-wrapper {
//           position: absolute;

//           width: min(390px, 60vw);

//           height: min(570px, 74vh);

//           left: 50%;
//           top: 50%;

//           transform:
//             translate(-50%, -50%);

//           z-index: 5;
//         }

//         .center-frame {
//           position: absolute;

//           inset: -18px;

//           border:
//             1px solid
//             rgba(212,175,114,.4);

//           animation:
//             frameRotate 20s linear infinite;
//         }

//         .center-frame::after {
//           content: "";

//           position: absolute;

//           inset: 10px;

//           border:
//             1px solid
//             rgba(255,255,255,.06);
//         }

//         @keyframes frameRotate {

//           from {
//             transform: rotate(0deg);
//           }

//           to {
//             transform: rotate(360deg);
//           }

//         }

//         .center-image {
//           position: relative;

//           width: 100%;
//           height: 100%;

//           object-fit: cover;

//           filter:
//             brightness(.78)
//             contrast(1.15)
//             saturate(.72);

//           animation:
//             imageFloat 6s ease-in-out infinite;

//           box-shadow:
//             0 40px 100px
//             rgba(0,0,0,.8);
//         }

//         @keyframes imageFloat {

//           0%,
//           100% {
//             transform:
//               scale(1)
//               translateY(0);
//           }

//           50% {
//             transform:
//               scale(1.04)
//               translateY(-10px);
//           }

//         }

//         .image-overlay {
//           position: absolute;

//           inset: 0;

//           background:
//             linear-gradient(
//               180deg,
//               rgba(0,0,0,.05),
//               rgba(0,0,0,.68)
//             );
//         }

//         /* ===============================
//            RINGS
//         =============================== */

//         .ring {
//           position: absolute;

//           left: 50%;
//           top: 50%;

//           transform:
//             translate(-50%, -50%);

//           border-radius: 50%;

//           border:
//             1px solid
//             rgba(212,175,114,.17);

//           pointer-events: none;
//         }

//         .ring-one {
//           width: 650px;
//           height: 650px;

//           animation:
//             ringRotate 25s linear infinite;
//         }

//         .ring-two {
//           width: 850px;
//           height: 850px;

//           border-style: dashed;

//           opacity: .35;

//           animation:
//             ringRotateReverse 35s linear infinite;
//         }

//         @keyframes ringRotate {

//           to {
//             transform:
//               translate(-50%, -50%)
//               rotate(360deg);
//           }

//         }

//         @keyframes ringRotateReverse {

//           to {
//             transform:
//               translate(-50%, -50%)
//               rotate(-360deg);
//           }

//         }

//         /* ===============================
//            LEFT CONTENT
//         =============================== */

//         .left-content {
//           position: absolute;

//           z-index: 20;

//           left: 7%;

//           top: 50%;

//           transform:
//             translateY(-50%);

//           max-width: 390px;

//           opacity: 0;
//         }

//         .left-content.show {
//           animation:
//             leftIn 1.3s .2s
//             cubic-bezier(.2,.8,.2,1)
//             forwards;
//         }

//         @keyframes leftIn {

//           from {
//             opacity: 0;

//             transform:
//               translate(-70px, -50%);
//           }

//           to {
//             opacity: 1;

//             transform:
//               translate(0, -50%);
//           }

//         }

//         .eyebrow {
//           color: #d4af72;

//           font-size: 9px;

//           letter-spacing: 5px;

//           display: flex;

//           align-items: center;

//           gap: 12px;
//         }

//         .eyebrow::before {
//           content: "";

//           width: 38px;
//           height: 1px;

//           background: #d4af72;
//         }

//         .main-title {
//           font-family: Georgia, serif;

//           font-weight: normal;

//           font-size:
//             clamp(55px, 7vw, 105px);

//           line-height: .82;

//           letter-spacing: -6px;

//           margin: 25px 0;
//         }

//         .main-title .outline {
//           color: transparent;

//           -webkit-text-stroke:
//             1px #aaa;
//         }

//         .main-title .gold {
//           color: #d4af72;

//           font-style: italic;
//         }

//         .description {
//           color: #777;

//           font-size: 11px;

//           line-height: 1.9;

//           max-width: 325px;

//           margin-bottom: 25px;
//         }

//         /* ===============================
//            BUTTON
//         =============================== */

//         .enter {
//           background:
//             linear-gradient(
//               100deg,
//               #b88b43,
//               #e0c083,
//               #b88b43
//             ) !important;

//           color: #050505 !important;

//           border-radius: 0 !important;

//           padding:
//             14px 25px !important;

//           font-size: 9px !important;

//           font-weight: bold !important;

//           letter-spacing: 2px;

//           transition:
//             .45s !important;
//         }

//         .enter:hover {
//           transform:
//             translateY(-6px)
//             scale(1.03);

//           box-shadow:
//             0 20px 70px
//             rgba(212,175,114,.28);
//         }

//         /* ===============================
//            RIGHT CONTENT
//         =============================== */

//         .right-content {
//           position: absolute;

//           z-index: 20;

//           right: 6%;

//           top: 50%;

//           transform:
//             translateY(-50%);

//           width: 220px;

//           opacity: 0;
//         }

//         .right-content.show {
//           animation:
//             rightIn 1.3s .5s
//             cubic-bezier(.2,.8,.2,1)
//             forwards;
//         }

//         @keyframes rightIn {

//           from {
//             opacity: 0;

//             transform:
//               translate(70px, -50%);
//           }

//           to {
//             opacity: 1;

//             transform:
//               translate(0, -50%);
//           }

//         }

//         .number {
//           font-family: Georgia, serif;

//           font-size: 80px;

//           line-height: 1;

//           color: transparent;

//           -webkit-text-stroke:
//             1px #d4af72;
//         }

//         .right-title {
//           font-family: Georgia, serif;

//           font-size: 25px;

//           margin-top: 12px;

//           letter-spacing: 1px;
//         }

//         .right-text {
//           color: #666;

//           font-size: 10px;

//           line-height: 1.9;

//           margin-top: 12px;
//         }

//         .small-line {
//           width: 45px;

//           height: 1px;

//           background: #d4af72;

//           margin-top: 20px;
//         }

//         /* ===============================
//            FLOATING PERFUME IMAGES
//         =============================== */

//         .float-card {
//           position: absolute;

//           z-index: 12;

//           width: 125px;

//           height: 165px;

//           overflow: hidden;

//           border:
//             1px solid
//             rgba(212,175,114,.3);

//           opacity: .72;

//           box-shadow:
//             0 20px 60px
//             rgba(0,0,0,.65);
//         }

//         .float-card img {
//           width: 100%;
//           height: 100%;

//           object-fit: cover;

//           filter:
//             brightness(.75)
//             saturate(.75);

//           transition: 1s;
//         }

//         .float-card:hover img {
//           transform: scale(1.12);
//         }

//         .float-one {
//           left: 31%;
//           top: 14%;

//           animation:
//             floatOne 7s ease-in-out infinite;
//         }

//         .float-two {
//           right: 28%;
//           bottom: 13%;

//           animation:
//             floatTwo 8s ease-in-out infinite;
//         }

//         @keyframes floatOne {

//           0%,
//           100% {
//             transform:
//               translateY(0)
//               rotate(-8deg);
//           }

//           50% {
//             transform:
//               translateY(-25px)
//               rotate(-3deg);
//           }

//         }

//         @keyframes floatTwo {

//           0%,
//           100% {
//             transform:
//               translateY(0)
//               rotate(8deg);
//           }

//           50% {
//             transform:
//               translateY(25px)
//               rotate(3deg);
//           }

//         }

//         /* ===============================
//            BOTTLE LABEL
//         =============================== */

//         .perfume-label {
//           position: absolute;

//           z-index: 20;

//           left: 50%;
//           bottom: 8%;

//           transform:
//             translateX(-50%);

//           width: 230px;

//           padding: 15px;

//           text-align: center;

//           background:
//             rgba(5,5,5,.62);

//           backdrop-filter:
//             blur(12px);

//           border:
//             1px solid
//             rgba(212,175,114,.25);
//         }

//         .perfume-small {
//           color: #d4af72;

//           font-size: 7px;

//           letter-spacing: 4px;
//         }

//         .perfume-name {
//           font-family: Georgia, serif;

//           font-size: 21px;

//           margin-top: 5px;

//           letter-spacing: 2px;
//         }

//         /* ===============================
//            BOTTOM
//         =============================== */

//         .bottom {
//           position: absolute;

//           z-index: 40;

//           left: 5%;
//           right: 5%;

//           bottom: 22px;

//           display: flex;

//           align-items: center;
//         }

//         .bottom-text {
//           color: #444;

//           font-size: 7px;

//           letter-spacing: 3px;
//         }

//         .scroll {
//           position: absolute;

//           left: 50%;

//           transform:
//             translateX(-50%);

//           display: flex;

//           flex-direction: column;

//           align-items: center;

//           color: #555;

//           font-size: 7px;

//           letter-spacing: 4px;
//         }

//         .scroll-line {
//           margin-top: 8px;

//           height: 38px;

//           width: 1px;

//           background:
//             linear-gradient(
//               #d4af72,
//               transparent
//             );

//           animation:
//             scrollAnimation 2s infinite;
//         }

//         @keyframes scrollAnimation {

//           0% {
//             opacity: 0;

//             transform:
//               translateY(-8px);
//           }

//           50% {
//             opacity: 1;
//           }

//           100% {
//             opacity: 0;

//             transform:
//               translateY(8px);
//           }

//         }

//         .social {
//           margin-left: auto;
//         }

//         .social-icon {
//           color: #555 !important;

//           transition: .3s !important;
//         }

//         .social-icon:hover {
//           color: #d4af72 !important;

//           transform:
//             translateY(-4px);
//         }

//         /* ===============================
//            MENU
//         =============================== */

//         .menu {
//           position: fixed;

//           inset: 0;

//           z-index: 100;

//           background:
//             radial-gradient(
//               circle at center,
//               #17120b,
//               #030303 65%
//             );

//           padding: 30px;

//           animation:
//             menuIn .4s ease;
//         }

//         @keyframes menuIn {

//           from {
//             opacity: 0;

//             transform:
//               scale(1.05);
//           }

//           to {
//             opacity: 1;

//             transform:
//               scale(1);
//           }

//         }

//         .menu-close {
//           float: right;

//           color: white !important;
//         }

//         .menu-content {
//           height: 100%;

//           display: flex;

//           flex-direction: column;

//           justify-content: center;

//           align-items: center;
//         }

//         .menu-link {
//           color: #777;

//           text-decoration: none;

//           font-family: Georgia, serif;

//           font-size:
//             clamp(45px, 7vw, 85px);

//           line-height: 1;

//           padding: 6px;

//           transition: .45s;
//         }

//         .menu-link:hover {
//           color: #d4af72;

//           transform:
//             translateX(18px)
//             skewX(-7deg);
//         }

//         /* ===============================
//            MOBILE
//         =============================== */

//         @media(max-width: 1000px) {

//           .center-image-wrapper {
//             opacity: .38;

//             right: -120px;

//             left: auto;

//             transform:
//               translateY(-50%);
//           }

//           .float-card {
//             display: none;
//           }

//           .right-content {
//             display: none;
//           }

//           .left-content {
//             left: 8%;
//           }

//         }

//         @media(max-width: 600px) {

//           .header {
//             height: 75px;

//             padding:
//               0 20px;
//           }

//           .logo {
//             font-size: 21px;

//             letter-spacing: 5px;
//           }

//           .header-center,
//           .header-text {
//             display: none;
//           }

//           .left-content {
//             left: 25px;
//             right: 25px;

//             top: 48%;
//           }

//           .main-title {
//             font-size: 64px;

//             letter-spacing: -4px;
//           }

//           .description {
//             max-width: 285px;
//           }

//           .center-image-wrapper {
//             width: 320px;

//             height: 450px;

//             right: -130px;

//             opacity: .27;
//           }

//           .ring-one {
//             width: 500px;
//             height: 500px;
//           }

//           .ring-two {
//             width: 650px;
//             height: 650px;
//           }

//           .bottom {
//             left: 20px;
//             right: 20px;
//           }

//           .scroll {
//             display: none;
//           }

//         }

//       `}</style>

//       <main className="landing">

//         {/* BACKGROUND */}

//         <div className="grid" />

//         <div className="light" />

//         <div className="particle particle-one" />
//         <div className="particle particle-two" />
//         <div className="particle particle-three" />
//         <div className="particle particle-four" />
//         <div className="particle particle-five" />

//         {/* HEADER */}

//         <header className="header">

//           <div className="logo">
//             NOIR<span>.</span>
//           </div>

//           <div className="header-center">
//             EST. 2026 • LUXURY FRAGRANCE HOUSE
//           </div>

//           <div className="header-right">

//             <span className="header-text">
//               DISCOVER MORE
//             </span>

//             <IconButton
//               className="header-icon"
//               onClick={() => setMenu(true)}
//             >
//               <MenuIcon />
//             </IconButton>

//           </div>

//         </header>

//         {/* ROTATING RINGS */}

//         <div className="ring ring-one" />
//         <div className="ring ring-two" />

//         {/* CENTER PERFUME IMAGE */}

//         <div className="center-image-wrapper">

//           <div className="center-frame" />

//           <img
//             className="center-image"
//             src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=90"
//             alt="Luxury perfume bottle"
//           />

//           <div className="image-overlay" />

//           <div className="perfume-label">

//             <div className="perfume-small">
//               EAU DE PARFUM
//             </div>

//             <div className="perfume-name">
//               AURELIA NO. 01
//             </div>

//           </div>

//         </div>

//         {/* FLOATING PERFUME IMAGE 1 */}

//         <div className="float-card float-one">

//           <img
//             src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=90"
//             alt="Luxury fragrance bottle"
//           />

//         </div>

//         {/* FLOATING PERFUME IMAGE 2 */}

//         <div className="float-card float-two">

//           <img
//             src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=90"
//             alt="Premium perfume"
//           />

//         </div>

//         {/* LEFT CONTENT */}

//         <section
//           className={`left-content ${
//             show ? "show" : ""
//           }`}
//         >

//           <div className="eyebrow">
//             WELCOME TO AURELIA
//           </div>

//           <h1 className="main-title">

//             FIND
//             <br />

//             <span className="outline">
//               YOUR
//             </span>

//             <br />

//             <span className="gold">
//               ESSENCE.
//             </span>

//           </h1>

//           <p className="description">
//             Discover exquisite fragrances crafted
//             for those who believe their scent
//             should be as unforgettable as their
//             presence.
//           </p>

//           <Button
//             className="enter"
//             endIcon={<ArrowForwardIcon />}
//             onClick={() => navigate("/home")}
//           >
//             EXPLORE STORES
//           </Button>

//         </section>

//         {/* RIGHT CONTENT */}

//         <section
//           className={`right-content ${
//             show ? "show" : ""
//           }`}
//         >

//           <div className="number">
//             01
//           </div>

//           <div className="right-title">
//             THE ART
//             <br />
//             OF SCENT
//           </div>

//           <div className="small-line" />

//           <p className="right-text">
//             Eau de parfum. Oud. Rose.
//             Amber. Discover carefully crafted
//             fragrances for every mood.
//           </p>

//         </section>

//         {/* BOTTOM */}

//         <div className="bottom">

//           <div className="bottom-text">
//             AURELIA FRAGRANCES © 2026
//           </div>

//           <div className="scroll">

//             SCROLL

//             <div className="scroll-line" />

//           </div>

//           <div className="social">

//             <IconButton className="social-icon">
//               <InstagramIcon fontSize="small" />
//             </IconButton>

//             <IconButton className="social-icon">
//               <FacebookIcon fontSize="small" />
//             </IconButton>

//             <IconButton className="social-icon">
//               <ShoppingBagOutlinedIcon fontSize="small" />
//             </IconButton>

//           </div>

//         </div>

//         {/* FULL SCREEN MENU */}

//         {menu && (

//           <div className="menu">

//             <IconButton
//               className="menu-close"
//               onClick={() => setMenu(false)}
//             >
//               <CloseIcon />
//             </IconButton>

//             <div className="menu-content">

//               <a
//                 href="#"
//                 className="menu-link"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setMenu(false);
//                   navigate("/home");
//                 }}
//               >
//                 Home
//               </a>

//               <a
//                 href="#"
//                 className="menu-link"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setMenu(false);
//                   navigate("/home");
//                 }}
//               >
//                 Shop
//               </a>

//               <a
//                 href="#"
//                 className="menu-link"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setMenu(false);
//                   navigate("/home");
//                 }}
//               >
//                 Collections
//               </a>

//               <a
//                 href="#"
//                 className="menu-link"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setMenu(false);
//                   navigate("/home");
//                 }}
//               >
//                 Contact
//               </a>

//             </div>

//           </div>

//         )}

//       </main>
//     </>
//   );
// }

// export default App;
