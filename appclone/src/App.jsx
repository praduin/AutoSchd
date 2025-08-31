import { useEffect, useState } from "react";

import { BrowserRouter } from "react-router-dom";

import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Viewed from "./pages/viewed";
import AddLocation from "./pages/favorite";
import About from "./pages/About";
import Login from "./pages/login";
import Signup from "./pages/Sign-pu";
import "./App.css";

function App() {
  useEffect(() => {}, []);
  const [count, setCount] = useState(0);

  return (
    <div className="relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/images/92718-637669246.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/viewed" element={<Viewed />} />
          <Route path="/AddLocation" element={<AddLocation />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
