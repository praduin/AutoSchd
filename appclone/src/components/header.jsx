import { useNavigate } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineEye,
  AiFillEnvironment,
  AiOutlineInfoCircle,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://autoschd.onrender.com/log/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };
  return (
    <header className="flex flex-wrap items-center justify-between py-3 mb-4 border-b bg-gray-700 px-4 shadow-lg">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/websitelogo.png"
          alt="Home"
          className="w-10 h-10 rounded-full shadow"
        />
        <span className="text-xl font-bold text-white tracking-wide">
          AutoSchd
        </span>
      </div>
      <ul className="flex space-x-6 items-center">
        <li>
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-1 text-white hover:text-blue-400 transition bg-transparent border-none focus:outline-none"
          >
            <img
              src="/websitelogo.png"
              alt="Home"
              className="w-7 h-7 rounded-full"
            />
            <span className="hidden sm:inline">Home</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/viewed")}
            className="flex items-center space-x-1 text-white hover:text-blue-400 transition bg-transparent border-none focus:outline-none"
          >
            <AiOutlineEye className="text-2xl" />
            <span className="hidden sm:inline">Viewed</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/AddLocation")}
            className="flex items-center space-x-1 text-white hover:text-blue-400 transition bg-transparent border-none focus:outline-none"
          >
            <AiFillEnvironment className="text-2xl" />
            <span className="hidden sm:inline">AddLocation</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/About")}
            className="flex items-center space-x-1 text-white hover:text-blue-400 transition bg-transparent border-none focus:outline-none"
          >
            <AiOutlineInfoCircle className="text-2xl" />
            <span className="hidden sm:inline">About</span>
          </button>
        </li>
      </ul>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="flex items-center space-x-1 btn btn-outline-primary me-2 text-white border-white hover:bg-blue-400 hover:text-white hover:border-blue-400 transition"
          onClick={() => navigate("/login")}
        >
          <AiOutlineLogin className="text-xl" />
          <span className="hidden sm:inline">Login</span>
        </button>
        <button
          type="button"
          className="flex items-center space-x-1 btn btn-outline-primary me-2 text-white border-white hover:bg-blue-400 hover:text-white hover:border-blue-400 transition"
          onClick={() => navigate("/signup")}
        >
          <AiOutlineUserAdd className="text-xl" />
          <span className="hidden sm:inline">Sign-up</span>
        </button>
        <button
          type="button"
          className="flex items-center space-x-1 btn btn-outline-primary me-2 text-white border-white hover:bg-red-400 hover:text-white hover:border-red-400 transition"
          onClick={handleLogout}
        >
          <AiOutlineLogout className="text-xl" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
