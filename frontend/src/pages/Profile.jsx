import { useEffect, useState } from "react";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import PreviousOrderCard from "../components/PreviousOrderCard";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [previousOrders, setPreviousOrders] = useState(null)

  useEffect(() => {
    get_profile();
  }, []);

  async function get_profile() {
    try {
      const { data } = await axios.get("http://localhost:3000/profile");
      console.log(data);
      setProfile(data);
      setPreviousOrders(data.previous_orders)
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
        <div className="profile card mt-4">
          <div className="card-body">
            <h5 className="card-title">Profile</h5>
            <p className="card-text mb-1">Name : {profile?.name}</p>
            <p className="card-text mb-1">Contact : {profile?.contact}</p>
            <p className="card-text mb-1">Gender : {profile?.gender}</p>
            <p className="card-text mb-1">
              Address : {profile?.address}
            </p>
            <p className="card-text mb-1">email : {profile?.email}</p>
          </div>
        </div>
        <div className="section_header">Previous Order</div>
        <div className="previous_order_container">
          {
            previousOrders?.map((single_item, index)=>(
                <PreviousOrderCard product={single_item} key={index}/>
            ))
          }
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
