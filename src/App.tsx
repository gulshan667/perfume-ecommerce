import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import SearchResults from "./components/SearchResults"
import Login from "./components/Login"
import Register from "./components/Register"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"
import Cart from "./components/profile/Cart"
import BlogDetails from "./components/BlogDetails"
import Wishlist from "./components/profile/Wishlist"
// import Home from "./components/Home"
// import Design from "./Design"

const App = () => {
  return (

    <div>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/design" element={<Design/>} />
        <Route path="/home" element={<Home/>} /> */}
        <Route path="/" element={<Home/>} />
                <Route path="/blog/:slug" element={<BlogDetails />} />

        <Route path="/search" element={<SearchResults/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element = { <Wishlist/>}/>

        
        {/* <Route path="/" element={<Product/>} /> */}
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App