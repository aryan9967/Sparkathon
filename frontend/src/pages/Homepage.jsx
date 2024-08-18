import "../styles/homepage.css";

import { NavLink } from "react-router-dom";
import img1 from "../../public/img1.jpg";
import img2 from "../../public/img2.jpg";
import img3 from "../../public/img3.jpg";
import Chatbot from "../components/chatbot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {
  const [products, setProducts] = useState(null);

  useEffect(  () => {
    get_all_product()
  }, []);

  async function get_all_product(){
    try{
        const {data} = await axios.get("http://localhost:3000/all_products")
        console.log(data)
        setProducts(data.products)
    }
    catch(err){
        console.error(err)
    }
  }

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={img1}
                className="d-block w-100 caraousel_image"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={img2}
                className="d-block w-100 caraousel_image"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={img3}
                className="d-block w-100 caraousel_image"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="section_header">Our Products</div>
        <div className="product_container">
          {products?.map((singleprod, index)=>(
            <ProductCard singleprod={singleprod} key={index}/>
          )
            
          )}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
