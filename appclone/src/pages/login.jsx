import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect as useReactEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/log/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Login successful:", response.data);
        Swal.fire({
          title: "Welcome!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "Continue",
        }).then(() => navigate("/"));
      })
      .catch((error) => {
        console.error("Login error:", error);
        console.log(email, password);
        Swal.fire({
          title: "Login Failed",
          text: "Invalid email or password.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  useReactEffect(() => {
    const globalVideo = document.querySelector("video.fixed");
    if (globalVideo) globalVideo.style.display = "none";
    return () => {
      if (globalVideo) globalVideo.style.display = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Login page specific background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/images/2182-155747492.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md z-10">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-amber-100 rounded-xl h-10 px-3 w-full "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-amber-100 rounded-xl h-10 px-3 w-full mt-2"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="rounded-full bg-amber-400 w-full h-12 font-semibold hover:bg-amber-500 transition mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
