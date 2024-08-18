import axios from "axios";
import CartCard from "../components/CartCard";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Cart() {

    const [cart, setCart] = useState(null);
  

  useEffect(() => {
    get_cart();
  }, []);

  async function get_cart() {
    try {
      const { data } = await axios.get("http://localhost:3000/cart");
      console.log(data);
      setCart(data.cart_products);
      
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
            {cart?.map((single_item, index)=>(
                <CartCard product={single_item} key={index} />
            ))}
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
