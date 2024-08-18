import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { speakText } from "../speech";
import AIicon from "../../public/Animation - 1723745985736.webm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Chatbot() {
  const [transcript1, setTranscript] = useState(null);
  const recognitionRef = useRef(null);
  const transcriptRef = useRef(transcript1);
  const accumulatedTranscriptRef = useRef("");
  const chatStatusref = useRef(false);
  const loopref = useRef(false);
  const navigate = useNavigate();
  const [chatVisibility, setChatVisibility] = useState(false);
  const [chatContent, setChatContent] = useState("Hello, I am Mark, your personal shopping assistant. How may I assist you?");
  // Update the ref whenever transcript1 changes
  useEffect(() => {
    transcriptRef.current = transcript1;
  }, [transcript1]);

  useEffect(() => {
    const chatStatus = localStorage.getItem("chatActive");
    chatStatusref.current = chatStatus;
    console.log(chatStatus);
    // if (chatStatus) {
    //   const AIbutton = document.getElementById("AIbutton");
    //   AIbutton.click();
    // }
  }, []);

  const startChat = () => {
    socket.connect();

    socket.on("connect", () => {
      console.log(socket.id);
    });

    const textToSpeak =
      "Hello, I am Mark, your personal shopping assistant. How may I assist you?";

    if (window.location.pathname === "/" && chatStatusref.current) {
      speakText(textToSpeak);
    }

    startRecognition();
  };

  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true; // Keep recognizing speech until stopped
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        console.log(result);
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
          setTimeout(() => {
            recognitionRef.current.stop();
            console.log("stopped by timeout");
          }, 2500);
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      // Update the ref with the latest final transcript
      accumulatedTranscriptRef.current += finalTranscript;

      // For interim results, append to the current accumulated transcript
      setTranscript(accumulatedTranscriptRef.current + interimTranscript);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      console.log(accumulatedTranscriptRef.current); // State value might not be updated yet
      if (accumulatedTranscriptRef.current) {
        console.log(accumulatedTranscriptRef.current);
        setChatContent(accumulatedTranscriptRef.current)
        socket.emit("prompt", accumulatedTranscriptRef.current);
      }
      accumulatedTranscriptRef.current = "";
      setTranscript(accumulatedTranscriptRef.current);
      if (loopref.current) {
        startRecognition();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
    };

    recognitionRef.current = recognition;

    // return () => {
    //   if (recognitionRef.current) {
    //     recognitionRef.current.stop();
    //   }
    // };
  }, []);

  async function add_to_cart(product_name) {
    const last_index = product_name.indexOf(`\\`);
    const new_product_name = String(product_name.slice(0, last_index).trim());
    const { data } = await axios.post("http://localhost:3000/add_to_cart", {
      product_name: new_product_name,
    });
    console.log(data);
    speakText(data);
    setChatContent(data)
  }

  async function add_to_wishlist(product_name) {
    const last_index = product_name.indexOf(`\\`);
    const new_product_name = String(product_name.slice(0, last_index).trim());
    const { data } = await axios.post("http://localhost:3000/add_to_wishlist", {
      product_name: new_product_name,
    });
    console.log(data);
    speakText(data);
    setChatContent(data)
  }

  useEffect(() => {
    const handleResponse = (response) => {
      console.log(response);

      const first_index = response.indexOf(`{`);
      const last_index = response.lastIndexOf(`}`);

      if (
        first_index > -1 &&
        last_index > -1 &&
        response.indexOf("JSON") > -1
      ) {
        const json_extract = response.slice(first_index, last_index + 1);
        const response_json = JSON.parse(json_extract);
        console.log(response_json);
        localStorage.setItem("search_result", JSON.stringify(response_json));
        navigate("/searchresult");
        speakText(response_json.summary);
        setChatContent(response_json.summary)
        return;
      }

      const parts = response.split(" ");
      if (parts[0].toLowerCase() === "cart") {
        console.log(response.slice(5));
        add_to_cart(response.slice(5));
        return;
      }

      if (parts[0].toLowerCase() === "wishlist") {
        console.log(response.slice(9));
        add_to_wishlist(response.slice(9));
        return;
      }
      let pagename;

      // If the command starts with "open", process it
      if (parts[0].toLowerCase() === "open") {
        // Join the remaining parts, normalize by removing spaces and converting to lowercase
        pagename = parts.slice(1).join(" ").replace(/\s+/g, "").toLowerCase();

        console.log(pagename);

        // Define a mapping of possible variations to correct routes
        const pageRoutes = {
          home: "/",
          homepage: "/",
          wishlist: "/wishlist",
          wishlistpage: "/wishlist",
          cart: "/cart",
          cartpage: "/cart",
          profile: "/profile",
          profilepage: "/profile",
        };

        // Check if the normalized page name exists in the mapping
        if (pageRoutes[pagename]) {
          speakText(`opening ${pagename}`);
          navigate(pageRoutes[pagename]);
        } else {
          speakText("Invalid page name");
        }
      } else {
        setChatContent(response)
        speakText(response);
      }
      startRecognition();
    };

    socket.on("response", handleResponse);

    return () => {
      socket.off("response", handleResponse); // Clean up the listener
    };
  }, []);

  const startRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <>
      <button
        className="button AIbutton"
        id="AIbutton"
        onClick={() => {
          if (!loopref.current) {
            startChat();
            localStorage.setItem("chatActive", "true");
            setChatVisibility(true);
          } else {
            localStorage.setItem("chatActive", "false");
          }
          loopref.current = !loopref.current;
        }}
      >
        <video src={AIicon} alt="AI Icon Video" autoPlay muted loop />
      </button>
      {chatVisibility ? (
        <div className="output-div" id="output-div">
          <button
            className="close_btn"
            onClick={() => {
              setChatVisibility(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>

          <p>{chatContent? chatContent : null}</p>
        </div>
      ) : null}
    </>
  );
}
