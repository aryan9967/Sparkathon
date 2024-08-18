import { Route, Router, Routes } from "react-router-dom";
import "./App.css";

import Chatbot from "./components/chatbot";
import Homepage from "./pages/Homepage";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/wishlist" element={<Wishlist />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/searchresult" element={<SearchResult />}></Route>
    </Routes>
  );
}

export default App;
