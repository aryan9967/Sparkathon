import { useEffect, useState } from "react";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import WishlistProduct from "../components/WishlistProduct";
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWhishlist] = useState(null);

  useEffect(() => {
    get_whishlist();
  }, []);

  async function get_whishlist() {
    try {
      const { data } = await axios.get("http://localhost:3000/wishlist");
      console.log(data);
      setWhishlist(data.wishlist_products);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
        <div className="wishlist_container">
          {wishlist?.map((single_item, index) => (
            <WishlistProduct product={single_item} key={index} />
          ))}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
