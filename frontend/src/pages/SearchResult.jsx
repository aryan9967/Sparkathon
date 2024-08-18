import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import Chatbot from "../components/chatbot";
import Navbar from "../components/Navbar";
import SearchResultCard from "../components/SearchResultCard";

export default function Cart() {
    const [searchresult, setSearchResult] =useState(null)

    useEffect(()=>{
        const search_result = JSON.parse(localStorage.getItem("search_result"))
        setSearchResult(search_result.search_result)
    }
, [])
  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen">
      <div className="section_header">Products Found ({searchresult?.length})</div>
        <div className="search_result_container">
            {searchresult?.map((single_item, index)=>(
                <SearchResultCard product={single_item} key={index} />
            ))}
          
        </div>
        <Chatbot />
      </div>
    </div>
  );
}
