import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import axios from "axios";
interface perfumes {
  id: number;
  title: string;
  brand: string;
  rating: number ;
  price: number;
  gender: string;
  imageUrl: string;
  sizeML: number;
}

const Product = () => {
  const [perfumes, setperfumes] = useState<perfumes[]>([]);
  const [Brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("All");
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(500);
  const [prise, setprise] = useState<number[]>([min, max]);
  const handleChange = (_event: Event, newValue: number | number[]) => {
    const values = newValue as number[];
    setprise(values);
    setmin(values[0]);
    setmax(values[1]);
  };
  const valuetext = (prise: number) => {
    return `$${prise}`;
  };

  useEffect(() => {
    const api = async () => {
      const response = await axios.get("http://noirperfume-api.runasp.net/api/Perfume");
      setperfumes(response.data);
    };

    api();
  }, []);

  const filterperfumes = perfumes.filter(
    (item) =>
      item.price >= min &&
      item.price <= max &&
      (Brand === "" || item.brand === Brand)&&
      (rating === "" || item.rating >= Number(rating))
  ).sort((a, b)=>{
      switch(sortBy){
          case "Name; A to Z":
            return a.title.localeCompare(b.title);
            case "Name: Z to A":
          return b.title.localeCompare(a.title);
  
        case "Price: Low to High":
          return a.price - b.price;
  
        case "Price: High to Low":
          return b.price - a.price;
  
        case "Rating: High to Low":
          return b.rating - a.rating;
  
        default:
          return 0;
      }
    })


  return (
    <div className="vh-100">
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            MyStore
          </a>

          <div className="d-flex align-items-center gap-4">
            <a className="nav-link text-white" href="#">
              Home
            </a>

            <a className="nav-link text-white" href="#">
              About
            </a>

            <a className="nav-link text-white" href="#">
              Contact
            </a>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: "70px" }}></div>

      <div className="mx-4">
        <div className="row pt-3">
          {/* Filter */}
          <div className="col-2 border-end">
            <div
              className="sticky-top"
              style={{
                top: "80px",
              }}
            >
              <div className="p-3">
                <div className="p-3">
                  <h5 className="mb-4">Filters</h5>
                  <hr />
                  {/* Price */}
                  <div className="mb-4">
                    <h6>Price</h6>
                    {/* Price Range */}
                    <Slider
                      getAriaLabel={() => "Price range"}
                      value={prise}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      min={0}
                      max={500}
                      step={50}
                    />{" "}
                    <div className="d-flex justify-content-between">
                      {" "}
                      <small>${min}</small> <small>${max}</small>{" "}
                    </div>
                  </div>
                  <hr />
                  {/* Brand */}
                  <h6>Brand</h6>
                  <select
                    className="form-select mb-4"
                    value={Brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    <option value="Luxe Aroma">Luxe Aroma</option>
                    <option value="Maison Luxe">Maison Luxe</option>
                    <option value="Royal Scents">Royal Scents</option>
                    <option value="Arabian Luxe">Arabian Luxe</option>
                  </select>
                  <hr />
                  {/* Rating */}
                  <h6>Rating</h6>
                  <select
                    className="form-select mb-4"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">All Ratings</option>
                    <option value="4.9">4.9 & above</option>
                    <option value="4.7">4.7 & above</option>
                    <option value="4.5">4.5 & above</option>
                  </select>
                  <hr />
                  {/* Sort */}
                  <h6>Sort By</h6>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option>Name: A to Z</option>
                    <option>Name: Z to A</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col p-2">
            {/* Products------------- */}
            {/* Top Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="mb-1">Products</h4>
                <small className="text-muted">Showing {filterperfumes.length} products</small>
              </div>
            </div>

            <div className="col"></div>
            {/* Products */}

            <div className="row g-4">
              {filterperfumes.map((item) => (
                <div className="col-lg-4 col-md-6" key={item.id}>
                  <div className="card h-100 border-0 shadow-sm">
                    {/* Image */}
                    <div className="position-relative">
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        alt={item.title}
                        style={{
                          height: "220px",
                          objectFit: "cover",
                        }}
                      />

                      <span className="badge bg-dark position-absolute top-0 end-0 m-2">
                        BEST SELLER
                      </span>
                    </div>

                    {/* Details */}
                    <div className="card-body">
                      <small className="text-muted">EAU DE PARFUM</small>

                      <h5 className="card-title mt-2 mb-2">{item.title}</h5>

                      <p className="text-muted small mb-2">{item.brand}</p>

                      {/* Rating */}
                      <div className="mb-2">
                        <span className="text-warning">
                          {"★".repeat(Math.round(item.rating))}
                        </span>

                        <small className="text-muted ms-2">
                          ({item.rating})
                        </small>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <span className="fs-5 fw-bold">${item.price}</span>

                        <small className="text-muted ms-2">
                          {item.sizeML} ML
                        </small>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex gap-2">
                        <button className="btn btn-dark w-50">Buy Now</button>

                        <button className="btn btn-outline-dark w-50">
                          Add Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
